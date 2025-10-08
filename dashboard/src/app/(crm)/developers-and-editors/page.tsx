
'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TeamMember } from "@/lib/data";
import { AddMemberDialog } from "@/components/developers-and-editors/add-member-dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import EditUserDialog from '../../../components/developers-and-editors/edit-user-dialog';
import { MoreVertical } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DevelopersAndEditorsPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Failed to fetch users: ${res.status} ${txt}`);
        }
        const items = await res.json();
        if (mounted) setUsers(items as any[]);
      } catch (e: any) {
        console.error('Failed to load users', e);
        if (mounted) setError(e?.message || String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const refreshAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/users');
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`users fetch failed: ${res.status} ${txt}`);
      }
      const items = await res.json();
      setUsers(items as any[]);
    } catch (e: any) {
      console.error('Refresh failed', e);
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
        <div className="space-y-8 font-headline">
             <Card className="border-2 border-black">
                <CardHeader>
                    <CardTitle className="text-2xl font-black tracking-tighter">Access Denied</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">You do not have permission to view this page.</p>
                </CardContent>
            </Card>
        </div>
    );
  }
  
  const handleAddMember = async (newMemberData: any) => {
    try {
      // create as a user with jobRole and auth role
      const payload = { ...newMemberData, jobRole: newMemberData.role, role: newMemberData.loginRole ?? 'staff' };
      const res = await fetch('/api/users', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error(`Failed to create member: ${res.status}`);
      const added = await res.json();
      setUsers(prev => [...prev, added]);
      return added;
    } catch (err) {
      console.error('Failed to add member', err);
      throw err;
    }
  };

  // removed team-members specific delete/save; use user endpoints below

  const handleDeleteUser = async (u: any) => {
    try {
      const id = u._id ?? u.id;
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Failed to delete user: ${res.status}`);
      setUsers(prev => prev.filter(x => (x._id ?? x.id) !== id));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleSaveUser = async (id: string, update: Partial<Record<string, any>>) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(update), headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error(`Failed to update user: ${res.status}`);
      const updated = await res.json();
      setUsers(prev => prev.map(u => ((u._id ?? u.id) === id ? updated : u)));
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error('Failed to save user', err);
      throw err;
    }
  };


  return (
    <div className="space-y-8 font-headline">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">DEVELOPERS & EDITORS</h1>
          <p className="text-muted-foreground text-lg">Manage your creative and technical team members.</p>
        </div>
    <div className="flex items-center gap-2">
      <Button onClick={refreshAll} variant="ghost">Refresh</Button>
      <AddMemberDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onAddMember={handleAddMember}
        onCreated={(created) => setUsers(prev => [...prev, created])}
      >
        <Button size="lg" className="text-lg">Add New</Button>
      </AddMemberDialog>
    </div>

    <AddMemberDialog
      isOpen={isEditDialogOpen}
      setIsOpen={setIsEditDialogOpen}
      initialValues={editingMember ?? undefined}
      onSave={async (id, update) => {
        // when editing a member, update via users endpoint
        await handleSaveUser(id as string, update as any);
      }}
    >
      <div />
    </AddMemberDialog>
      </header>

      <div className="border-2 border-black">
          <div className="p-4 flex items-center justify-between">
            <div>
              {loading ? <div className="text-sm text-muted-foreground">Loading…</div> : null}
              {error ? <div className="text-sm text-destructive">{error}</div> : null}
            </div>
          </div>
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead className="text-base font-bold">Name</TableHead>
              <TableHead className="text-base font-bold">Email</TableHead>
              <TableHead className="text-base font-bold">Auth Role</TableHead>
              <TableHead className="text-base font-bold">Job Role</TableHead>
              <TableHead className="text-base font-bold">Phone</TableHead>
              <TableHead className="text-base font-bold">Address</TableHead>
              <TableHead className="text-base font-bold">Created</TableHead>
              <TableHead className="text-right text-base font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((member) => (
              <TableRow key={member._id ?? member.id} className="border-b-2 border-black last:border-b-0">
                <TableCell className="font-bold text-base py-4">{member.name}</TableCell>
                <TableCell className="text-base py-4">{member.email}</TableCell>
                <TableCell className="text-base py-4">{member.role ?? 'staff'}</TableCell>
                <TableCell className="text-base py-4">{member.jobRole ?? ''}</TableCell>
                <TableCell className="text-base py-4">{member.phone}</TableCell>
                <TableCell className="text-base py-4">{member.address}</TableCell>
                <TableCell className="text-base py-4">{member.createdAt ? new Date(member.createdAt).toLocaleString() : ''}</TableCell>
                <TableCell className="text-right py-4 text-base font-bold uppercase">
                  <div className="flex items-center justify-end gap-2">
                    <div>{member.role ?? 'staff'}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setEditingMember(member); setIsEditDialogOpen(true); }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteUser(member)} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* single combined users/team-members table shown above; edit dialog uses editingMember/isEditDialogOpen */}
      {editingMember && (
        <EditUserDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          initialValues={editingMember}
          onSave={async (update) => {
            const id = editingMember._id ?? editingMember.id;
            await handleSaveUser(id, update as any);
          }}
        />
      )}
    </div>
  );
}
