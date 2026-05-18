import type {
  AppRoutes,
  LayoutRoutes,
  ParamMap,
  AppRouteHandlerRoutes,
} from "./routes.js";
import type { ResolvingMetadata, ResolvingViewport } from "next/types.js";
import type { NextRequest } from "next/server.js";

type AppPageConfig<Route extends AppRoutes = AppRoutes> = {
  default:
    | React.ComponentType<{ params: Promise<ParamMap[Route]> } & any>
    | ((
        props: { params: Promise<ParamMap[Route]> } & any,
      ) =>
        | React.ReactNode
        | Promise<React.ReactNode>
        | never
        | void
        | Promise<void>);
  generateStaticParams?: (props: {
    params: ParamMap[Route];
  }) => Promise<any[]> | any[];
  generateMetadata?: (
    props: { params: Promise<ParamMap[Route]> } & any,
    parent: ResolvingMetadata,
  ) => Promise<any> | any;
  generateViewport?: (
    props: { params: Promise<ParamMap[Route]> } & any,
    parent: ResolvingViewport,
  ) => Promise<any> | any;
  metadata?: any;
  viewport?: any;
};

type LayoutConfig<Route extends LayoutRoutes = LayoutRoutes> = {
  default:
    | React.ComponentType<LayoutProps<Route>>
    | ((
        props: LayoutProps<Route>,
      ) =>
        | React.ReactNode
        | Promise<React.ReactNode>
        | never
        | void
        | Promise<void>);
  generateStaticParams?: (props: {
    params: ParamMap[Route];
  }) => Promise<any[]> | any[];
  generateMetadata?: (
    props: { params: Promise<ParamMap[Route]> } & any,
    parent: ResolvingMetadata,
  ) => Promise<any> | any;
  generateViewport?: (
    props: { params: Promise<ParamMap[Route]> } & any,
    parent: ResolvingViewport,
  ) => Promise<any> | any;
  metadata?: any;
  viewport?: any;
};

type RouteHandlerConfig<
  Route extends AppRouteHandlerRoutes = AppRouteHandlerRoutes,
> = {
  GET?: (
    request: NextRequest,
    context: { params: Promise<ParamMap[Route]> },
  ) => Promise<Response | void> | Response | void;
  POST?: (
    request: NextRequest,
    context: { params: Promise<ParamMap[Route]> },
  ) => Promise<Response | void> | Response | void;
  PUT?: (
    request: NextRequest,
    context: { params: Promise<ParamMap[Route]> },
  ) => Promise<Response | void> | Response | void;
  PATCH?: (
    request: NextRequest,
    context: { params: Promise<ParamMap[Route]> },
  ) => Promise<Response | void> | Response | void;
  DELETE?: (
    request: NextRequest,
    context: { params: Promise<ParamMap[Route]> },
  ) => Promise<Response | void> | Response | void;
  HEAD?: (
    request: NextRequest,
    context: { params: Promise<ParamMap[Route]> },
  ) => Promise<Response | void> | Response | void;
  OPTIONS?: (
    request: NextRequest,
    context: { params: Promise<ParamMap[Route]> },
  ) => Promise<Response | void> | Response | void;
};

{
  type __IsExpected<Specific extends AppPageConfig<"/about-us-team">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/about-us-team/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/analytics">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/analytics/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/announcement-bar">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/announcement-bar/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/blogs">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/blogs/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends AppPageConfig<"/careers/[id]/applications">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/careers/[id]/applications/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/careers/add">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/careers/add/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/careers/edit/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/careers/edit/[id]/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/careers">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/careers/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/client-portal">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/client-portal/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/client/analytics">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/client/analytics/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/client/calendar">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/client/calendar/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/client/development">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/client/development/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/client/leads">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/client/leads/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/client/planner">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/client/planner/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/client/support">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/client/support/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/clients/[id]">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/clients/[id]/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/clients">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/clients/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends AppPageConfig<"/dashboard/bulk-messaging">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/dashboard/bulk-messaging/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/dashboard/campaigns">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/dashboard/campaigns/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/dashboard">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/dashboard/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/dashboard/payments">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/dashboard/payments/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/dashboard/profile">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/dashboard/profile/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/dashboard/reports">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/dashboard/reports/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/dashboard/settings">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/dashboard/settings/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends AppPageConfig<"/dashboard/whatsapp-inbox">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/dashboard/whatsapp-inbox/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends AppPageConfig<"/dashboard/whatsapp-templates">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/dashboard/whatsapp-templates/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends AppPageConfig<"/dashboard/whatsapp-webhook">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/dashboard/whatsapp-webhook/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/developers-and-editors">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/developers-and-editors/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/emi">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/emi/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/enquiries">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/enquiries/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/erp-console">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/erp-console/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/expenses">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/expenses/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/inventory">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/inventory/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/invoicing">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/invoicing/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/journey">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/journey/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/leads/[id]">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/leads/[id]/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/leads">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/leads/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/nda-approval">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/nda-approval/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/newsletter">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/newsletter/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/onboarding">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/onboarding/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/photo-galleries">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/photo-galleries/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/profile">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/profile/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/projects">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/projects/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/quotations/[id]/view">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/quotations/[id]/view/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/quotations/create">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/quotations/create/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/quotations">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/quotations/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/reels">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/reels/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/reviews">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/reviews/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/services">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/services/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/social-media-calendar">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/social-media-calendar/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends AppPageConfig<"/social-media-planner/analytics">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/social-media-planner/analytics/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends AppPageConfig<"/social-media-planner/calendar">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/social-media-planner/calendar/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/social-media-planner">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/social-media-planner/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends AppPageConfig<"/social-media-planner/planner">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/social-media-planner/planner/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/support">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/support/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/tasks">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/tasks/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/timeline">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/timeline/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/trash">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/trash/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/user-activity">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/user-activity/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/users">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/users/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/work-gallery">> = Specific;
  const handler =
    {} as typeof import("../../../src/app/(crm)/work-gallery/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/login">> = Specific;
  const handler = {} as typeof import("../../../src/app/login/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends AppPageConfig<"/">> = Specific;
  const handler = {} as typeof import("../../../src/app/page.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/about-team">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/about-team/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/announcement">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/announcement/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/applications/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/applications/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/applications">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/applications/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/auth/login">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/auth/login/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/auth/meta/callback">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/auth/meta/callback/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/auth/meta/connect">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/auth/meta/connect/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/blogs/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/blogs/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/blogs">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/blogs/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/campaigns/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/campaigns/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/campaigns">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/campaigns/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/careers/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/careers/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/careers">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/careers/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/client-leads/sync">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/client-leads/sync/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/clients/[id]/meta-token">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/clients/[id]/meta-token/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/clients/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/clients/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/clients">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/clients/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/cron/process-scheduled-posts">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/cron/process-scheduled-posts/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/emi/[id]">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/emi/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/emi">> = Specific;
  const handler = {} as typeof import("../../../src/app/api/emi/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/enquiries">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/enquiries/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/erp-events">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/erp-events/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/expenses/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/expenses/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/expenses">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/expenses/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/fb-ads-connection/forms">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/fb-ads-connection/forms/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/fb-ads-connection">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/fb-ads-connection/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/fb-ads-connection/sync">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/fb-ads-connection/sync/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/generate-payment-receipt">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/generate-payment-receipt/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/inventory/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/inventory/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/inventory">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/inventory/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/invoices/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/invoices/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/invoices/renumber">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/invoices/renumber/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/invoices">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/invoices/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/journey/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/journey/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/journey/backfill">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/journey/backfill/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/journey">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/journey/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/leads/[id]/activity">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/leads/[id]/activity/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/leads/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/leads/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/leads">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/leads/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/me">> = Specific;
  const handler = {} as typeof import("../../../src/app/api/me/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/meta-leads">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/meta-leads/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/nda-approvals">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/nda-approvals/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/newsletter">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/newsletter/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/onboarding/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/onboarding/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/onboarding">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/onboarding/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/payments/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/payments/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/payments">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/payments/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/photo-galleries/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/photo-galleries/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/photo-galleries">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/photo-galleries/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/photos/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/photos/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/photos">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/photos/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/pixy-lead">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/pixy-lead/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/projects/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/projects/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/projects">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/projects/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/public/about-team">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/public/about-team/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/quotations/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/quotations/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/quotations">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/quotations/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/reels/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/reels/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/reels">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/reels/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/reports">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/reports/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/reviews/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/reviews/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/reviews">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/reviews/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/send-email">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/send-email/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/send-invoice-email">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/send-invoice-email/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/send-invoice-whatsapp">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/send-invoice-whatsapp/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/send-payment-receipt-whatsapp">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/send-payment-receipt-whatsapp/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/services/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/services/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/services">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/services/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/settings/client-sidebar">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/settings/client-sidebar/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/settings">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/settings/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/settings/sidebar">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/settings/sidebar/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/social-media-accounts">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/social-media-accounts/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/social-media-metrics/sync">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/social-media-metrics/sync/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/social-media-posts/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/social-media-posts/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/social-media-posts">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/social-media-posts/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/support-tickets/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/support-tickets/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/support-tickets">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/support-tickets/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/tasks/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/tasks/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/tasks">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/tasks/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/team-members/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/team-members/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/team-members">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/team-members/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/trash/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/trash/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/trash">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/trash/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/upload-whatsapp-media">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/upload-whatsapp-media/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/upload">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/upload/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/user-activity">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/user-activity/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/users/[id]/change-password">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/users/[id]/change-password/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/users/[id]">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/users/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/users">> =
    Specific;
  const handler = {} as typeof import("../../../src/app/api/users/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp-optin">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp-optin/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp-templates/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp-templates/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp-templates/[id]/submit">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp-templates/[id]/submit/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp-templates">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp-templates/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp-templates/sync">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp-templates/sync/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp-templates/upload-media">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp-templates/upload-media/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp-webhook">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp-webhook/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp/bulk-send">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp/bulk-send/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp/delivery-log">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp/delivery-log/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp/messages">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp/messages/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/whatsapp/webhook-sync">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/whatsapp/webhook-sync/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<
    Specific extends RouteHandlerConfig<"/api/work-gallery/[id]">,
  > = Specific;
  const handler =
    {} as typeof import("../../../src/app/api/work-gallery/[id]/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends RouteHandlerConfig<"/api/work-gallery">> =
    Specific;
  const handler =
    {} as typeof import("../../../src/app/api/work-gallery/route.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends LayoutConfig<"/">> = Specific;
  const handler = {} as typeof import("../../../src/app/(crm)/layout.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}

{
  type __IsExpected<Specific extends LayoutConfig<"/">> = Specific;
  const handler = {} as typeof import("../../../src/app/layout.js");
  type __Check = __IsExpected<typeof handler>;

  type __Unused = __Check;
}
