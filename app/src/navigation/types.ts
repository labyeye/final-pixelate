export type RootStackParams = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParams = {
  Login: undefined;
};

export type BottomTabParams = {
  HomeTab: undefined;
  CRMTab: undefined;
  OperationsTab: undefined;
  FinanceTab: undefined;
  MoreTab: undefined;
};

export type HomeStackParams = {
  Dashboard: undefined;
  Analytics: undefined;
  Reports: undefined;
  UserActivity: undefined;
  Profile: undefined;
};

export type CRMStackParams = {
  CRMHome: undefined;
  Leads: undefined;
  LeadDetail: { id: string };
  Clients: undefined;
  ClientDetail: { id: string };
  Enquiries: undefined;
  Reviews: undefined;
};

export type OperationsStackParams = {
  OperationsHome: undefined;
  Projects: undefined;
  ProjectDetail: { id: string };
  Tasks: undefined;
  Journey: undefined;
  Inventory: undefined;
  Services: undefined;
  Timeline: undefined;
};

export type FinanceStackParams = {
  FinanceHome: undefined;
  Invoicing: undefined;
  InvoiceDetail: { id: string };
  Payments: undefined;
  Expenses: undefined;
  EMITracker: undefined;
  Quotations: undefined;
  QuotationDetail: { id: string };
  Onboarding: undefined;
  NDAApproval: undefined;
};

export type MoreStackParams = {
  MoreHome: undefined;
  WhatsAppInbox: undefined;
  BulkMessaging: undefined;
  Campaigns: undefined;
  WhatsAppTemplates: undefined;
  WhatsAppWebhook: undefined;
  SocialMediaPlanner: undefined;
  SocialMediaCalendar: undefined;
  SocialMediaManager: undefined;
  Blogs: undefined;
  BlogDetail: { id: string };
  Newsletter: undefined;
  Announcements: undefined;
  Support: undefined;
  SupportDetail: { id: string };
  Settings: undefined;
  Profile: undefined;
  Careers: undefined;
  CareerDetail: { id: string };
  AboutTeam: undefined;
  Developers: undefined;
  WorkGallery: undefined;
  Photos: undefined;
  Reels: undefined;
  Trash: undefined;
  ERPConsole: undefined;
  Users: undefined;
  ClientPortal: undefined;
};
