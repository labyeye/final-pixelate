export function formatCurrency(v: number) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(v || 0);
  } catch (e) {
    // fallback to a readable ASCII representation when fonts may be missing in PDF
    return ` ${(v || 0).toLocaleString()}`;
  }
}
