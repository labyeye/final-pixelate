import { format } from 'date-fns';
import type { Product } from '../../api';

export const PRODUCT_NAME: Record<Product, string> = {
  hr: 'Nest HR',
  leads: 'Nest Leads',
  play: 'Nest Play',
};

export const fmtNum = (n?: number) =>
  new Intl.NumberFormat('en-IN').format(Number(n ?? 0));

export const fmtINR = (n?: number) => `₹${fmtNum(n)}`;

export const fmtDate = (d?: string | null) => {
  if (!d) return '—';
  const date = new Date(d);
  return isNaN(date.getTime()) ? '—' : format(date, 'dd MMM yyyy');
};

export const apiError = (e: any, fallback: string) =>
  e?.response?.data?.error || e?.message || fallback;
