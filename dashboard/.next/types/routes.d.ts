


type AppRoutes = "/" | "/about-us-team" | "/analytics" | "/announcement-bar" | "/blogs" | "/careers" | "/careers/[id]/applications" | "/careers/add" | "/careers/edit/[id]" | "/client-portal" | "/client/analytics" | "/client/calendar" | "/client/development" | "/client/leads" | "/client/planner" | "/client/support" | "/clients" | "/clients/[id]" | "/dashboard" | "/dashboard/bulk-messaging" | "/dashboard/campaigns" | "/dashboard/payments" | "/dashboard/profile" | "/dashboard/reports" | "/dashboard/settings" | "/dashboard/whatsapp-inbox" | "/developers-and-editors" | "/emi" | "/enquiries" | "/erp-console" | "/expenses" | "/inventory" | "/invoicing" | "/journey" | "/leads" | "/leads/[id]" | "/login" | "/nda-approval" | "/newsletter" | "/onboarding" | "/photo-galleries" | "/profile" | "/projects" | "/quotations" | "/quotations/[id]/view" | "/quotations/create" | "/reels" | "/reviews" | "/services" | "/social-media-planner" | "/social-media-planner/analytics" | "/social-media-planner/calendar" | "/social-media-planner/planner" | "/support" | "/tasks" | "/timeline" | "/trash" | "/user-activity" | "/users" | "/work-gallery"
type AppRouteHandlerRoutes = "/api/about-team" | "/api/announcement" | "/api/applications" | "/api/applications/[id]" | "/api/auth/login" | "/api/auth/meta/callback" | "/api/auth/meta/connect" | "/api/blogs" | "/api/blogs/[id]" | "/api/campaigns" | "/api/campaigns/[id]" | "/api/careers" | "/api/careers/[id]" | "/api/clients" | "/api/clients/[id]" | "/api/emi" | "/api/emi/[id]" | "/api/enquiries" | "/api/erp-events" | "/api/expenses" | "/api/expenses/[id]" | "/api/fb-ads-connection" | "/api/fb-ads-connection/forms" | "/api/fb-ads-connection/sync" | "/api/inventory" | "/api/inventory/[id]" | "/api/invoices" | "/api/invoices/[id]" | "/api/invoices/renumber" | "/api/journey" | "/api/journey/[id]" | "/api/journey/backfill" | "/api/leads" | "/api/leads/[id]" | "/api/leads/[id]/activity" | "/api/me" | "/api/nda-approvals" | "/api/newsletter" | "/api/onboarding" | "/api/onboarding/[id]" | "/api/payments" | "/api/payments/[id]" | "/api/photo-galleries" | "/api/photo-galleries/[id]" | "/api/photos" | "/api/photos/[id]" | "/api/pixy-lead" | "/api/projects" | "/api/projects/[id]" | "/api/public/about-team" | "/api/quotations" | "/api/quotations/[id]" | "/api/reels" | "/api/reels/[id]" | "/api/reports" | "/api/reviews" | "/api/reviews/[id]" | "/api/send-email" | "/api/send-invoice-email" | "/api/send-invoice-whatsapp" | "/api/services" | "/api/services/[id]" | "/api/settings" | "/api/settings/client-sidebar" | "/api/settings/sidebar" | "/api/social-media-accounts" | "/api/social-media-metrics/sync" | "/api/social-media-posts" | "/api/social-media-posts/[id]" | "/api/support-tickets" | "/api/support-tickets/[id]" | "/api/tasks" | "/api/tasks/[id]" | "/api/team-members" | "/api/team-members/[id]" | "/api/trash" | "/api/trash/[id]" | "/api/upload" | "/api/upload-whatsapp-media" | "/api/user-activity" | "/api/users" | "/api/users/[id]" | "/api/users/[id]/change-password" | "/api/whatsapp-optin" | "/api/whatsapp-webhook" | "/api/whatsapp/bulk-send" | "/api/whatsapp/messages" | "/api/whatsapp/webhook-sync" | "/api/work-gallery" | "/api/work-gallery/[id]"
type PageRoutes = never
type LayoutRoutes = "/"
type RedirectRoutes = never
type RewriteRoutes = never
type Routes = AppRoutes | PageRoutes | LayoutRoutes | RedirectRoutes | RewriteRoutes | AppRouteHandlerRoutes


interface ParamMap {
  "/": {}
  "/about-us-team": {}
  "/analytics": {}
  "/announcement-bar": {}
  "/api/about-team": {}
  "/api/announcement": {}
  "/api/applications": {}
  "/api/applications/[id]": { "id": string; }
  "/api/auth/login": {}
  "/api/auth/meta/callback": {}
  "/api/auth/meta/connect": {}
  "/api/blogs": {}
  "/api/blogs/[id]": { "id": string; }
  "/api/campaigns": {}
  "/api/campaigns/[id]": { "id": string; }
  "/api/careers": {}
  "/api/careers/[id]": { "id": string; }
  "/api/clients": {}
  "/api/clients/[id]": { "id": string; }
  "/api/emi": {}
  "/api/emi/[id]": { "id": string; }
  "/api/enquiries": {}
  "/api/erp-events": {}
  "/api/expenses": {}
  "/api/expenses/[id]": { "id": string; }
  "/api/fb-ads-connection": {}
  "/api/fb-ads-connection/forms": {}
  "/api/fb-ads-connection/sync": {}
  "/api/inventory": {}
  "/api/inventory/[id]": { "id": string; }
  "/api/invoices": {}
  "/api/invoices/[id]": { "id": string; }
  "/api/invoices/renumber": {}
  "/api/journey": {}
  "/api/journey/[id]": { "id": string; }
  "/api/journey/backfill": {}
  "/api/leads": {}
  "/api/leads/[id]": { "id": string; }
  "/api/leads/[id]/activity": { "id": string; }
  "/api/me": {}
  "/api/nda-approvals": {}
  "/api/newsletter": {}
  "/api/onboarding": {}
  "/api/onboarding/[id]": { "id": string; }
  "/api/payments": {}
  "/api/payments/[id]": { "id": string; }
  "/api/photo-galleries": {}
  "/api/photo-galleries/[id]": { "id": string; }
  "/api/photos": {}
  "/api/photos/[id]": { "id": string; }
  "/api/pixy-lead": {}
  "/api/projects": {}
  "/api/projects/[id]": { "id": string; }
  "/api/public/about-team": {}
  "/api/quotations": {}
  "/api/quotations/[id]": { "id": string; }
  "/api/reels": {}
  "/api/reels/[id]": { "id": string; }
  "/api/reports": {}
  "/api/reviews": {}
  "/api/reviews/[id]": { "id": string; }
  "/api/send-email": {}
  "/api/send-invoice-email": {}
  "/api/send-invoice-whatsapp": {}
  "/api/services": {}
  "/api/services/[id]": { "id": string; }
  "/api/settings": {}
  "/api/settings/client-sidebar": {}
  "/api/settings/sidebar": {}
  "/api/social-media-accounts": {}
  "/api/social-media-metrics/sync": {}
  "/api/social-media-posts": {}
  "/api/social-media-posts/[id]": { "id": string; }
  "/api/support-tickets": {}
  "/api/support-tickets/[id]": { "id": string; }
  "/api/tasks": {}
  "/api/tasks/[id]": { "id": string; }
  "/api/team-members": {}
  "/api/team-members/[id]": { "id": string; }
  "/api/trash": {}
  "/api/trash/[id]": { "id": string; }
  "/api/upload": {}
  "/api/upload-whatsapp-media": {}
  "/api/user-activity": {}
  "/api/users": {}
  "/api/users/[id]": { "id": string; }
  "/api/users/[id]/change-password": { "id": string; }
  "/api/whatsapp-optin": {}
  "/api/whatsapp-webhook": {}
  "/api/whatsapp/bulk-send": {}
  "/api/whatsapp/messages": {}
  "/api/whatsapp/webhook-sync": {}
  "/api/work-gallery": {}
  "/api/work-gallery/[id]": { "id": string; }
  "/blogs": {}
  "/careers": {}
  "/careers/[id]/applications": { "id": string; }
  "/careers/add": {}
  "/careers/edit/[id]": { "id": string; }
  "/client-portal": {}
  "/client/analytics": {}
  "/client/calendar": {}
  "/client/development": {}
  "/client/leads": {}
  "/client/planner": {}
  "/client/support": {}
  "/clients": {}
  "/clients/[id]": { "id": string; }
  "/dashboard": {}
  "/dashboard/bulk-messaging": {}
  "/dashboard/campaigns": {}
  "/dashboard/payments": {}
  "/dashboard/profile": {}
  "/dashboard/reports": {}
  "/dashboard/settings": {}
  "/dashboard/whatsapp-inbox": {}
  "/developers-and-editors": {}
  "/emi": {}
  "/enquiries": {}
  "/erp-console": {}
  "/expenses": {}
  "/inventory": {}
  "/invoicing": {}
  "/journey": {}
  "/leads": {}
  "/leads/[id]": { "id": string; }
  "/login": {}
  "/nda-approval": {}
  "/newsletter": {}
  "/onboarding": {}
  "/photo-galleries": {}
  "/profile": {}
  "/projects": {}
  "/quotations": {}
  "/quotations/[id]/view": { "id": string; }
  "/quotations/create": {}
  "/reels": {}
  "/reviews": {}
  "/services": {}
  "/social-media-planner": {}
  "/social-media-planner/analytics": {}
  "/social-media-planner/calendar": {}
  "/social-media-planner/planner": {}
  "/support": {}
  "/tasks": {}
  "/timeline": {}
  "/trash": {}
  "/user-activity": {}
  "/users": {}
  "/work-gallery": {}
}


export type ParamsOf<Route extends Routes> = ParamMap[Route]

interface LayoutSlotMap {
  "/": never
}


export type { AppRoutes, PageRoutes, LayoutRoutes, RedirectRoutes, RewriteRoutes, ParamMap, AppRouteHandlerRoutes }

declare global {
  









  interface PageProps<AppRoute extends AppRoutes> {
    params: Promise<ParamMap[AppRoute]>
    searchParams: Promise<Record<string, string | string[] | undefined>>
  }

  








  type LayoutProps<LayoutRoute extends LayoutRoutes> = {
    params: Promise<ParamMap[LayoutRoute]>
    children: React.ReactNode
  } & {
    [K in LayoutSlotMap[LayoutRoute]]: React.ReactNode
  }

  









  interface RouteContext<AppRouteHandlerRoute extends AppRouteHandlerRoutes> {
    params: Promise<ParamMap[AppRouteHandlerRoute]>
  }
}
