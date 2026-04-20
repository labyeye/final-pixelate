import {
  LayoutDashboard,
  BarChart as BarChartIcon,
  Activity,
  Users,
  Megaphone,
  KanbanSquare,
  LifeBuoy,
  UserPlus,
  Lock,
  Star,
  FileText,
  Receipt,
  SquareCheck,
  Briefcase,
  BoxIcon,
  DollarSign as DollarIcon,
  Code,
  Image as ImageIcon,
  PlayCircle,
  CalendarDays,
  Settings,
  Mail,
  CreditCard,
  Wallet,
  BookOpen,
  Headphones,
  Trash2,
  Zap,
  Rocket,
  MessageCircle,
} from "lucide-react";

export const defaultStaffAllowed = [
  "/dashboard",
  "/leads",
  "/blogs",
  "/work-gallery",
  "/social-media-planner",
  "/dashboard/bulk-messaging",
  "/dashboard/campaigns",
  "/dashboard/whatsapp-inbox",
  "/enquiries",
  "/reviews",
  "/quotations",
  "/quotations/create",
];

// ─────────────────────────────────────────────────────────────────────────────
// Staff navigation — organised by department for future RBAC support
// ─────────────────────────────────────────────────────────────────────────────
export const navGroups = [
  // ── 1. MANAGEMENT ──────────────────────────────────────────────────────────
  {
    title: "Management",
    items: [
      {
        href: "/dashboard",
        label: "Dashboard",
        adminOnly: false,
        icon: LayoutDashboard,
      },
      {
        href: "/analytics",
        label: "Analytics",
        adminOnly: false,
        icon: BarChartIcon,
      },
      {
        href: "/dashboard/reports",
        label: "Reports",
        adminOnly: true,
        icon: FileText,
      },
      {
        href: "/dashboard/settings",
        label: "Settings",
        adminOnly: true,
        icon: Settings,
      },
      {
        href: "/user-activity",
        label: "User Activity",
        adminOnly: true,
        icon: Activity,
      },
      {
        href: "/erp-console",
        label: "ERP Console",
        adminOnly: true,
        icon: Zap,
      },
    ],
  },

  // ── 2. MARKETING ───────────────────────────────────────────────────────────
  {
    title: "Marketing",
    items: [
      {
        href: "/leads",
        label: "Leads",
        adminOnly: false,
        icon: KanbanSquare,
      },
      {
        href: "/enquiries",
        label: "Enquiries",
        adminOnly: false,
        icon: LifeBuoy,
      },
      {
        href: "/reviews",
        label: "Reviews",
        adminOnly: false,
        icon: Star,
      },
      {
        href: "/newsletter",
        label: "Newsletter",
        adminOnly: true,
        icon: Mail,
      },
      {
        href: "/announcement-bar",
        label: "Announcements",
        adminOnly: true,
        icon: Megaphone,
      },
      {
        href: "/blogs",
        label: "Blogs",
        adminOnly: true,
        icon: FileText,
      },
      {
        href: "/work-gallery",
        label: "Work Gallery",
        adminOnly: true,
        icon: ImageIcon,
      },
      {
        href: "/photo-galleries",
        label: "Photos",
        adminOnly: true,
        icon: ImageIcon,
      },
      {
        href: "/reels",
        label: "Reels",
        adminOnly: true,
        icon: PlayCircle,
      },
      {
        href: "/social-media-planner",
        label: "Social Media Planner",
        adminOnly: false,
        icon: CalendarDays,
      },
    ],
  },
  {
    title: "WhatsApp Marketing",
    items: [
      {
        href: "/dashboard/bulk-messaging",
        label: "Bulk Messaging",
        adminOnly: false,
        icon: MessageCircle,
      },
      {
        href: "/dashboard/whatsapp-inbox",
        label: "WhatsApp Inbox",
        adminOnly: false,
        icon: Mail,
      },
      {
        href: "/dashboard/campaigns",
        label: "Campaign Insights",
        adminOnly: false,
        icon: BarChartIcon,
      },
    ],
  },

  // ── 3. SALES ───────────────────────────────────────────────────────────────
  {
    title: "Sales",
    items: [
      {
        href: "/clients",
        label: "Clients",
        adminOnly: false,
        icon: Users,
      },
      {
        href: "/quotations",
        label: "Quotations",
        adminOnly: false,
        icon: FileText,
      },
      {
        href: "/onboarding",
        label: "Onboarding",
        adminOnly: false,
        icon: UserPlus,
      },
      {
        href: "/nda-approval",
        label: "NDA Approval",
        adminOnly: false,
        icon: Lock,
      },
    ],
  },

  // ── 4. OPERATIONS ──────────────────────────────────────────────────────────
  {
    title: "Operations",
    items: [
      {
        href: "/projects",
        label: "Projects",
        adminOnly: false,
        icon: Briefcase,
      },
      {
        href: "/tasks",
        label: "Tasks",
        adminOnly: false,
        icon: SquareCheck,
      },
      {
        href: "/journey",
        label: "Journey",
        adminOnly: false,
        icon: BookOpen,
      },
      {
        href: "/services",
        label: "Services",
        adminOnly: true,
        icon: Code,
      },
      {
        href: "/inventory",
        label: "Inventory",
        adminOnly: false,
        icon: BoxIcon,
      },
    ],
  },

  // ── 5. FINANCE ─────────────────────────────────────────────────────────────
  {
    title: "Finance",
    items: [
      {
        href: "/invoicing",
        label: "Invoicing",
        adminOnly: true,
        icon: Receipt,
      },
      {
        href: "/trash",
        label: "Trash",
        adminOnly: true,
        icon: Trash2,
      },
      {
        href: "/dashboard/payments",
        label: "Payments",
        adminOnly: true,
        icon: DollarIcon,
      },
      {
        href: "/expenses",
        label: "Expenses",
        adminOnly: true,
        icon: Wallet,
      },
      {
        href: "/emi",
        label: "EMI Tracker",
        adminOnly: true,
        icon: CreditCard,
      },
    ],
  },

  // ── 6. HR & SUPPORT ────────────────────────────────────────────────────────
  {
    title: "HR & Support",
    items: [
      {
        href: "/about-us-team",
        label: "About Us Team",
        adminOnly: true,
        icon: Users,
      },
      {
        href: "/careers",
        label: "Careers",
        adminOnly: true,
        icon: UserPlus,
      },
      {
        href: "/developers-and-editors",
        label: "Developers",
        adminOnly: true,
        icon: Code,
      },
      {
        href: "/support",
        label: "Support",
        adminOnly: false,
        icon: Headphones,
      },
    ],
  },
];

/**
 * All possible navigation items that can be shown to a client in their portal.
 * These mirror the department-based navGroups — admin can toggle any of these
 * on/off globally from Settings → Client Portal.
 */
export const clientPortalGroups = [
  {
    title: "Management",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/analytics", label: "Analytics", icon: BarChartIcon },
    ],
  },
  {
    title: "Marketing",
    items: [
      { href: "/leads", label: "Leads", icon: KanbanSquare },
      { href: "/enquiries", label: "Enquiries", icon: LifeBuoy },
      { href: "/reviews", label: "Reviews", icon: Star },
      { href: "/work-gallery", label: "Work Gallery", icon: ImageIcon },
      { href: "/photo-galleries", label: "Photos", icon: ImageIcon },
      { href: "/reels", label: "Reels", icon: PlayCircle },
      { href: "/blogs", label: "Blogs", icon: FileText },
    ],
  },
  {
    title: "Sales",
    items: [
      { href: "/clients", label: "Clients", icon: Users },
      { href: "/quotations", label: "Quotations", icon: FileText },
      { href: "/onboarding", label: "Onboarding", icon: UserPlus },
      { href: "/nda-approval", label: "NDA Approval", icon: Lock },
    ],
  },
  {
    title: "Operations",
    items: [
      { href: "/projects", label: "Projects", icon: Briefcase },
      { href: "/tasks", label: "Tasks", icon: SquareCheck },
      { href: "/journey", label: "Journey", icon: BookOpen },
      { href: "/services", label: "Services", icon: Code },
      { href: "/inventory", label: "Inventory", icon: BoxIcon },
    ],
  },
  {
    title: "Finance",
    items: [
      { href: "/invoicing", label: "Invoicing", icon: Receipt },
      { href: "/dashboard/payments", label: "Payments", icon: DollarIcon },
      { href: "/expenses", label: "Expenses", icon: Wallet },
    ],
  },
  {
    title: "HR & Support",
    items: [
      { href: "/about-us-team", label: "About Us Team", icon: Users },
      { href: "/careers", label: "Careers", icon: UserPlus },
      { href: "/developers-and-editors", label: "Developers", icon: Code },
      { href: "/support", label: "Support", icon: Headphones },
    ],
  },
];

/**
 * Flat list of all client-facing nav items (derived from clientPortalGroups).
 * Used by the sidebar to render client navigation.
 */
export const clientNavItems = clientPortalGroups.flatMap((g) => g.items);

/**
 * Default pages shown to a client when no allowedPages are configured.
 */
export const defaultClientAllowed = ["/invoicing", "/projects", "/support"];

/**
 * Client-specific navigation items (new /client routes)
 * These pages are read-only for clients and filter data by their clientId
 */
export const clientSpecificNavItems = [
  { href: "/client/planner", label: "Planner", icon: CalendarDays },
  { href: "/client/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/client/analytics", label: "Analytics", icon: BarChartIcon },
  { href: "/client/development", label: "Development", icon: Rocket },
  { href: "/client/support", label: "Support", icon: Headphones },
  { href: "/client/leads", label: "Leads", icon: Zap },
];
