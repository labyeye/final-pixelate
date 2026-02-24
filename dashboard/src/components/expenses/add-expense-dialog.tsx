"use client";

import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, Pencil, Briefcase } from 'lucide-react';

export const EXPENSE_CATEGORIES = [
  { value: 'salary', label: '💼 Salary & Payroll' },
  { value: 'inventory', label: '📦 Inventory & Stock' },
  { value: 'office', label: '🏢 Office & Rent' },
  { value: 'software', label: '💻 Software & Subscriptions' },
  { value: 'marketing', label: '📣 Marketing & Ads' },
  { value: 'utilities', label: '⚡ Utilities & Bills' },
  { value: 'travel', label: '✈️ Travel & Transport' },
  { value: 'equipment', label: '🛠️ Equipment & Hardware' },
  { value: 'freelancer', label: '👨‍💻 Freelancer & Contractor' },
  { value: 'legal', label: '⚖️ Legal & Compliance' },
  { value: 'food', label: '🍽️ Food & Entertainment' },
  { value: 'miscellaneous', label: '📋 Miscellaneous' },
];

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'upi', label: 'UPI' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'other', label: 'Other' },
];

export const EXPENSE_STATUS = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'cancelled', label: 'Cancelled' },
];

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  status: z.string().min(1, 'Status is required'),
  vendor: z.string().optional(),
  reference: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  note: z.string().optional(),
  // Salary-specific fields
  staffMemberId: z.string().optional(),
  linkedProjectId: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof schema>;

interface AddExpenseDialogProps {
  onCreated?: () => void;
  editData?: any;
  editId?: string;
  trigger?: React.ReactNode;
}

const EMPTY_DEFAULTS: ExpenseFormValues = {
  title: '',
  amount: 0,
  category: '',
  paymentMethod: '',
  status: 'paid',
  vendor: '',
  reference: '',
  date: new Date().toISOString().slice(0, 10),
  note: '',
  staffMemberId: '',
  linkedProjectId: '',
};

function buildDefaults(editData?: any): ExpenseFormValues {
  if (!editData) return { ...EMPTY_DEFAULTS, date: new Date().toISOString().slice(0, 10) };
  return {
    title: editData.title || '',
    amount: editData.amount || 0,
    category: editData.category || '',
    paymentMethod: editData.paymentMethod || '',
    status: editData.status || 'paid',
    vendor: editData.vendor || '',
    reference: editData.reference || '',
    date: editData.date
      ? String(editData.date).slice(0, 10)
      : editData.createdAt
        ? new Date(editData.createdAt).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    note: editData.note || '',
    staffMemberId: editData.staffMemberId || '',
    linkedProjectId: editData.linkedProjectId || '',
  };
}

export function AddExpenseDialog({ onCreated, editData, editId, trigger }: AddExpenseDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [teamMembers, setTeamMembers] = React.useState<any[]>([]);
  const [projects, setProjects] = React.useState<any[]>([]);
  const isEdit = !!editId;

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_DEFAULTS,
  });

  // Watch category to conditionally show salary fields
  const watchedCategory = form.watch('category');
  const watchedStaffId = form.watch('staffMemberId');
  const isSalary = watchedCategory === 'salary';

  // Every time the dialog opens, reset with latest editData (or clean empty for add)
  React.useEffect(() => {
    if (open) {
      form.reset(buildDefaults(editData));
      // Fetch team members and projects when dialog opens
      fetch('/api/team-members').then(r => r.json()).then(d => setTeamMembers(Array.isArray(d) ? d : [])).catch(() => {});
      fetch('/api/projects').then(r => r.json()).then(d => setProjects(Array.isArray(d) ? d : [])).catch(() => {});
    }
  }, [open]); // intentionally only on `open` change

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) {
      // Give the closing animation time, then reset to avoid flash of stale data
      setTimeout(() => form.reset(EMPTY_DEFAULTS), 200);
    }
  };

  const handleSave = async (values: ExpenseFormValues) => {
    try {
      setSaving(true);

      // Find staff name for salary expenses
      let staffName = '';
      if (values.staffMemberId) {
        const member = teamMembers.find(m => String(m._id || m.id) === values.staffMemberId);
        staffName = member?.name || '';
      }

      // Find linked project title
      let linkedProjectTitle = '';
      if (values.linkedProjectId) {
        const proj = projects.find(p => String(p._id || p.id) === values.linkedProjectId);
        linkedProjectTitle = proj?.title || '';
      }

      const body = {
        title: values.title,
        amount: Number(values.amount),
        category: values.category,
        paymentMethod: values.paymentMethod,
        status: values.status,
        vendor: values.vendor || '',
        reference: values.reference || '',
        date: values.date,
        note: values.note || '',
        ...(values.category === 'salary' ? {
          staffMemberId: values.staffMemberId || '',
          staffName,
          linkedProjectId: values.linkedProjectId || '',
          linkedProjectTitle,
        } : {}),
      };

      const url = isEdit ? `/api/expenses/${editId}` : '/api/expenses';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Failed to save expense');
      }
      handleOpenChange(false);
      if (onCreated) await onCreated();
    } catch (e: any) {
      console.error(e);
      alert(e?.message || 'Failed to save expense');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="gap-2">
            <PlusCircle className="h-5 w-5" />
            {isEdit ? 'Edit Expense' : 'New Expense'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            {isEdit ? '✏️ Edit Expense' : '➕ Add New Expense'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            {/* Title */}
            <FormField name="title" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Expense Title *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Monthly Server Cost, John Doe Salary..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              {/* Amount */}
              <FormField name="amount" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Amount (₹) *</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} step={0.01} placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Date */}
              <FormField name="date" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <FormField name="category" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Category *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EXPENSE_CATEGORIES.map(c => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Status */}
              <FormField name="status" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Status *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EXPENSE_STATUS.map(s => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Payment Method */}
            <FormField name="paymentMethod" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Payment Method *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PAYMENT_METHODS.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            {/* Salary-specific: Staff Member + Linked Project */}
            {isSalary && (
              <div className="border-2 border-black p-4 space-y-4 rounded-sm bg-amber-50/60">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="h-4 w-4 text-amber-700" />
                  <span className="text-sm font-black text-amber-800 uppercase tracking-widest">Salary Details</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Staff Member */}
                  <FormField name="staffMemberId" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Staff Member *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select staff member" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">— Select Staff —</SelectItem>
                          {teamMembers.map(m => (
                            <SelectItem key={String(m._id || m.id)} value={String(m._id || m.id)}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Linked Project (filtered to projects where staff is assignee) */}
                  <FormField name="linkedProjectId" control={form.control} render={({ field }) => {
                    // Find the staff name for filtering
                    const staffMember = teamMembers.find(m => String(m._id || m.id) === watchedStaffId);
                    const staffName = staffMember?.name || '';
                    // Filter projects where this staff is assigned
                    const assignedProjects = watchedStaffId && watchedStaffId !== 'none'
                      ? projects.filter(p => {
                          const assignees = Array.isArray(p.assignees) ? p.assignees : [];
                          return assignees.some((a: any) =>
                            typeof a === 'string'
                              ? a === staffName || a === watchedStaffId
                              : a?.name === staffName || a?.id === watchedStaffId || String(a?._id) === watchedStaffId
                          );
                        })
                      : projects;
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Linked Booking / Project</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ''}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project (optional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">— No Project —</SelectItem>
                            {assignedProjects.map(p => (
                              <SelectItem key={String(p._id || p.id)} value={String(p._id || p.id)}>
                                {p.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }} />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* Vendor */}
              <FormField name="vendor" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Vendor / Paid To</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Amazon, Employee Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Reference */}
              <FormField name="reference" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Reference / Invoice No.</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. INV-001, TXN-9823..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Note */}
            <FormField name="note" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Additional details about this expense..." rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={saving}>Cancel</Button>
              <Button type="submit" size="lg" className="gap-2" disabled={saving}>
                {saving
                  ? 'Saving...'
                  : isEdit
                    ? <><Pencil className="h-4 w-4" /> Update Expense</>
                    : <><PlusCircle className="h-4 w-4" /> Save Expense</>
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddExpenseDialog;
