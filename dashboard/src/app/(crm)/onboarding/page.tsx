"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import { OnboardingPDF } from "@/components/onboarding/onboarding-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormItem, FormLabel, FormControl } from "@/components/ui/form";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
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
  });

  const update = (k: string, v: any) => setForm((s: any) => ({ ...s, [k]: v }));

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/clients');
        if (!res.ok) throw new Error('Failed to load clients');
        const items = await res.json();
        if (!mounted) return;
        setClients(items || []);
      } catch (e) {
        console.error('Could not fetch clients', e);
      }
    })();
    return () => { mounted = false; };
  }, []);

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

  const generatePdf = async () => {
    setLoading(true);
    try {
      const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

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

      const pdfBody = renderToString(<OnboardingPDF data={form} />);
      const styledHtml = `<div style=\"width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;\">${pdfBody}</div>`;

      // use html method if available, otherwise fallback to fromHTML via plugin
      if ((doc as any).html) {
        await new Promise<void>((res, rej) => {
          (doc as any).html(styledHtml, {
            callback: function (doc2: any) {
              try {
                doc2.save(`onboarding-${(form.clientName || "client").replace(/\s+/g, "-")}.pdf`);
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
        doc.text("Client Onboarding - "+(form.clientName || ""), 10, 10);
        doc.save(`onboarding-${(form.clientName || "client").replace(/\s+/g, "-")}.pdf`);
      }
    } catch (e) {
      console.error("Failed to generate PDF", e);
      alert("Failed to generate PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Client Onboarding Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Select Client (optional)</label>
          <Select value={selectedClientId ?? "__none__"} onValueChange={(v) => setSelectedClientId(v === "__none__" ? null : v)}>
            <SelectTrigger>
              <SelectValue>{selectedClientId ? clients.find((c) => (c._id ?? c.id) === selectedClientId)?.name : 'Choose a client'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">-- None --</SelectItem>
              {clients.map((c) => (
                <SelectItem key={c._id ?? c.id} value={String(c._id ?? c.id)}>
                  {c.name} {c.companyName ? `(${c.companyName})` : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium">Client Name</label>
          <Input value={form.clientName} onChange={(e: any) => update("clientName", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Company</label>
          <Input value={form.company} onChange={(e: any) => update("company", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input type="email" value={form.email} onChange={(e: any) => update("email", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <Input value={form.phone} onChange={(e: any) => update("phone", e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Address</label>
          <Textarea value={form.address} onChange={(e: any) => update("address", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">Project Type</label>
          <Input value={form.projectType} onChange={(e: any) => update("projectType", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Product Type (Website/App)</label>
          <Input value={form.productType} onChange={(e: any) => update("productType", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">Pages / Modules</label>
          <Input value={form.pages} onChange={(e: any) => update("pages", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Estimated Budget</label>
          <Input value={form.budget} onChange={(e: any) => update("budget", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <Input type="date" value={form.startDate} onChange={(e: any) => update("startDate", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Target Delivery</label>
          <Input type="date" value={form.deadline} onChange={(e: any) => update("deadline", e.target.value)} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Project Brief</label>
          <Textarea rows={6} value={form.brief} onChange={(e: any) => update("brief", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">Primary Contact Name</label>
          <Input value={form.contactName} onChange={(e: any) => update("contactName", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Primary Contact Email</label>
          <Input value={form.contactEmail} onChange={(e: any) => update("contactEmail", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Primary Contact Phone</label>
          <Input value={form.contactPhone} onChange={(e: any) => update("contactPhone", e.target.value)} />
        </div>

        <div className="md:col-span-2 flex items-center gap-3 mt-4">
          <Button onClick={generatePdf} disabled={loading}>{loading ? "Generating…" : "Generate PDF"}</Button>
          <Button variant="ghost" onClick={() => setForm({
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
          })}>Reset</Button>
        </div>
      </div>
    </div>
  );
}
