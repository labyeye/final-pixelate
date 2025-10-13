
'use client';

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Quotation, Service, Client } from "@/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "../ui/scroll-area";
import React from "react";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const serviceItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  amount: z.coerce.number().min(0),
  deliverables: z.string().optional(),
});

const formSchema = z.object({
  clientId: z.string({ required_error: "Please select a client." }).min(1, "Please select a client."),
  services: z.array(serviceItemSchema).min(1, "At least one service is required."),
  amount: z.coerce.number().min(0).default(0),
  discount: z.coerce.number().min(0, "Discount cannot be negative.").default(0),
  deliveryDate: z.date().optional(),
});

type AddQuotationDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddQuotation: (newQuote: any) => void;
  initialValues?: any;
  children: React.ReactNode;
};

export function AddQuotationDialog({ isOpen, setIsOpen, onAddQuotation, children, initialValues }: AddQuotationDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      amount: 0,
      discount: 0,
    },
  });
  
  // If initialValues are provided (editing), populate the form when dialog opens
  React.useEffect(() => {
    if (isOpen && initialValues) {
      // Normalize date fields for the form if they are strings
      const norm = { ...initialValues };
      if (norm.deliveryDate) norm.deliveryDate = norm.deliveryDate ? new Date(norm.deliveryDate) : undefined;
      if (Array.isArray(norm.services)) {
        norm.services = norm.services.map((s: any) => ({
          ...s,
          startDate: s.startDate ? new Date(s.startDate) : undefined,
          endDate: s.endDate ? new Date(s.endDate) : undefined,
        }));
      }
      form.reset(norm);
      return;
    }
    if (!isOpen) {
      form.reset({ services: [], amount: 0, discount: 0 });
    }
  }, [isOpen, initialValues]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // compute subtotal from service amounts if not provided
    const subtotal = (values.services || []).reduce((s, it) => s + Number(it.amount || 0), 0);
    const payload = { ...values, amount: subtotal };
    onAddQuotation(payload);
    form.reset();
    setIsOpen(false);
  }

  // client-side fetched lists to avoid importing server-only modules into the client bundle
  // Use local types where we guarantee `id` is a string for keys and select values.
  type LocalClient = Client & { id: string };
  type LocalService = Service & { id: string };

  const [allServices, setAllServices] = React.useState<LocalService[]>([]);
  const [allClients, setAllClients] = React.useState<LocalClient[]>([]);

  React.useEffect(() => {
    let mounted = true;
    if (!isOpen) return;
    (async () => {
      try {
        const [sRes, cRes] = await Promise.all([fetch('/api/services'), fetch('/api/clients')]);
        if (!sRes.ok || !cRes.ok) return;
  const [sJson, cJson] = await Promise.all([sRes.json(), cRes.json()]);
        if (!mounted) return;
  // Normalize server objects: prefer `id` if present, otherwise use `._id` as string.
  const normServices = (sJson as any[] || []).map(s => ({ ...s, id: s.id ?? (s._id ? String(s._id) : String(s.id)) })) as LocalService[];
  const normClients = (cJson as any[] || []).map(c => ({ ...c, id: c.id ?? (c._id ? String(c._id) : String(c.id)) })) as LocalClient[];
  setAllServices(normServices);
  setAllClients(normClients);
      } catch (e) {
        // ignore fetch errors; keep lists empty
        console.error('Failed to load services or clients', e);
      }
    })();
    return () => { mounted = false; };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl font-black tracking-tighter">{initialValues ? 'Edit Quotation' : 'New Quotation'}</DialogTitle>
          <DialogDescription>
            {initialValues ? 'Modify the quotation and save changes.' : 'Fill in the details below to create a new quotation.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ScrollArea className="h-[60vh] pr-6">
                <div className="space-y-6">
                    
                    <FormField
                      control={form.control}
                      name="clientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value ? String(field.value) : undefined}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a client" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {(allClients ?? []).filter(c => c.id != null).map(client => (
                                <SelectItem key={String(client.id)} value={String(client.id)}>
                                  {client.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Separator className="border-t-2 border-black" />

          {/* Services: allow adding multiple service entries with details */}
          <FormField control={form.control} name="services" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Services</FormLabel>
              <div className="space-y-3">
                {(field.value || []).map((svcItem: any, idx: number) => (
                  <div key={idx} className="p-3 border rounded">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <FormLabel>Service</FormLabel>
                        <Select onValueChange={(v) => {
                          const found = allServices.find(s => String(s.id) === String(v));
                          const next = [...field.value];
                          next[idx] = { ...next[idx], id: String(v), name: found?.name || v };
                          field.onChange(next);
                        }} value={String(svcItem.id || '')}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(allServices ?? []).map(s => (
                              <SelectItem key={String(s.id)} value={String(s.id)}>{s.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <FormLabel>Amount (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" value={svcItem.amount || ''} onChange={(e) => {
                            const next = [...field.value];
                            next[idx] = { ...next[idx], amount: Number(e.target.value || 0) };
                            field.onChange(next);
                          }} />
                        </FormControl>
                      </div>
                      <div>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" value={svcItem.startDate ? (new Date(svcItem.startDate)).toISOString().slice(0,10) : ''} onChange={(e) => {
                            const next = [...field.value];
                            next[idx] = { ...next[idx], startDate: e.target.value ? new Date(e.target.value) : undefined };
                            field.onChange(next);
                          }} />
                        </FormControl>
                      </div>
                      <div>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" value={svcItem.endDate ? (new Date(svcItem.endDate)).toISOString().slice(0,10) : ''} onChange={(e) => {
                            const next = [...field.value];
                            next[idx] = { ...next[idx], endDate: e.target.value ? new Date(e.target.value) : undefined };
                            field.onChange(next);
                          }} />
                        </FormControl>
                      </div>
                      <div className="md:col-span-2">
                        <FormLabel>Deliverables</FormLabel>
                        <FormControl>
                          <Input value={svcItem.deliverables || ''} onChange={(e) => {
                            const next = [...field.value];
                            next[idx] = { ...next[idx], deliverables: e.target.value };
                            field.onChange(next);
                          }} />
                        </FormControl>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button variant="destructive" onClick={() => {
                        const next = (field.value || []).filter((_: any, i: number) => i !== idx);
                        field.onChange(next);
                      }}>Remove</Button>
                    </div>
                  </div>
                ))}

                <div>
                  <Button onClick={() => {
                    const next = [...(field.value || []), { id: '', name: '', amount: 0 }];
                    field.onChange(next);
                  }}>Add service</Button>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )} />

                    <Separator className="border-t-2 border-black" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="amount" render={({ field }) => (
                            <FormItem><FormLabel>Amount (₹)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="discount" render={({ field }) => (
                            <FormItem><FormLabel>Discount (₹)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="deliveryDate" render={({ field }) => (
                            <FormItem className="flex flex-col"><FormLabel>Delivery Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal h-14", !field.value && "text-muted-foreground")}>
                                            {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus/>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </div>
              </ScrollArea>
        <DialogFooter className="pt-8">
          <Button type="submit" size="lg" className="text-lg w-full">{initialValues ? 'Save Changes' : 'Create Quotation'}</Button>
        </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
