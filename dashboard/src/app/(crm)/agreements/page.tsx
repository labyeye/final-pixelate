"use client";

import { useEffect, useState } from "react";
import { Download, FileSignature, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { ROLES, fmtDMY } from "@/lib/agreement-templates";

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm = () => ({
  name: "",
  role: "",
  date: today(),
  startDate: "",
  endDate: "",
  compensation: "",
  paymentTerms: "",
  deliverables: "",
  responsibilities: "",
});

export default function AgreementsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState(emptyForm());
  const [busy, setBusy] = useState(false);
  const [customRole, setCustomRole] = useState(false);
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
      setCustomRole(false);
      load();
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center gap-2">
        <FileSignature className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Agreements</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Recipient name</Label>
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Role</Label>
          {customRole ? (
            <div className="flex gap-2">
              <Input autoFocus value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Type role" />
              <Button type="button" variant="outline" onClick={() => { setCustomRole(false); set("role", ""); }}>
                List
              </Button>
            </div>
          ) : (
            <Select
              value={form.role}
              onValueChange={(v) => {
                if (v === "__other") { setCustomRole(true); set("role", ""); }
                else set("role", v);
              }}
            >
              <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                <SelectItem value="__other">Other…</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Agreement date</Label>
          <Input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </div>
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
          <Input type="number" value={form.compensation} onChange={(e) => set("compensation", e.target.value)} />
        </div>
        <div className="space-y-1.5 md:col-span-3">
          <Label>Payment terms</Label>
          <Input value={form.paymentTerms} onChange={(e) => set("paymentTerms", e.target.value)} />
        </div>
        <div className="space-y-1.5 md:col-span-3">
          <Label>Work deliverables (one bullet per line)</Label>
          <Textarea rows={4} value={form.deliverables} onChange={(e) => set("deliverables", e.target.value)} />
        </div>
        <div className="space-y-1.5 md:col-span-3">
          <Label>Responsibilities / terms (one bullet per line)</Label>
          <Textarea rows={6} value={form.responsibilities} onChange={(e) => set("responsibilities", e.target.value)} />
        </div>

        <div className="md:col-span-3">
          <Button onClick={create} disabled={busy}>
            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            Generate Work + NDA PDF
          </Button>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agreement No.</TableHead>
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
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
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
