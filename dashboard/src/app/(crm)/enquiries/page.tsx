"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SuccessModal } from "@/components/ui/success-modal";
import { StatCard } from "@/components/ui/stat-card";
import { MessageSquare, CheckCircle2, Clock, Inbox } from "lucide-react";

export default function EnquiriesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  const updateItem = async (id: string, patch: any) => {
    try {
      const res = await apiFetch(
        `/api/enquiries?id=${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        },
      );
      if (!res.ok) throw new Error("update failed");
      const updated = await res.json();
      setItems((prev) =>
        prev.map((p) => (String(p._id || p.id) === String(id) ? updated : p)),
      );
      showSuccess("Status updated!");
    } catch (e) {
      console.error("Failed to update enquiry", e);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      if (
        !window.confirm(
          "Are you sure you want to delete this enquiry? This cannot be undone.",
        )
      )
        return;
      const res = await apiFetch(
        `/api/enquiries?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("delete failed");

      setItems((prev) =>
        prev.filter((p) => String(p._id || p.id) !== String(id)),
      );
      showSuccess("Enquiry deleted!");
    } catch (e) {
      console.error("Failed to delete enquiry", e);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiFetch("/api/enquiries");
        const json = await res.json();
        if (!mounted) return;
        setItems(json || []);
      } catch (e) {
        console.error("Failed to load enquiries", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {successMessage && <SuccessModal message={successMessage} />}
      <header>
        <h1 className="text-5xl font-black">Enquiries</h1>
        <p className="text-muted-foreground">
          All contact form submissions saved from the website.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Inbox} label="TOTAL" value={items.length} sub="all submissions" iconVariant="primary" />
        <StatCard icon={Clock} label="PENDING" value={items.filter((i: any) => !i.status || i.status === "pending").length} sub="awaiting review" iconVariant="secondary" />
        <StatCard icon={CheckCircle2} label="RESOLVED" value={items.filter((i: any) => i.status === "resolved").length} sub="completed" iconVariant="primary" />
        <StatCard icon={MessageSquare} label="THIS MONTH" value={items.filter((i: any) => { if (!i.createdAt) return false; const d = new Date(i.createdAt); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }).length} sub="new enquiries" iconVariant="secondary" />
      </div>

      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle>All Enquiries</CardTitle>
          <CardDescription>Newest first</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Project Type</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((it) => (
                  <TableRow key={String(it._id || it.id)}>
                    <TableCell className="font-bold">{it.name || "-"}</TableCell>
                    <TableCell>{it.email || "-"}</TableCell>
                    <TableCell>{it.phone || "-"}</TableCell>
                    <TableCell>{it.subject || "-"}</TableCell>
                    <TableCell>{it.projectType || "-"}</TableCell>
                    <TableCell style={{ maxWidth: 300 }}>{it.message || "-"}</TableCell>
                    <TableCell>{it.budget || "-"}</TableCell>
                    <TableCell>
                      <select
                        value={it.status || "pending"}
                        onChange={(e) => updateItem(String(it._id || it.id), { status: e.target.value })}
                        className="border rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmation">Confirmation</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <span>{it.createdAt ? new Date(it.createdAt).toLocaleString() : "-"}</span>
                      <button onClick={() => deleteItem(String(it._id || it.id))} className="ml-2 text-sm text-red-600 hover:underline">Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {items.map((it) => {
              const id = String(it._id || it.id);
              return (
                <div key={id} className="border-2 border-black bg-white">
                  <div className="divide-y divide-gray-100">
                    <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Name</span>
                      <span className="text-sm font-bold text-right flex-1">{it.name || "-"}</span>
                    </div>
                    {it.email && <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Email</span>
                      <span className="text-sm text-right flex-1">{it.email}</span>
                    </div>}
                    {it.phone && <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Phone</span>
                      <span className="text-sm text-right flex-1">{it.phone}</span>
                    </div>}
                    {it.subject && <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Subject</span>
                      <span className="text-sm text-right flex-1">{it.subject}</span>
                    </div>}
                    {it.projectType && <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Project</span>
                      <span className="text-sm text-right flex-1">{it.projectType}</span>
                    </div>}
                    {it.budget && <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Budget</span>
                      <span className="text-sm font-bold text-right flex-1">{it.budget}</span>
                    </div>}
                    {it.message && <div className="px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase block mb-1">Message</span>
                      <span className="text-sm line-clamp-3">{it.message}</span>
                    </div>}
                    <div className="flex justify-between items-center px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Date</span>
                      <span className="text-xs text-right flex-1">{it.createdAt ? new Date(it.createdAt).toLocaleDateString("en-IN") : "-"}</span>
                    </div>
                  </div>
                  <div className="border-t-2 border-black bg-gray-50 px-3 py-2 flex items-center justify-between gap-2">
                    <select
                      value={it.status || "pending"}
                      onChange={(e) => updateItem(id, { status: e.target.value })}
                      className="border-2 border-black rounded px-2 py-1 text-xs font-bold flex-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmation">Confirmation</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button onClick={() => deleteItem(id)} className="text-sm text-red-600 font-bold hover:underline">Delete</button>
                  </div>
                </div>
              );
            })}
            {items.length === 0 && <p className="text-center text-muted-foreground py-8">No enquiries yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
