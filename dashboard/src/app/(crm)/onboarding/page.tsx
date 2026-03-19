"use client";

import React, { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
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
import { Plus, Download, Pencil, Trash2, User } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export default function OnboardingPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const isClient = user?.role === "client";
  const myClientId = (user as any)?.clientId ?? null;

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [onboardings, setOnboardings] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOnboardingId, setEditingOnboardingId] = useState<string | null>(null);

  const getInitialFormState = () => ({
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
    // New fields
    projectId: "",
    clientDisplayId: "",
    scopeOfWork: "",
    outOfScope: "",
    techStack: "",
    milestones: "",
    paymentMilestones: "",
    paymentMethod: "",
    deliveryDiscovery: "",
    deliveryWireframes: "",
    deliveryDesign: "",
    deliveryDevelopment: "",
    deliveryTesting: "",
    deliveryDeployment: "",
    termsRevision: "",
    termsScope: "",
    termsPayment: "",
    termsClientResp: "",
  });

  const [form, setForm] = useState<any>(getInitialFormState);

  const toDateInputValue = (value?: string | Date | number | null) => {
    if (!value) return "";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      const raw = String(value);
      return raw.length >= 10 ? raw.slice(0, 10) : "";
    }
    return date.toISOString().slice(0, 10);
  };

  const toClientIdValue = (value: any) => {
    if (!value) return null;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      return String(value.$oid ?? value._id ?? value.id ?? "") || null;
    }
    return String(value);
  };

  const mapOnboardingToForm = (item: any) => ({
    clientName: item?.clientName ?? "",
    company: item?.company ?? "",
    email: item?.email ?? "",
    phone: item?.phone ?? "",
    address: item?.address ?? "",
    projectType: item?.projectType ?? "Website",
    productType: item?.productType ?? "Website",
    pages: item?.pages ?? "",
    budget: item?.budget ?? "",
    startDate: toDateInputValue(item?.startDate),
    deadline: toDateInputValue(item?.deadline),
    brief: item?.brief ?? "",
    contactName: item?.contactName ?? "",
    contactEmail: item?.contactEmail ?? "",
    contactPhone: item?.contactPhone ?? "",
    deliverables: Array.isArray(item?.deliverables)
      ? item.deliverables
      : typeof item?.deliverables === "string"
        ? item.deliverables.split("\n").map((entry: string) => entry.trim()).filter(Boolean)
        : ["Discovery Call", "Wireframes", "Design", "Development"],
    notes: item?.notes ?? "",
    projectTitle: item?.projectTitle ?? "",
    date: toDateInputValue(item?.date) || toDateInputValue(new Date()),
    // New fields
    projectId: item?.projectId ?? "",
    clientDisplayId: item?.clientDisplayId ?? "",
    scopeOfWork: Array.isArray(item?.scopeOfWork) ? item.scopeOfWork.join("\n") : (item?.scopeOfWork ?? ""),
    outOfScope: Array.isArray(item?.outOfScope) ? item.outOfScope.join("\n") : (item?.outOfScope ?? ""),
    techStack: Array.isArray(item?.techStack) ? item.techStack.join(", ") : (item?.techStack ?? ""),
    milestones: Array.isArray(item?.milestones) ? item.milestones.join("\n") : (item?.milestones ?? ""),
    paymentMilestones: Array.isArray(item?.paymentMilestones) ? item.paymentMilestones.join("\n") : (item?.paymentMilestones ?? ""),
    paymentMethod: item?.paymentMethod ?? "",
    deliveryDiscovery: item?.deliveryDiscovery ?? "",
    deliveryWireframes: item?.deliveryWireframes ?? "",
    deliveryDesign: item?.deliveryDesign ?? "",
    deliveryDevelopment: item?.deliveryDevelopment ?? "",
    deliveryTesting: item?.deliveryTesting ?? "",
    deliveryDeployment: item?.deliveryDeployment ?? "",
    termsRevision: item?.termsRevision ?? "",
    termsScope: item?.termsScope ?? "",
    termsPayment: item?.termsPayment ?? "",
    termsClientResp: item?.termsClientResp ?? "",
  });

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
    const c = clients.find(
      (x) => String(x._id ?? x.id ?? "") === selectedClientId,
    );
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
      const filename = `onboarding-${(dataToPrint.clientName || "client")
        .replace(/\s+/g, "-")
        .toLowerCase()}.pdf`;
      const blob = await pdf(<OnboardingPDF data={dataToPrint} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (e) {
      console.error("Failed to generate PDF", e);
      toast({ title: "PDF Failed", description: "Failed to generate onboarding PDF.", variant: "destructive" });
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
      const isEditing = Boolean(editingOnboardingId);
      const endpoint = isEditing
        ? `/api/onboarding/${editingOnboardingId}`
        : "/api/onboarding";
      const res = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const saved = await res.json();
        toast({
          title: "Success",
          description: isEditing
            ? "Onboarding record updated."
            : "Onboarding record saved.",
        });
        if (!isEditing) {
          await generatePdf(saved);
        }
        await fetchOnboardings();
        setIsModalOpen(false);
        setEditingOnboardingId(null);
        setForm(getInitialFormState());
        setSelectedClientId(null);
      } else {
        const err = await res.json();
        toast({ title: isEditing ? "Update Failed" : "Save Failed", description: "Failed to save: " + (err.error || "Unknown"), variant: "destructive" });
      }
    } catch (e) {
      console.error("Failed to save onboarding", e);
      toast({ title: editingOnboardingId ? "Update Failed" : "Save Failed", description: "Failed to save onboarding record. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (clientId?: string) => {
    setForm(getInitialFormState());
    setEditingOnboardingId(null);
    setSelectedClientId(clientId || null);
    setIsModalOpen(true);
  };

  const handleEditOnboarding = (item: any) => {
    const id = String(item?._id ?? item?.id ?? "").trim();
    if (!id) return;
    setEditingOnboardingId(id);
    setForm(mapOnboardingToForm(item));
    setSelectedClientId(toClientIdValue(item?.clientId));
    setIsModalOpen(true);
  };

  const handleDeleteOnboarding = async (item: any) => {
    const id = String(item?._id ?? item?.id ?? "").trim();
    if (!id) return;

    const confirmed = window.confirm(
      `Delete onboarding for ${item?.clientName || "this client"}?`,
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/onboarding/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Delete failed");
      }

      setOnboardings((prev) =>
        prev.filter((onb) => String(onb._id ?? onb.id) !== id),
      );
      if (editingOnboardingId === id) {
        setIsModalOpen(false);
        setEditingOnboardingId(null);
        setForm(getInitialFormState());
        setSelectedClientId(null);
      }
      toast({ title: "Deleted", description: "Onboarding record removed." });
    } catch (e: any) {
      console.error("Failed to delete onboarding", e);
      toast({
        title: "Delete Failed",
        description: e?.message || "Failed to delete onboarding record.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => generatePdf(onb)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      {!isClient && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditOnboarding(onb)}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteOnboarding(onb)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            setEditingOnboardingId(null);
            setForm(getInitialFormState());
            setSelectedClientId(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingOnboardingId ? "Edit Onboarding" : "Client Onboarding Form"}
            </DialogTitle>
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
                            (c) =>
                              String(c._id ?? c.id ?? "") === selectedClientId,
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
                Project Title
              </label>
              <Input
                value={form.projectTitle}
                onChange={(e: any) => update("projectTitle", e.target.value)}
                placeholder="e.g. Pixelate CRM Redesign"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Onboarding Date
              </label>
              <Input
                type="date"
                value={form.date ? String(form.date).slice(0, 10) : ""}
                onChange={(e: any) => update("date", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Project ID</label>
              <Input
                value={form.projectId}
                onChange={(e: any) => update("projectId", e.target.value)}
                placeholder="e.g. PRJ-2024-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Client ID</label>
              <Input
                value={form.clientDisplayId}
                onChange={(e: any) => update("clientDisplayId", e.target.value)}
                placeholder="e.g. CLT-001"
              />
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Deliverables (one per line)
              </label>
              <Textarea
                rows={4}
                value={(form.deliverables || []).join("\n")}
                onChange={(e: any) =>
                  update(
                    "deliverables",
                    e.target.value
                      .split("\n")
                      .map((item: string) => item.trim())
                      .filter(Boolean),
                  )
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <Textarea
                rows={4}
                value={form.notes}
                onChange={(e: any) => update("notes", e.target.value)}
              />
            </div>

            {/* ── Scope ── */}
            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="font-semibold mb-4">Project Scope</h3>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Scope of Work (one item per line)</label>
              <Textarea
                rows={4}
                value={form.scopeOfWork}
                onChange={(e: any) => update("scopeOfWork", e.target.value)}
                placeholder="e.g. Home page&#10;About Us page&#10;Contact form"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Out of Scope (one item per line)</label>
              <Textarea
                rows={3}
                value={form.outOfScope}
                onChange={(e: any) => update("outOfScope", e.target.value)}
                placeholder="e.g. Third-party integrations&#10;CMS setup"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Technology Stack (comma separated)</label>
              <Input
                value={form.techStack}
                onChange={(e: any) => update("techStack", e.target.value)}
                placeholder="e.g. React, Next.js, Node.js, MongoDB"
              />
            </div>

            {/* ── Timeline ── */}
            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="font-semibold mb-4">Timeline &amp; Milestones</h3>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Project Milestones (one per line)</label>
              <Textarea
                rows={4}
                value={form.milestones}
                onChange={(e: any) => update("milestones", e.target.value)}
                placeholder="e.g. Week 1-2: Discovery &amp; Brief&#10;Week 3-4: Wireframes&#10;Week 5-8: Design"
              />
            </div>

            {/* ── Financial ── */}
            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="font-semibold mb-4">Financial Details</h3>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <Input
                value={form.paymentMethod}
                onChange={(e: any) => update("paymentMethod", e.target.value)}
                placeholder="e.g. Bank Transfer / UPI"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Payment Milestones (one per line)</label>
              <Textarea
                rows={4}
                value={form.paymentMilestones}
                onChange={(e: any) => update("paymentMilestones", e.target.value)}
                placeholder="e.g. 30% advance on signing&#10;40% on design approval&#10;30% on delivery"
              />
            </div>

            {/* ── Deliverable phase descriptions ── */}
            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="font-semibold mb-1">Deliverable Phase Descriptions</h3>
              <p className="text-xs text-muted-foreground mb-4">Leave blank to use default descriptions in the PDF.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discovery</label>
              <Textarea rows={2} value={form.deliveryDiscovery} onChange={(e: any) => update("deliveryDiscovery", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Wireframes</label>
              <Textarea rows={2} value={form.deliveryWireframes} onChange={(e: any) => update("deliveryWireframes", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Design</label>
              <Textarea rows={2} value={form.deliveryDesign} onChange={(e: any) => update("deliveryDesign", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Development</label>
              <Textarea rows={2} value={form.deliveryDevelopment} onChange={(e: any) => update("deliveryDevelopment", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Testing</label>
              <Textarea rows={2} value={form.deliveryTesting} onChange={(e: any) => update("deliveryTesting", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Deployment</label>
              <Textarea rows={2} value={form.deliveryDeployment} onChange={(e: any) => update("deliveryDeployment", e.target.value)} />
            </div>

            {/* ── Terms ── */}
            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="font-semibold mb-1">Terms &amp; Conditions</h3>
              <p className="text-xs text-muted-foreground mb-4">Leave blank to use Pixelate Nest default terms in the PDF.</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Revision Policy</label>
              <Textarea rows={3} value={form.termsRevision} onChange={(e: any) => update("termsRevision", e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Scope Change Policy</label>
              <Textarea rows={3} value={form.termsScope} onChange={(e: any) => update("termsScope", e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Payment Policy</label>
              <Textarea rows={3} value={form.termsPayment} onChange={(e: any) => update("termsPayment", e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Client Responsibilities</label>
              <Textarea rows={3} value={form.termsClientResp} onChange={(e: any) => update("termsClientResp", e.target.value)} />
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
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingOnboardingId(null);
                  setForm(getInitialFormState());
                  setSelectedClientId(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={saveAndGenerate} disabled={loading}>
                {loading
                  ? editingOnboardingId
                    ? "Saving..."
                    : "Generating..."
                  : editingOnboardingId
                    ? "Save Changes"
                    : "Save & Generate PDF"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
