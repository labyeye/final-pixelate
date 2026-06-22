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
import type { User } from "@/lib/models";
import EditUserDialog from "../../../components/developers-and-editors/edit-user-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Users, ShieldCheck, UserCog, UserX } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SuccessModal } from "@/components/ui/success-modal";

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiFetch("/api/users");
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
        const items = await res.json();
        if (mounted) setUsers(items as User[]);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (user?.role !== "admin") {
    return (
      <div className="space-y-8 font-headline">
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle className="text-2xl font-black tracking-tighter">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              You do not have permission to view this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = async (u: User) => {
    try {
      const id = u._id ?? (u as any).id;
      const res = await apiFetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed to delete user: ${res.status}`);
      setUsers((prev) => prev.filter((x) => (x._id ?? (x as any).id) !== id));
      showSuccess("User deleted!");
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const handleSave = async (id: string, update: Partial<User>) => {
    try {
      const res = await apiFetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(update),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Failed to update user: ${res.status}`);
      const updated = await res.json();
      setUsers((prev) =>
        prev.map((u) => ((u._id ?? (u as any).id) === id ? updated : u)),
      );
      setIsEditOpen(false);
      showSuccess("User updated!");
    } catch (err) {
      console.error("Failed to save user", err);
      throw err;
    }
  };

  return (
    <div className="space-y-8 font-headline">
      {successMessage && <SuccessModal message={successMessage} />}
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">LOGIN USERS</h1>
          <p className="text-muted-foreground text-lg">
            View, edit and delete login users.
          </p>
        </div>
        <div />
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="TOTAL USERS" value={users.length} sub="all accounts" iconVariant="primary" />
        <StatCard icon={ShieldCheck} label="ADMINS" value={users.filter((u: any) => u.role === "admin").length} sub="admin access" iconVariant="secondary" />
        <StatCard icon={UserCog} label="STAFF" value={users.filter((u: any) => u.role === "staff").length} sub="team members" iconVariant="primary" />
        <StatCard icon={UserX} label="CLIENTS" value={users.filter((u: any) => u.role === "client").length} sub="client logins" iconVariant="secondary" />
      </div>

      <div className="hidden md:block border-2 border-black">
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
            {users.map((u) => (
              <TableRow key={u._id ?? (u as any).id} className="border-b-2 border-black last:border-b-0">
                <TableCell className="font-bold text-base py-4">{u.name}</TableCell>
                <TableCell className="text-base py-4">{u.email}</TableCell>
                <TableCell className="text-base py-4">{u.role}</TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex items-center justify-end gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-5 w-5" /></Button>
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

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {users.map((u) => {
          const uid = u._id ?? (u as any).id;
          return (
            <div key={uid} className="border-2 border-black bg-white">
              <div className="divide-y divide-gray-100">
                <div className="px-3 py-2">
                  <div className="font-black text-base">{u.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{u.role}</div>
                </div>
                <div className="flex justify-between items-center px-3 py-2">
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Email</span>
                  <span className="text-sm text-right flex-1 break-all">{u.email}</span>
                </div>
              </div>
              <div className="border-t-2 border-black bg-gray-50 px-3 py-2 flex gap-2">
                <Button size="sm" variant="outline" className="border-2 border-black font-bold text-xs h-8" onClick={() => { setEditingUser(u); setIsEditOpen(true); }}>Edit</Button>
                <Button size="sm" variant="destructive" className="font-bold text-xs h-8" onClick={() => handleDelete(u)}>Delete</Button>
              </div>
            </div>
          );
        })}
        {users.length === 0 && <div className="border-2 border-black p-8 text-center text-muted-foreground font-bold">No users found.</div>}
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
