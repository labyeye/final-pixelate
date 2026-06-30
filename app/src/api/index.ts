import api from './client';

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  me: () => api.get('/me'),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getReports: () => api.get('/reports'),
  getAnalytics: () => api.get('/analytics'),
  getUserActivity: () => api.get('/user-activity'),
};

export const leadsAPI = {
  getAll: () => api.get('/leads'),
  getById: (id: string) => api.get(`/leads/${id}`),
  create: (data: any) => api.post('/leads', data),
  update: (id: string, data: any) => api.patch(`/leads/${id}`, data),
  delete: (id: string) => api.delete(`/leads/${id}`),
};

export const enquiriesAPI = {
  getAll: () => api.get('/enquiries'),
};

export const clientsAPI = {
  getAll: () => api.get('/clients'),
  getById: (id: string) => api.get(`/clients/${id}`),
  create: (data: any) => api.post('/clients', data),
  update: (id: string, data: any) => api.patch(`/clients/${id}`, data),
  delete: (id: string) => api.delete(`/clients/${id}`),
};

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects', data),
  update: (id: string, data: any) => api.patch(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

export const tasksAPI = {
  getAll: () => api.get('/tasks'),
  getById: (id: string) => api.get(`/tasks/${id}`),
  create: (data: any) => api.post('/tasks', data),
  update: (id: string, data: any) => api.patch(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

export const invoicesAPI = {
  getAll: () => api.get('/invoices'),
  getById: (id: string) => api.get(`/invoices/${id}`),
  create: (data: any) => api.post('/invoices', data),
  update: (id: string, data: any) => api.patch(`/invoices/${id}`, data),
  delete: (id: string) => api.delete(`/invoices/${id}`),
  recordPayment: (id: string, data: any) =>
    api.patch(`/invoices/${id}`, { ...data, action: 'record_payment' }),
};

export const paymentsAPI = {
  getAll: () => api.get('/payments'),
  getById: (id: string) => api.get(`/payments/${id}`),
  create: (data: any) => api.post('/payments', data),
  update: (id: string, data: any) => api.patch(`/payments/${id}`, data),
};

export const expensesAPI = {
  getAll: () => api.get('/expenses'),
  create: (data: any) => api.post('/expenses', data),
  update: (id: string, data: any) => api.patch(`/expenses/${id}`, data),
  delete: (id: string) => api.delete(`/expenses/${id}`),
};

export const emiAPI = {
  getAll: () => api.get('/emi'),
  create: (data: any) => api.post('/emi', data),
  update: (id: string, data: any) => api.patch(`/emi/${id}`, data),
  delete: (id: string) => api.delete(`/emi/${id}`),
};

export const quotationsAPI = {
  getAll: () => api.get('/quotations'),
  getById: (id: string) => api.get(`/quotations/${id}`),
  create: (data: any) => api.post('/quotations', data),
  update: (id: string, data: any) => api.patch(`/quotations/${id}`, data),
  delete: (id: string) => api.delete(`/quotations/${id}`),
};

export const onboardingAPI = {
  getAll: () => api.get('/onboarding'),
  getById: (id: string) => api.get(`/onboarding/${id}`),
  create: (data: any) => api.post('/onboarding', data),
  update: (id: string, data: any) => api.put(`/onboarding/${id}`, data),
  delete: (id: string) => api.delete(`/onboarding/${id}`),
};

export const ndaAPI = {
  getAll: () => api.get('/nda-approvals'),
  create: (data: any) => api.post('/nda-approvals', data),
  delete: (id: string) => api.delete(`/nda-approvals/${id}`),
};

export const reviewsAPI = {
  getAll: () => api.get('/reviews'),
  create: (data: any) => api.post('/reviews', data),
  update: (id: string, data: any) => api.patch(`/reviews/${id}`, data),
  delete: (id: string) => api.delete(`/reviews/${id}`),
};

export const blogsAPI = {
  getAll: () => api.get('/blogs'),
  getById: (id: string) => api.get(`/blogs/${id}`),
  create: (data: any) => api.post('/blogs', data),
  update: (id: string, data: any) => api.patch(`/blogs/${id}`, data),
  delete: (id: string) => api.delete(`/blogs/${id}`),
};

export const supportAPI = {
  getAll: () => api.get('/support-tickets'),
  getById: (id: string) => api.get(`/support-tickets/${id}`),
  create: (data: any) => api.post('/support-tickets', data),
  update: (id: string, data: any) => api.patch(`/support-tickets/${id}`, data),
};

export const whatsappAPI = {
  getMessages: () => api.get('/whatsapp/messages'),
  getInbox: () => api.get('/whatsapp/messages'),
  bulkSend: (data: any) => api.post('/whatsapp/bulk-send', data),
  getDeliveryLog: (status?: string) =>
    api.get(`/whatsapp/delivery-log?status=${status || 'all'}&limit=200`),
};

export const whatsappTemplatesAPI = {
  getAll: () => api.get('/whatsapp-templates'),
  getById: (id: string) => api.get(`/whatsapp-templates/${id}`),
  create: (data: any) => api.post('/whatsapp-templates', data),
  update: (id: string, data: any) => api.patch(`/whatsapp-templates/${id}`, data),
  delete: (id: string) => api.delete(`/whatsapp-templates/${id}`),
  syncFromMeta: () => api.post('/whatsapp-templates/sync', {}),
  submitToMeta: (id: string, name: string) =>
    api.post(`/whatsapp-templates/${id}/submit`, { name }),
};

export const socialMediaTasksAPI = {
  getAll: () => api.get('/social-media-tasks'),
  getById: (id: string) => api.get(`/social-media-tasks/${id}`),
  create: (data: any) => api.post('/social-media-tasks', data),
  update: (id: string, data: any) => api.put(`/social-media-tasks/${id}`, data),
  delete: (id: string) => api.delete(`/social-media-tasks/${id}`),
};

export const campaignsAPI = {
  getAll: () => api.get('/campaigns'),
  getById: (id: string) => api.get(`/campaigns/${id}`),
};

export const socialMediaAPI = {
  getPosts: () => api.get('/social-media-posts'),
  getById: (id: string) => api.get(`/social-media-posts/${id}`),
  create: (data: any) => api.post('/social-media-posts', data),
  update: (id: string, data: any) =>
    api.patch(`/social-media-posts/${id}`, data),
  delete: (id: string) => api.delete(`/social-media-posts/${id}`),
  getAccounts: () => api.get('/social-media-accounts'),
};

export const inventoryAPI = {
  getAll: () => api.get('/inventory'),
  create: (data: any) => api.post('/inventory', data),
  update: (id: string, data: any) => api.patch(`/inventory/${id}`, data),
  delete: (id: string) => api.delete(`/inventory/${id}`),
};

export const journeyAPI = {
  getAll: () => api.get('/journey'),
  create: (data: any) => api.post('/journey', data),
  update: (id: string, data: any) => api.patch(`/journey/${id}`, data),
};

export const careersAPI = {
  getAll: () => api.get('/careers'),
  getById: (id: string) => api.get(`/careers/${id}`),
  create: (data: any) => api.post('/careers', data),
  update: (id: string, data: any) => api.patch(`/careers/${id}`, data),
  delete: (id: string) => api.delete(`/careers/${id}`),
  getApplications: (id: string) => api.get(`/careers/${id}/applications`),
};

export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  update: (id: string, data: any) => api.patch(`/users/${id}`, data),
  changePassword: (id: string, data: any) =>
    api.patch(`/users/${id}/change-password`, data),
};

export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data: any) => api.patch('/settings', data),
};

export const newsletterAPI = {
  getAll: () => api.get('/newsletter'),
};

export const teamAPI = {
  getAll: () => api.get('/team-members'),
  create: (data: any) => api.post('/team-members', data),
  update: (id: string, data: any) => api.patch(`/team-members/${id}`, data),
  delete: (id: string) => api.delete(`/team-members/${id}`),
};

export const aboutTeamAPI = {
  getAll: () => api.get('/about-team'),
  create: (data: any) => api.post('/about-team', data),
  update: (id: string, data: any) => api.patch(`/about-team/${id}`, data),
  delete: (id: string) => api.delete(`/about-team/${id}`),
};

export const workGalleryAPI = {
  getAll: () => api.get('/work-gallery'),
  create: (data: any) => api.post('/work-gallery', data),
  update: (id: string, data: any) => api.patch(`/work-gallery/${id}`, data),
  delete: (id: string) => api.delete(`/work-gallery/${id}`),
};

export const photosAPI = {
  getAll: () => api.get('/photos'),
  create: (data: any) => api.post('/photos', data),
  delete: (id: string) => api.delete(`/photos/${id}`),
};

export const reelsAPI = {
  getAll: () => api.get('/reels'),
  create: (data: any) => api.post('/reels', data),
  update: (id: string, data: any) => api.patch(`/reels/${id}`, data),
  delete: (id: string) => api.delete(`/reels/${id}`),
};

export const trashAPI = {
  getAll: () => api.get('/trash'),
  restore: (id: string) => api.post(`/trash/${id}/restore`, {}),
  deletePermanently: (id: string) => api.delete(`/trash/${id}`),
};

export const erpAPI = {
  getEvents: () => api.get('/erp-events'),
};

export const leadsActivityAPI = {
  getByLeadId: (leadId: string) => api.get(`/leads/${leadId}/activity`),
  create: (leadId: string, data: any) =>
    api.post(`/leads/${leadId}/activity`, data),
};

export const brandGuideAPI = {
  getAll: () => api.get('/brand-guides'),
  create: (data: any) => api.post('/brand-guides', data),
  update: (id: string, data: any) => api.put(`/brand-guides/${id}`, data),
  delete: (id: string) => api.delete(`/brand-guides/${id}`),
  uploadPdf: (formData: any) =>
    api.post('/upload-brand-guide-pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  parsePdf: (pdfBase64: string) =>
    api.post('/parse-brand-guide-pdf', { pdfBase64 }),
  sendEmail: (data: any) => api.post('/send-brand-guide-email', data),
  sendWhatsApp: (data: any) => api.post('/send-brand-guide-whatsapp', data),
};

export const nestHRAPI = {
  getStats: () => api.get('/nesthr-stats'),
  getInvoices: (status?: string) =>
    api.get(
      status && status !== 'all'
        ? `/nesthr-invoices?status=${status}`
        : '/nesthr-invoices',
    ),
  getOffers: () => api.get('/hrms-offers'),
  createOffer: (data: any) => api.post('/hrms-offers', data),
  updateOffer: (id: string, data: any) => api.put(`/hrms-offers/${id}`, data),
  deleteOffer: (id: string) => api.delete(`/hrms-offers/${id}`),
};
