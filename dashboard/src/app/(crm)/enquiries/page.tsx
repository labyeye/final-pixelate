"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function EnquiriesPage() {
  const [items, setItems] = useState<any[]>([]);

  const updateItem = async (id: string, patch: any) => {
    try {
      const res = await fetch(`/api/enquiries?id=${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      })
      if (!res.ok) throw new Error('update failed')
      const updated = await res.json()
      setItems((prev) => prev.map((p) => (String(p._id || p.id) === String(id) ? updated : p)))
    } catch (e) {
      console.error('Failed to update enquiry', e)
    }
  }

  const deleteItem = async (id: string) => {
    try {
      if (!confirm('Are you sure you want to delete this enquiry? This cannot be undone.')) return
      const res = await fetch(`/api/enquiries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('delete failed')
      // remove from state
      setItems((prev) => prev.filter((p) => String(p._id || p.id) !== String(id)))
    } catch (e) {
      console.error('Failed to delete enquiry', e)
    }
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/enquiries');
        const json = await res.json();
        if (!mounted) return;
        setItems(json || []);
      } catch (e) {
        console.error('Failed to load enquiries', e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-5xl font-black">Enquiries</h1>
        <p className="text-muted-foreground">All contact form submissions saved from the website.</p>
      </header>

      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle>All Enquiries</CardTitle>
          <CardDescription>Newest first</CardDescription>
        </CardHeader>
        <CardContent>
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
              {items.map(it => (
                <TableRow key={String(it._id || it.id)}>
                  <TableCell className="font-bold">{it.name || '-'}</TableCell>
                  <TableCell>{it.email || '-'}</TableCell>
                  <TableCell>{it.phone || '-'}</TableCell>
                  <TableCell>{it.subject || '-'}</TableCell>
                  <TableCell>{it.projectType || '-'}</TableCell>
                  <TableCell style={{maxWidth: 300}}>{it.message || '-'}</TableCell>
                  <TableCell>{it.budget || '-'}</TableCell>
                  <TableCell>
                    <select value={it.status || 'pending'} onChange={(e) => updateItem(String(it._id || it.id), { status: e.target.value })} className="border rounded px-2 py-1">
                      <option value="pending">Pending</option>
                      <option value="confirmation">Confirmation</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <span>{it.createdAt ? new Date(it.createdAt).toLocaleString() : '-'}</span>
                    <button onClick={() => deleteItem(String(it._id || it.id))} className="ml-2 text-sm text-red-600 hover:underline">Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
