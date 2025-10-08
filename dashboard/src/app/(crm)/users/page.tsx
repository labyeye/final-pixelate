"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { User } from "@/lib/models";
import EditUserDialog from "../../../components/developers-and-editors/edit-user-dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
        const items = await res.json();
        if (mounted) setUsers(items as User[]);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

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

  const handleDelete = async (u: User) => {
    try {
      const id = u._id ?? (u as any).id;
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Failed to delete user: ${res.status}`);
      setUsers(prev => prev.filter(x => (x._id ?? (x as any).id) !== id));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleSave = async (id: string, update: Partial<User>) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(update), headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error(`Failed to update user: ${res.status}`);
      const updated = await res.json();
      setUsers(prev => prev.map(u => ((u._id ?? (u as any).id) === id ? updated : u)));
      setIsEditOpen(false);
    } catch (err) {
      console.error('Failed to save user', err);
      throw err;
    }
  };

  return (
    <div className="space-y-8 font-headline">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">LOGIN USERS</h1>
          <p className="text-muted-foreground text-lg">View, edit and delete login users.</p>
        </div>
        <div />
      </header>

      <div className="border-2 border-black">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead className="text-base font-bold">Name</TableHead>
              <TableHead className="text-base font-bold">Email</TableHead>
              <TableHead className="text-base font-bold">Role</TableHead>
              <TableHead className="text-right text-base font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(u => (
              <TableRow key={u._id ?? (u as any).id} className="border-b-2 border-black last:border-b-0">
                <TableCell className="font-bold text-base py-4">{u.name}</TableCell>
                <TableCell className="text-base py-4">{u.email}</TableCell>
                <TableCell className="text-base py-4">{u.role}</TableCell>
                <TableCell className="text-right py-4 text-base font-bold">
                  <div className="flex items-center justify-end gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setEditingUser(u); setIsEditOpen(true); }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(u)} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingUser && (
        <EditUserDialog
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          initialValues={editingUser}
          onSave={async (update) => {
            const id = editingUser._id ?? (editingUser as any).id;
            await handleSave(id, update as any);
          }}
        />
      )}
    </div>
  );
}
