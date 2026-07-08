"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Service } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SuccessModal } from "@/components/ui/success-modal";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Service name must be at least 2 characters." }),
  hsnCode: z.string().optional(),
});

export default function ServicesPage() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiFetch("/api/services");
        if (!res.ok) throw new Error(`Failed to fetch services: ${res.status}`);
        const items = await res.json();
        if (mounted) setServices(items as Service[]);
      } catch (err) {
        console.error("Failed to load services", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", hsnCode: "" },
  });

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await apiFetch("/api/services", {
        method: "POST",
        body: JSON.stringify({ name: values.name, hsnCode: values.hsnCode || "" }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Failed to create service: ${res.status}`);
      const newService = await res.json();
      setServices((prev) => [...prev, newService as Service]);
      form.reset();
      showSuccess("Service added!");
    } catch (err) {
      console.error("Failed to add service", err);
    }
  };

  const [editingServiceId, setEditingServiceId] = useState<
    string | number | null
  >(null);
  const [editingValue, setEditingValue] = useState("");
  const [editingHsn, setEditingHsn] = useState("");

  const startEdit = (s: Service) => {
    setEditingServiceId(s._id ?? s.id ?? null);
    setEditingValue(s.name);
    setEditingHsn(s.hsnCode || "");
  };

  const cancelEdit = () => {
    setEditingServiceId(null);
    setEditingValue("");
    setEditingHsn("");
  };

  const saveEdit = async () => {
    if (!editingServiceId) return;
    try {
      const res = await apiFetch(`/api/services/${editingServiceId}`, {
        method: "PUT",
        body: JSON.stringify({ name: editingValue, hsnCode: editingHsn }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Failed to update service: ${res.status}`);
      const updated = await res.json();
      setServices((prev) =>
        prev.map((s) =>
          (s._id ?? s.id) === (updated._id ?? updated.id) ? updated : s,
        ),
      );
      cancelEdit();
      showSuccess("Service updated!");
    } catch (err) {
      console.error("Failed to save service", err);
    }
  };

  const deleteService = async (s: Service) => {
    try {
      const id = s._id ?? s.id;
      const res = await apiFetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed to delete service: ${res.status}`);
      setServices((prev) => prev.filter((x) => (x._id ?? x.id) !== id));
      showSuccess("Service deleted!");
    } catch (err) {
      console.error("Failed to delete service", err);
    }
  };

  return (
    <div className="space-y-8 font-headline">
      {successMessage && <SuccessModal message={successMessage} />}
      <header>
        <h1 className="text-5xl font-black tracking-tighter">SERVICES</h1>
        <p className="text-muted-foreground text-lg">
          Manage the services your agency offers.
        </p>
      </header>

      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-2xl font-black tracking-tighter">
            Add New Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-start gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input placeholder="e.g., Design and Development Services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hsnCode"
                render={({ field }) => (
                  <FormItem className="w-48">
                    <FormControl>
                      <Input placeholder="HSN/SAC code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="text-lg h-14">
                Add Service
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="hidden md:block border-2 border-black">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead className="text-base font-bold">
                Service Name
              </TableHead>
              <TableHead className="text-base font-bold w-48">
                HSN/SAC Code
              </TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
              <TableRow
                key={s._id ?? s.id}
                className="border-b-2 border-black last:border-b-0"
              >
                {editingServiceId === (s._id ?? s.id) ? (
                  <>
                    <TableCell className="font-bold text-base py-4">
                      <Input
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <Input
                        value={editingHsn}
                        onChange={(e) => setEditingHsn(e.target.value)}
                        placeholder="HSN/SAC code"
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={saveEdit}>
                          Save
                        </Button>
                        <Button size="sm" variant="ghost" onClick={cancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="font-bold text-base py-4">
                      {s.name}
                    </TableCell>
                    <TableCell className="text-base py-4 text-muted-foreground">
                      {s.hsnCode || "—"}
                    </TableCell>
                    <TableCell className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => startEdit(s)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteService(s)}
                            className="text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {services.map((s) => {
          const sid = s._id ?? s.id;
          return (
            <div key={sid} className="border-2 border-black bg-white px-3 py-3 flex items-center justify-between gap-2">
              {editingServiceId === sid ? (
                <div className="flex flex-col gap-2 flex-1">
                  <Input value={editingValue} onChange={(e) => setEditingValue(e.target.value)} className="border-2 border-black" />
                  <Input value={editingHsn} onChange={(e) => setEditingHsn(e.target.value)} placeholder="HSN/SAC code" className="border-2 border-black" />
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={saveEdit}>Save</Button>
                    <Button size="sm" variant="ghost" onClick={cancelEdit}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.hsnCode || "—"}</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-5 w-5" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => startEdit(s)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteService(s)} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          );
        })}
        {services.length === 0 && <div className="border-2 border-black p-8 text-center text-muted-foreground font-bold">No services yet.</div>}
      </div>
    </div>
  );
}
