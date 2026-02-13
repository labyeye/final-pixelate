export function formatCurrency(v: number) {
  // Use "Rs." instead of ₹ symbol for PDF compatibility
  // jsPDF converts ₹ (U+20B9) to "1" due to font encoding issues
  // "Rs." is the traditional Indian currency notation and renders correctly
  const formatted = (v || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `Rs. ${formatted}`;
}

// Alternative: Use ₹ for web display only (not recommended for PDFs)
export function formatCurrencyWeb(v: number) {
  const formatted = (v || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `₹${formatted}`;
}
