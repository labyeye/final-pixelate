




export type AgencySettings = {
  _id?: string;
  id?: string;
  name: string;
  logoUrl?: string;
  aboutUs: string;
  mission: string;
  vision: string;
  goal: string;
  approach: string[];
  terms: string[];
  footerText: string;
  brandingNotes?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  gst?: string;
  updatedAt?: Date | string;
};

export type Client = {
  _id?: string;
  id?: string;
  name: string;
  businessName?: string;
  address?: string;
  email?: string;
  phone?: string;
  gst?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type QuotationTimeline = {
  _id?: string;
  id?: string;
  phase: string;
  description: string;
  duration: string;
};

export type QuotationLineItem = {
  _id?: string;
  id?: string;
  name: string;
  qty: number;
  unitPrice: number;
  tax: number;
  total: number;
};

export type QuotationService = {
  _id?: string;
  id?: string;
  serviceName: string;
  qty: number;
  price: number;
  total: number;
};

export type QuotationModule = {
  _id?: string;
  id?: string;
  moduleName: string;
  description: string;
  status: "Planned" | "Ongoing" | "Completed";
};

export type Quotation = {
  _id?: string;
  id?: string;
  quoteId: string; 
  title: string;
  subtitle?: string;
  date: Date | string;
  clientId: string;

  
  objective: string;
  purpose: string;
  scope: string[];
  deliverables: string[];

  
  timeline: QuotationTimeline[];
  lineItems: QuotationLineItem[];
  services: QuotationService[];
  modules: QuotationModule[];

  
  notes?: string;
  paymentTerms?: string;
  customTerms?: string[];

  
  projectId?: string;
  clientDisplayId?: string;
  projectTitle?: string;
  projectType?: string;
  productType?: string;
  pages?: string;
  budget?: string | number;
  startDate?: Date | string;
  deadline?: Date | string;
  brief?: string;
  scopeOfWork?: string[] | string;
  outOfScope?: string[] | string;
  techStack?: string[] | string;
  milestones?: string[] | string;
  paymentMilestones?: string[] | string;
  paymentMethod?: string;

  
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "CONVERTED";
  authorId?: string | number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};


export function calculateQuotationTotals(quotation: Quotation) {
  const lineItemsTotal = quotation.lineItems.reduce(
    (sum, item) => sum + item.total,
    0
  );
  const servicesTotal = quotation.services.reduce(
    (sum, item) => sum + item.total,
    0
  );
  const subtotal = lineItemsTotal + servicesTotal;
  const taxAmount = quotation.lineItems.reduce(
    (sum, item) => sum + (item.unitPrice * item.qty * item.tax) / 100,
    0
  );
  const grandTotal = subtotal;

  return { subtotal, taxAmount, grandTotal };
}


export function generateQuotationId(lastId?: string): string {
  const year = new Date().getFullYear();
  const prefix = `PXL-${year}-`;

  if (!lastId) return `${prefix}001`;

  const match = lastId.match(/PXL-\d{4}-(\d+)/);
  if (match) {
    const num = parseInt(match[1], 10) + 1;
    return `${prefix}${String(num).padStart(3, "0")}`;
  }

  return `${prefix}001`;
}
