export interface Client {
  id?: number | string;
  _id?: string | any;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pin?: string;
  hasGst?: boolean;
  gstCompanyName?: string;
  gstNumber?: string;
  gstAddress?: string;
  loginEmail?: string;
  loginPassword?: string;
  userId?: string;

  status?: "active" | "inactive" | "prospect" | "churned";
  tags?: string[];
  industry?: string;
  notes?: string;
  convertedFromLeadId?: string;
  createdAt?: Date | string;
}

export const clients: Client[] = [];

export async function getClients() {
  const svc = await import("./services");
  return svc.getClients();
}

export async function addClient(client: Omit<Client, "id" | "_id">) {
  const svc = await import("./services");
  return svc.createClient(client);
}

export interface User {
  id?: number | string;
  _id?: string | any;
  name: string;
  email: string;
  role: "admin" | "staff" | "client";
  password?: string;
  avatarUrl?: string;

  avatar?: string;

  profilePicture?: string;
  allowedPages?: string[];

  clientId?: string;
}

export const users: User[] = [];

export async function getUsers() {
  const svc = await import("./services");
  return svc.getUsers();
}

export async function addUser(user: Omit<User, "id" | "_id">) {
  const svc = await import("./services");
  return svc.createUser(user);
}

export interface LeadActivity {
  _id?: string | any;
  leadId: string;
  type: "note" | "call" | "email" | "meeting" | "status_change" | "conversion";
  content: string;
  createdBy?: string;
  createdByName?: string;
  createdAt?: Date | string;
}

export interface Lead {
  id?: number;
  _id?: string | any;
  name: string;
  project?: string;
  value?: number;
  category?: string;
  doNotDelete?: boolean;
  reason?: string;
  status?:
    | "not called"
    | "called"
    | "not interested"
    | "meeting booked"
    | "interested"
    | "call back later"
    | "converted"
    | "other";
  statusReason?: string;
  phone?: string;
  email?: string;
  assignedTo?: string | any;
  assignedToName?: string;
  subject?: string;
  message?: string;
  projectType?: string;
  budget?: string | number | null;
  selectedPlan?: string | null;
  source?: string;
  campaignName?: string;
  formName?: string;
  adName?: string;
  fbLeadId?: string;
  indiamrtSynced?: boolean;
  indiamrtResponse?: any;

  priority?: "low" | "medium" | "high";
  followUpDate?: Date | string | null;
  tags?: string[];
  score?: number;
  convertedToClientId?: string | null;
  city?: string;
  notes?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export const leads: Lead[] = [];

export const leadStatuses: (
  | "not called"
  | "called"
  | "not interested"
  | "meeting booked"
  | "interested"
  | "call back later"
  | "other"
)[] = [
  "not called",
  "called",
  "not interested",
  "meeting booked",
  "interested",
  "call back later",
  "other",
];

export async function getLeads() {
  const svc = await import("./services");
  const col = await svc.getCollection("leads");
  return col.find().toArray();
}

export type ProjectStatus =
  | "BACKLOG"
  | "IN PROGRESS"
  | "IN REVIEW"
  | "COMPLETED";

export interface Project {
  id?: number | string;
  _id?: string | any;
  title: string;
  client?: string;
  progress?: number;
  description?: string;
  status?: ProjectStatus;
  dueDate?: string;
  services?: { id?: string | number; name?: string; amount?: number }[];
  assignees?: { id?: string | number; payout?: number }[];
  amount?: number;
  workUrl?: string;
  brandLogo?: string;
}

export let projects: Project[] = [];

export const projectStatuses: ProjectStatus[] = [
  "BACKLOG",
  "IN PROGRESS",
  "IN REVIEW",
  "COMPLETED",
];

export async function getProjects() {
  const svc = await import("./services");
  const col = await svc.getCollection("projects");
  return col.find().toArray();
}

export interface QuotationServiceItem {
  id?: number | string;
  name?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  amount?: number;
  deliverables?: string;
}

export interface Quotation {
  id?: string;
  _id?: string | any;
  status?: "APPROVED" | "PENDING" | "REJECTED";
  clientId?: number | string | any;
  clientName?: string;
  services?: QuotationServiceItem[];
  amount?: number;
  discount?: number;
  deliveryDate?: Date;
  authorId?: number | any;
}

export const quotations: Quotation[] = [];

export async function getQuotations() {
  const svc = await import("./services");
  const col = await svc.getCollection("quotations");
  return col.find().toArray();
}

export const invoices: any[] = [];

export async function getInvoices() {
  const svc = await import("./services");
  const col = await svc.getCollection("invoices");
  return col.find().toArray();
}

export const supportTickets: any[] = [];

export async function getSupportTickets() {
  const svc = await import("./services");
  const col = await svc.getCollection("supportTickets");
  return col.find().toArray();
}

export const stats: any[] = [];

export async function getStats() {
  return [];
}

export interface Service {
  id?: number | string;
  _id?: string | any;
  name: string;

  description?: string;
}

export interface Invoice {
  id?: string;
  _id?: any;
  invoiceNo?: string;
  clientId?: string | any;
  clientName?: string;
  clientAddress?: string;
  clientCity?: string;
  clientState?: string;
  clientPin?: string;
  clientGst?: string;
  clientEmail?: string;
  clientPhone?: string;
  projectTitle?: string;
  title?: string;
  amount?: number;
  hsnCode?: string;
  applyGst?: boolean;
  gstPercent?: number;
  tax?: number;
  dueDate?: string | Date;
  status?: string;
  createdAt?: string | Date;

  assignedStaff?: string[] | string;
  workDate?: string;
  workTime?: string;
  venueName?: string;
  venueAddress?: string;
  equipmentAssigned?: string[] | string;

  description?: string;
}

export const services: Service[] = [];

export async function getServices() {
  const svc = await import("./services");
  return svc.getServices();
}

export async function addService(service: Omit<Service, "id" | "_id">) {
  const svc = await import("./services");
  return svc.createService(service);
}

export interface TeamMember {
  id?: number;
  _id?: string | any;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  role?:
    | "Founder"
    | "Co-Founder"
    | "Web Developer"
    | "Editor"
    | "Designer"
    | "Project Manager"
    | "Lead Generator";
  pan?: string;
  aadhar?: string;
  secondaryPhone?: string;
  secondaryEmail?: string;
  salary?: number;
  avatarUrl?: string;
}

export const teamMembers: TeamMember[] = [];

export async function getTeamMembers() {
  const svc = await import("./services");
  return svc.getTeamMembers();
}

export async function addTeamMember(member: Omit<TeamMember, "id" | "_id">) {
  const svc = await import("./services");
  return svc.createTeamMember(member);
}
