"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  CreditCard, PlusCircle, Trash2, ChevronDown, ChevronUp,
  CheckCircle2, AlertCircle, Clock, TrendingDown, Wallet, CalendarDays,
} from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────────────────────

const EMI_CATEGORIES = [
  { value: 'equipment', label: '🛠️ Equipment & Hardware' },
  { value: 'vehicle', label: '🚗 Vehicle' },
  { value: 'software', label: '💻 Software / Device' },
  { value: 'office', label: '🏢 Office / Property' },
  { value: 'camera', label: '📷 Camera & Gear' },
  { value: 'other', label: '📋 Other' },
];

const PAYMENT_METHODS = [
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'upi', label: 'UPI' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'auto_debit', label: 'Auto Debit / ECS' },
  { value: 'cheque', label: 'Cheque' },
];

// ─── Zod Schema ──────────────────────────────────────────────────────────────

const emiSchema = z.object({
  itemName: z.string().min(1, 'Item name is required'),
  category: z.string().min(1, 'Category is required'),
  vendor: z.string().optional(),
  totalAmount: z.coerce.number().min(1, 'Total amount required'),
  downPayment: z.coerce.number().min(0),
  emiAmount: z.coerce.number().min(1, 'EMI amount required'),
  totalMonths: z.coerce.number().min(1, 'Duration required'),
  interestRate: z.coerce.number().min(0),
  startDate: z.string().min(1, 'Start date required'),
  paymentMethod: z.string().min(1, 'Payment method required'),
  note: z.string().optional(),
});
type EmiForm = z.infer<typeof emiSchema>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCategoryLabel(val: string) {
  return EMI_CATEGORIES.find(c => c.value === val)?.label || val;
}

function getPaymentLabel(val: string) {
  return PAYMENT_METHODS.find(p => p.value === val)?.label || val;
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'paid') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold bg-success/10 text-success border-success/30">
      <CheckCircle2 className="h-3 w-3" /> Paid
    </span>
  );
  if (status === 'overdue') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold bg-destructive/10 text-destructive border-destructive/30">
      <AlertCircle className="h-3 w-3" /> Overdue
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold bg-secondary/10 text-secondary border-secondary/30">
      <Clock className="h-3 w-3" /> Pending
    </span>
  );
}

function EmiStatusBadge({ status }: { status: string }) {
  if (status === 'completed') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-bold bg-success/10 text-success border-success/30">
      <CheckCircle2 className="h-3 w-3" /> Completed
    </span>
  );
  if (status === 'foreclosed') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-bold bg-muted text-muted-foreground border-border">
      Foreclosed
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-bold bg-primary/10 text-primary border-primary/30">
      Active
    </span>
  );
}

// ─── Add EMI Dialog ───────────────────────────────────────────────────────────

function AddEmiDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const form = useForm<EmiForm>({
    resolver: zodResolver(emiSchema),
    defaultValues: {
      itemName: '', category: '', vendor: '', totalAmount: 0,
      downPayment: 0, emiAmount: 0, totalMonths: 12, interestRate: 0,
      startDate: new Date().toISOString().slice(0, 10),
      paymentMethod: '', note: '',
    },
  });

  // Auto-calculate EMI when total, down payment, months, rate change
  const totalAmount = form.watch('totalAmount');
  const downPayment = form.watch('downPayment');
  const totalMonths = form.watch('totalMonths');
  const interestRate = form.watch('interestRate');

  useEffect(() => {
    const principal = Number(totalAmount || 0) - Number(downPayment || 0);
    const months = Number(totalMonths || 1);
    const rate = Number(interestRate || 0);
    if (principal > 0 && months > 0) {
      let emi: number;
      if (rate > 0) {
        const r = rate / 100 / 12;
        emi = Math.round((principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
      } else {
        emi = Math.round(principal / months);
      }
      form.setValue('emiAmount', emi, { shouldValidate: false });
    }
  }, [totalAmount, downPayment, totalMonths, interestRate]);

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) setTimeout(() => form.reset(), 200);
  };

  const onSubmit = async (values: EmiForm) => {
    try {
      setSaving(true);
      const res = await fetch('/api/emi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Failed to save');
      handleOpenChange(false);
      await onCreated();
    } catch (e: any) {
      alert(e?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <PlusCircle className="h-5 w-5" /> Add EMI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">➕ Add New EMI</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField name="itemName" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Item / Purchase Name *</FormLabel>
                <FormControl><Input placeholder="e.g. MacBook Pro M4, Canon EOS R6, Office Furniture..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField name="category" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Category *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {EMI_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="vendor" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Vendor / Store</FormLabel>
                  <FormControl><Input placeholder="e.g. Amazon, Apple Store, Reliance Digital..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField name="totalAmount" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Total Price (₹) *</FormLabel>
                  <FormControl><Input type="number" min={0} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="downPayment" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Down Payment (₹)</FormLabel>
                  <FormControl><Input type="number" min={0} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField name="totalMonths" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Duration (Months) *</FormLabel>
                  <FormControl><Input type="number" min={1} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="interestRate" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Interest Rate (%)</FormLabel>
                  <FormControl><Input type="number" min={0} step={0.01} placeholder="0 for no-cost EMI" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="emiAmount" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Monthly EMI (₹) *</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field}
                      className="font-black text-primary border-primary" />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">Auto-calculated · you can edit</p>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField name="startDate" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">First EMI Date *</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="paymentMethod" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Payment Method *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {PAYMENT_METHODS.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField name="note" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Notes</FormLabel>
                <FormControl><Textarea placeholder="Any details about this purchase or loan..." rows={2} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Summary preview */}
            {totalAmount > 0 && (
              <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Loan Amount</p>
                  <p className="text-lg font-black text-primary">₹{(Number(totalAmount) - Number(downPayment)).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Monthly EMI</p>
                  <p className="text-lg font-black text-primary">₹{Number(form.watch('emiAmount') || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Total Payable</p>
                  <p className="text-lg font-black text-primary">₹{(Number(form.watch('emiAmount') || 0) * Number(totalMonths) + Number(downPayment)).toLocaleString()}</p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={saving}>Cancel</Button>
              <Button type="submit" size="lg" className="gap-2" disabled={saving}>
                {saving ? 'Saving...' : <><PlusCircle className="h-4 w-4" /> Create EMI Plan</>}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// ─── EMI Schedule Row / Panel ─────────────────────────────────────────────────

function EmiCard({ emi, onRefresh }: { emi: any; onRefresh: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [marking, setMarking] = useState<number | null>(null);

  const schedule: any[] = emi.schedule || [];
  const paidCount = schedule.filter(s => s.status === 'paid').length;
  const totalAmount = Number(emi.totalAmount || 0);
  const emiAmount = Number(emi.emiAmount || 0);
  const paidAmount = paidCount * emiAmount + Number(emi.downPayment || 0);
  const remainingAmount = totalAmount - paidAmount;
  const progressPct = emi.totalMonths > 0 ? Math.round((paidCount / emi.totalMonths) * 100) : 0;

  const nextDue = schedule.find(s => s.status === 'pending' || s.status === 'overdue');

  const markEmiPaid = async (monthIndex: number) => {
    try {
      setMarking(monthIndex);
      const updatedSchedule = [...schedule];
      updatedSchedule[monthIndex] = {
        ...updatedSchedule[monthIndex],
        status: 'paid',
        paidOn: new Date().toISOString().slice(0, 10),
      };
      const newPaidCount = updatedSchedule.filter(s => s.status === 'paid').length;
      const newStatus = newPaidCount >= emi.totalMonths ? 'completed' : 'active';

      await fetch(`/api/emi/${emi._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedule: updatedSchedule, paidMonths: newPaidCount, status: newStatus }),
      });
      await onRefresh();
    } catch (e) {
      alert('Failed to mark as paid');
    } finally {
      setMarking(null);
    }
  };

  const markEmiUnpaid = async (monthIndex: number) => {
    try {
      setMarking(monthIndex);
      const updatedSchedule = [...schedule];
      updatedSchedule[monthIndex] = {
        ...updatedSchedule[monthIndex],
        status: 'pending',
        paidOn: null,
      };
      const newPaidCount = updatedSchedule.filter(s => s.status === 'paid').length;

      await fetch(`/api/emi/${emi._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedule: updatedSchedule, paidMonths: newPaidCount, status: 'active' }),
      });
      await onRefresh();
    } catch (e) {
      alert('Failed to undo');
    } finally {
      setMarking(null);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/emi/${emi._id}`, { method: 'DELETE' });
      await onRefresh();
    } catch (e) {
      alert('Failed to delete');
    }
  };

  return (
    <Card className="border-2 border-black overflow-hidden">
      {/* Card Header */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-xl font-black">{emi.itemName}</CardTitle>
              <EmiStatusBadge status={emi.status || 'active'} />
            </div>
            <CardDescription className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
              <span>{getCategoryLabel(emi.category)}</span>
              {emi.vendor && <span>· {emi.vendor}</span>}
              <span>· {getPaymentLabel(emi.paymentMethod)}</span>
              {emi.interestRate > 0 && <span>· {emi.interestRate}% p.a.</span>}
              {emi.interestRate === 0 && <span>· No-Cost EMI</span>}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete EMI Plan?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete <strong>&quot;{emi.itemName}&quot;</strong>? This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-muted rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Total Price</p>
            <p className="text-lg font-black">₹{totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Monthly EMI</p>
            <p className="text-lg font-black text-primary">₹{emiAmount.toLocaleString()}</p>
          </div>
          <div className="bg-success/5 border border-success/20 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Paid So Far</p>
            <p className="text-lg font-black text-success">₹{paidAmount.toLocaleString()}</p>
          </div>
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Remaining</p>
            <p className="text-lg font-black text-secondary">₹{Math.max(0, remainingAmount).toLocaleString()}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-muted-foreground">
            <span>{paidCount} of {emi.totalMonths} EMIs paid</span>
            <span>{progressPct}% complete</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden border border-border">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {nextDue && emi.status !== 'completed' && (
            <p className="text-xs text-muted-foreground">
              Next due: <span className="font-bold text-foreground">
                {new Date(nextDue.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span> · ₹{emiAmount.toLocaleString()}
            </p>
          )}
        </div>

        {/* Expanded schedule */}
        {expanded && (
          <div className="border-t border-border pt-4">
            <p className="text-sm font-black mb-3 uppercase tracking-wide text-muted-foreground">EMI Schedule</p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-black w-16">Month</TableHead>
                    <TableHead className="font-black">Due Date</TableHead>
                    <TableHead className="font-black text-right">Amount</TableHead>
                    <TableHead className="font-black">Status</TableHead>
                    <TableHead className="font-black">Paid On</TableHead>
                    <TableHead className="font-black text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((s: any, idx: number) => (
                    <TableRow
                      key={idx}
                      className={s.status === 'paid' ? 'opacity-60' : 'hover:bg-muted/30'}
                    >
                      <TableCell className="font-bold text-center">{s.month}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(s.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </TableCell>
                      <TableCell className="text-right font-bold">₹{Number(s.amount).toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status={s.status} /></TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {s.paidOn
                          ? new Date(s.paidOn).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                          : '—'}
                      </TableCell>
                      <TableCell className="text-center">
                        {s.status === 'paid' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7 hover:bg-destructive/10 hover:text-destructive"
                            disabled={marking === idx}
                            onClick={() => markEmiUnpaid(idx)}
                          >
                            Undo
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 border-success text-success hover:bg-success hover:text-success-foreground"
                            disabled={marking === idx}
                            onClick={() => markEmiPaid(idx)}
                          >
                            {marking === idx ? '...' : 'Mark Paid'}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EmiPage() {
  const [emis, setEmis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/emi');
      if (!res.ok) throw new Error();
      setEmis(await res.json());
    } catch {
      console.error('Failed to load EMIs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Summary stats
  const stats = useMemo(() => {
    const active = emis.filter(e => e.status === 'active' || !e.status);
    const totalOutstanding = active.reduce((s, e) => {
      const paid = (e.paidMonths || 0) * Number(e.emiAmount || 0);
      const downPayment = Number(e.downPayment || 0);
      return s + Math.max(0, Number(e.totalAmount || 0) - paid - downPayment);
    }, 0);
    const monthlyBurden = active.reduce((s, e) => s + Number(e.emiAmount || 0), 0);
    const totalInvested = emis.reduce((s, e) => {
      const paid = (e.paidMonths || 0) * Number(e.emiAmount || 0) + Number(e.downPayment || 0);
      return s + paid;
    }, 0);

    return { total: emis.length, active: active.length, totalOutstanding, monthlyBurden, totalInvested };
  }, [emis]);

  const filtered = useMemo(() => {
    if (filterStatus === 'all') return emis;
    if (filterStatus === 'completed') return emis.filter(e => e.status === 'completed');
    return emis.filter(e => e.status === 'active' || !e.status);
  }, [emis, filterStatus]);

  return (
    <div className="space-y-6 font-headline">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black">EMI TRACKER</h1>
          <p className="text-muted-foreground mt-1">Track all your purchase EMIs — devices, equipment, vehicles & more.</p>
        </div>
        <AddEmiDialog onCreated={load} />
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-2 border-black">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Monthly Burden</p>
                <p className="text-2xl font-black mt-1">₹{stats.monthlyBurden.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stats.active} active EMIs</p>
              </div>
              <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Total Outstanding</p>
                <p className="text-2xl font-black mt-1">₹{stats.totalOutstanding.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Remaining to pay</p>
              </div>
              <div className="h-12 w-12 bg-secondary rounded-xl flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Total Paid So Far</p>
                <p className="text-2xl font-black mt-1">₹{stats.totalInvested.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Across all EMIs</p>
              </div>
              <div className="h-12 w-12 bg-success rounded-xl flex items-center justify-center">
                <Wallet className="h-6 w-6 text-success-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Total Plans</p>
                <p className="text-2xl font-black mt-1">{stats.total}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stats.active} active · {stats.total - stats.active} done</p>
              </div>
              <div className="h-12 w-12 bg-accent rounded-xl flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as const).map(s => (
          <Button
            key={s}
            variant={filterStatus === s ? 'default' : 'outline'}
            size="sm"
            className={`capitalize font-bold border-2 border-black ${filterStatus === s ? 'bg-black text-white' : ''}`}
            onClick={() => setFilterStatus(s)}
          >
            {s === 'all' ? 'All' : s === 'active' ? '🔄 Active' : '✅ Completed'}
          </Button>
        ))}
      </div>

      {/* EMI Cards */}
      {loading ? (
        <div className="flex items-center justify-center h-48 text-muted-foreground">Loading EMI plans...</div>
      ) : filtered.length === 0 ? (
        <Card className="border-2 border-black">
          <CardContent className="flex flex-col items-center justify-center h-48 gap-3 text-muted-foreground">
            <CreditCard className="h-12 w-12 opacity-20" />
            <p className="font-bold text-lg">No EMI plans found</p>
            <p className="text-sm">Click &quot;Add EMI&quot; to track your first purchase.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map(emi => (
            <EmiCard key={emi._id} emi={emi} onRefresh={load} />
          ))}
        </div>
      )}
    </div>
  );
}
