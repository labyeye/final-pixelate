"use client";

import { useEffect, useState } from "react";
import { Download, FileSignature, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiFetch } from "@/lib/api-fetch";
import { useToast } from "@/hooks/use-toast";
import {
  DEFAULT_PAYMENT_TERMS,
  DEFAULT_RESPONSIBILITIES,
  fmtDMY,
} from "@/lib/agreement-templates";

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm = () => ({
  type: "work",
  name: "",
  role: "",
  date: today(),
  responsibilities: DEFAULT_RESPONSIBILITIES,
  startDate: "",
  endDate: "",
  compensation: "",
  paymentTerms: DEFAULT_PAYMENT_TERMS,
});

export default function AgreementsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState(emptyForm());
  const [busy, setBusy] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const load = async () => {
    const res = await apiFetch("/api/agreements");
    if (res.ok) setItems(await res.json());
  };
  useEffect(() => {
    load();
  }, []);

  const download = async (a: any) => {
    const res = await apiFetch(`/api/agreements/${a._id}/pdf`);
    if (!res.ok) {
      toast({ title: "PDF generation failed", variant: "destructive" });
      return;
    }
    const url = URL.createObjectURL(await res.blob());
    const el = document.createElement("a");
    el.href = url;
    el.download = `${a.agreementNo.replace(/\//g, "-")}.pdf`;
    el.click();
    URL.revokeObjectURL(url);
  };

  const create = async () => {
    if (!form.name.trim() || !form.role.trim()) {
      toast({ title: "Name and role are required", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      const res = await apiFetch("/api/agreements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast({ title: `Created ${data.agreementNo}` });
      await download(data);
      setForm(emptyForm());
      load();
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const isWork = form.type === "work";

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center gap-2">
        <FileSignature className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Agreements</h1>
      </div>

      <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Type</Label>
          <Select value={form.type} onValueChange={(v) => set("type", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work Agreement</SelectItem>
              <SelectItem value="nda">NDA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Date</Label>
          <Input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Recipient name</Label>
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Adarsh Yadav" />
        </div>
        <div className="space-y-1.5">
          <Label>Role</Label>
          <Input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Graphic Designer" />
        </div>

        {isWork && (
          <>
            <div className="space-y-1.5">
              <Label>Start date</Label>
              <Input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>End date</Label>
              <Input type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Compensation (₹)</Label>
              <Input type="number" value={form.compensation} onChange={(e) => set("compensation", e.target.value)} placeholder="16000" />
            </div>
            <div className="space-y-1.5">
              <Label>Payment terms</Label>
              <Input value={form.paymentTerms} onChange={(e) => set("paymentTerms", e.target.value)} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Responsibilities (one bullet per line)</Label>
              <Textarea rows={8} value={form.responsibilities} onChange={(e) => set("responsibilities", e.target.value)} />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <Button onClick={create} disabled={busy}>
            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            Generate PDF
          </Button>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agreement No.</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">PDF</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((a) => (
              <TableRow key={a._id}>
                <TableCell className="font-mono">{a.agreementNo}</TableCell>
                <TableCell><Badge variant="outline">{a.type === "nda" ? "NDA" : "Work"}</Badge></TableCell>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.role}</TableCell>
                <TableCell>{fmtDMY(a.date)}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => download(a)}>
                    <Download className="mr-1 h-4 w-4" /> Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!items.length && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  No agreements yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
