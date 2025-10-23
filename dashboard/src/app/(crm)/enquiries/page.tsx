"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function EnquiriesPage() {
  const [items, setItems] = useState<any[]>([]);

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
                  <TableCell>{it.createdAt ? new Date(it.createdAt).toLocaleString() : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
