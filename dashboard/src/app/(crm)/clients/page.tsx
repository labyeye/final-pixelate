
"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Client } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, ShieldCheck } from "lucide-react";
import { AddClientDialog } from "@/components/clients/add-client-dialog";
import { Badge } from "@/components/ui/badge";

function SuccessModal({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] px-10 py-8 flex flex-col items-center gap-4 animate-in zoom-in-90 duration-200">
        <div className="relative flex items-center justify-center">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="34" stroke="black" strokeWidth="4" fill="#22c55e" />
            <polyline
              points="20,37 31,48 52,26"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 50,
                strokeDashoffset: 0,
                animation: "draw-check 0.4s ease forwards",
              }}
            />
          </svg>
          <style>{`
            @keyframes draw-check {
              from { stroke-dashoffset: 50; }
              to   { stroke-dashoffset: 0; }
            }
          `}</style>
        </div>
        <p className="text-xl font-black tracking-tight text-center">{message}</p>
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2000);
  };
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/clients');
        if (!res.ok) throw new Error(`Failed to fetch clients: ${res.status}`);
        const items = await res.json();
        if (mounted) setClients(items as Client[]);
      } catch (err) {
        console.error('Failed to load clients', err);
      }
    })();
    return () => { mounted = false; };
  }, []);
  
  const handleAddClient = async (newClientData: Omit<Client, 'id' | '_id'>) => {
    try {
      const res = await fetch('/api/clients', { method: 'POST', body: JSON.stringify(newClientData), headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error(`Failed to create client: ${res.status}`);
      const newClient = await res.json();
      setClients(prev => [...prev, newClient as Client]);
      showSuccess('Client created!');
    } catch (err) {
      console.error('Failed to add client', err);
      throw err;
    }
  };

  const handleDeleteClient = async (client: Client) => {
    try {
      const id = client._id ?? client.id;
      const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Failed to delete client: ${res.status}`);
      setClients(prev => prev.filter(c => (c._id ?? c.id) !== id));
    } catch (err) {
      console.error('Failed to delete client', err);
    }
  };

  const handleSaveClient = async (id: string | number, update: Partial<Client>) => {
    try {
      const res = await fetch(`/api/clients/${id}`, { method: 'PUT', body: JSON.stringify(update), headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error(`Failed to update client: ${res.status}`);
      const updated = await res.json();
      setClients(prev => prev.map(c => ((c._id ?? c.id) === id ? updated : c)));
      showSuccess('Changes saved!');
    } catch (err) {
      console.error('Failed to save client', err);
      throw err;
    }
  };

  
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div className="space-y-8 font-headline">
      {successMessage && <SuccessModal message={successMessage} />}
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">CLIENTS</h1>
          <p className="text-muted-foreground text-lg">Manage all your clients.</p>
        </div>
    <AddClientDialog 
      isOpen={isDialogOpen}
      setIsOpen={setIsDialogOpen}
      onAddClient={handleAddClient}
    >
      <Button size="lg" className="text-lg">Add Client</Button>
    </AddClientDialog>

    <AddClientDialog
      isOpen={isEditDialogOpen}
      setIsOpen={setIsEditDialogOpen}
      initialValues={editingClient ?? undefined}
      onSave={handleSaveClient}
    >
      {}
      <div />
    </AddClientDialog>
      </header>

      <div className="border-2 border-black">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead className="text-base font-bold">Name</TableHead>
              <TableHead className="text-base font-bold">Contact</TableHead>
              <TableHead className="text-base font-bold">Address</TableHead>
              <TableHead className="text-base font-bold">Portal</TableHead>
              <TableHead className="text-right text-base font-bold">GST</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
                {clients.map((c) => (
              <TableRow key={c._id ?? c.id} className="border-b-2 border-black last:border-b-0">
                <TableCell className="font-bold text-base py-4">{c.name}</TableCell>
                <TableCell className="text-base py-4">
                    <div>{c.email}</div>
                    <div>{c.phone}</div>
                </TableCell>
                <TableCell className="text-base py-4">{c.address}</TableCell>
                <TableCell className="text-base py-4">
                  {c.userId ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs font-bold">Active</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">None</span>
                  )}
                </TableCell>
                <TableCell className="text-right py-4">
                    <div className="flex items-center justify-end gap-2">
                      {c.hasGst ? <Badge>Registered</Badge> : <Badge variant="secondary">Not Registered</Badge>}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setEditingClient(c); setIsEditDialogOpen(true); }}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClient(c)} className="text-destructive">Delete</DropdownMenuItem>
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
