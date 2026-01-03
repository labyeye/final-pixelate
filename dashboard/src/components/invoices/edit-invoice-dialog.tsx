"use client";

import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

export function EditInvoiceDialog({ invoice, clients, services, projects, onUpdated }: { invoice: any; clients: any[]; services: any[]; projects: any[]; onUpdated?: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [teamMembers, setTeamMembers] = React.useState<any[]>([]);
  const [inventory, setInventory] = React.useState<any[]>([]);
  const form = useForm({ defaultValues: { clientId: '', projectTitle: '', title: '', amount: 0, dueDate: '', serviceId: '', status: '', invoiceNo: '', assignedStaff: [], equipmentAssigned: [] } });

  const selectedServiceId = form.watch('serviceId');
  const selectedService = services.find((s: any) => String(s.id ?? s._id) === String(selectedServiceId));
  const isWebDev = (selectedService?.name || '').toLowerCase() === 'web development';

  React.useEffect(() => {
    if (open && invoice) {
      form.reset({
        clientId: String(invoice.clientId ?? invoice.client ?? invoice.clientName ?? ''),
        invoiceNo: invoice.invoiceNo ?? invoice.invoiceNo ?? '',
        projectTitle: invoice.projectTitle ?? invoice.title ?? '',
        title: invoice.title ?? invoice.projectTitle ?? '',
        amount: invoice.amount ?? 0,
        dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().slice(0, 10) : '',
        serviceId: String(invoice.serviceId ?? ''),
        status: invoice.status ?? 'DUE',
        // new fields
        assignedStaff: Array.isArray(invoice.assignedStaff) ? invoice.assignedStaff : (invoice.assignedStaff ? String(invoice.assignedStaff).split(',').map((s:string)=>s.trim()).filter(Boolean) : []),
        workDate: invoice.workDate ? (new Date(invoice.workDate)).toISOString().slice(0,10) : '',
        workTime: invoice.workTime ?? '',
        venueName: invoice.venueName ?? '',
        venueAddress: invoice.venueAddress ?? '',
        includeVenueName: Boolean(invoice.venueName),
        includeVenueAddress: Boolean(invoice.venueAddress),
        equipmentAssigned: Array.isArray(invoice.equipmentAssigned) ? invoice.equipmentAssigned : (invoice.equipmentAssigned ? String(invoice.equipmentAssigned).split(',').map((s:string)=>s.trim()).filter(Boolean) : []),
        description: invoice.description ?? '',
      });
    }
  }, [open, invoice]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/team-members');
        const data = await res.json();
        if (mounted) setTeamMembers(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to load team members', e);
      }
    })();
    (async () => {
      try {
        const res = await fetch('/api/inventory');
        const data = await res.json();
        if (mounted) setInventory(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to load inventory', e);
      }
    })();
    return () => { mounted = false; };
  }, [open]);

  const handleSave = async (values: any) => {
    try {
      const body: any = {
        clientId: values.clientId || null,
        clientName: clients.find(c => String(c.id ?? c._id) === String(values.clientId))?.name || '',
        projectTitle: values.projectTitle || values.title || '',
        title: values.title || values.projectTitle || 'Invoice',
        amount: Number(values.amount || 0),
        dueDate: values.dueDate || '',
        serviceId: values.serviceId || null,
        // new fields
        assignedStaff: Array.isArray(values.assignedStaff) ? values.assignedStaff : (values.assignedStaff ? String(values.assignedStaff).split(',').map((s:string)=>s.trim()).filter(Boolean) : []),
        workDate: values.workDate || '',
        workTime: values.workTime || '',
        equipmentAssigned: Array.isArray(values.equipmentAssigned) ? values.equipmentAssigned : (values.equipmentAssigned ? String(values.equipmentAssigned).split(',').map((s:string)=>s.trim()).filter(Boolean) : []),
        description: values.description || undefined,
        status: values.status || 'DUE',
      };
      // include venue fields only if the toggles are enabled
      if (values.includeVenueName) body.venueName = values.venueName || '';
      if (values.includeVenueAddress) body.venueAddress = values.venueAddress || '';

      const res = await fetch(`/api/invoices/${invoice._id ?? invoice.id}`, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error('Failed to update invoice');
      setOpen(false);
      if (onUpdated) onUpdated();
    } catch (e) {
      console.error('Failed to save invoice', e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="invoiceNo" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice No</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                </FormItem>
              )} />
              <FormField name="clientId" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border p-2">
                      <option value="">Select client</option>
                      {clients.map(c => <option key={String(c.id ?? c._id)} value={String(c.id ?? c._id)}>{c.name}</option>)}
                    </select>
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="projectTitle" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="title" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="amount" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="dueDate" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="serviceId" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border p-2">
                      <option value="">Select service</option>
                      {services.map(s => <option key={String(s.id ?? s._id)} value={String(s.id ?? s._id)}>{s.name}</option>)}
                    </select>
                  </FormControl>
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="assignedStaff" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Staff</FormLabel>
                  <FormControl>
                    <div className="border rounded p-2 max-h-40 overflow-auto">
                      {teamMembers.length === 0 && <div className="text-sm text-muted-foreground">No team members</div>}
                      {teamMembers.map(m => {
                        const id = String(m._id ?? m.id);
                        const selected = Array.isArray(field.value) && field.value.includes(id);
                        return (
                          <div key={id} className="flex items-center justify-between p-1">
                            <div>{m.name}</div>
                            <div>
                              <label className="inline-flex items-center space-x-2">
                                <input type="checkbox" checked={selected} onChange={(e:any) => {
                                  const vals = Array.isArray(field.value) ? [...field.value] : [];
                                  if (e.target.checked) {
                                    if (!vals.includes(id)) vals.push(id);
                                  } else { const idx = vals.indexOf(id); if (idx >= 0) vals.splice(idx,1); }
                                  field.onChange(vals);
                                }} />
                                <span className="text-sm">Select</span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="workDate" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Work</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="workTime" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Time of Work</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="equipmentAssigned" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Equipment Assigned</FormLabel>
                  <FormControl>
                    <div className="border rounded p-2 max-h-40 overflow-auto">
                      {inventory.length === 0 && <div className="text-sm text-muted-foreground">No inventory</div>}
                      {inventory.map(it => {
                        const id = String(it._id ?? it.id);
                        const selected = Array.isArray(field.value) && field.value.includes(id);
                        return (
                          <div key={id} className="flex items-center justify-between p-1">
                            <div>{it.itemName} ({it.quantityAvailable} {it.unit})</div>
                            <div>
                              <label className="inline-flex items-center space-x-2">
                                <input type="checkbox" checked={selected} onChange={(e:any) => {
                                  const vals = Array.isArray(field.value) ? [...field.value] : [];
                                  if (e.target.checked) {
                                    if (!vals.includes(id)) vals.push(id);
                                  } else { const idx = vals.indexOf(id); if (idx >= 0) vals.splice(idx,1); }
                                  field.onChange(vals);
                                }} />
                                <span className="text-sm">Select</span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </FormControl>
                </FormItem>
              )} />

              <div className="flex flex-col gap-2">
                <FormField name="includeVenueName" control={form.control} render={({ field }) => (
                  <FormItem>
                    <label className="inline-flex items-center space-x-2">
                      <input type="checkbox" checked={field.value || false} onChange={(e:any)=>field.onChange(e.target.checked)} />
                      <span className="font-medium">Include Venue Name</span>
                    </label>
                  </FormItem>
                )} />
                <FormField name="venueName" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!form.getValues().includeVenueName} />
                    </FormControl>
                  </FormItem>
                )} />

                <FormField name="includeVenueAddress" control={form.control} render={({ field }) => (
                  <FormItem>
                    <label className="inline-flex items-center space-x-2">
                      <input type="checkbox" checked={field.value || false} onChange={(e:any)=>field.onChange(e.target.checked)} />
                      <span className="font-medium">Include Venue Address</span>
                    </label>
                  </FormItem>
                )} />
                <FormField name="venueAddress" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue Address</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!form.getValues().includeVenueAddress} />
                    </FormControl>
                  </FormItem>
                )} />
              </div>

              {isWebDev && (
                <FormField name="description" control={form.control} render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description (Web Development)</FormLabel>
                    <FormControl>
                      <textarea {...field} className="w-full border p-2 h-24" />
                    </FormControl>
                  </FormItem>
                )} />
              )}

            </div>

            <DialogFooter>
              <Button type="submit" size="lg" className="w-full">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditInvoiceDialog;
