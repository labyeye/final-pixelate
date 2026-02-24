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
  Settings,
  Mail,
  CreditCard,
  Landmark,
  Wallet,
} from "lucide-react";

export const defaultStaffAllowed = [
  "/dashboard",
  "/leads",
  "/blogs",
  "/work-gallery",
  "/enquiries",
  "/reviews",
  "/quotations",
  "/quotations/create",
];

export const navGroups = [
  {
    title: "Overview",
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
        href: "/user-activity",
        label: "User Activity",
        adminOnly: true,
        icon: Activity,
      },
      { href: "/profile", label: "Profile", adminOnly: false, icon: Users },
      {
        href: "/announcement-bar",
        label: "Announcements",
        adminOnly: true,
        icon: Megaphone,
      },
      {
        href: "/newsletter",
        label: "Newsletter",
        adminOnly: true,
        icon: Mail,
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
    ],
  },
  {
    title: "Sales & CRM",
    items: [
      { href: "/leads", label: "Leads", adminOnly: false, icon: KanbanSquare },
      {
        href: "/enquiries",
        label: "Enquiries",
        adminOnly: false,
        icon: LifeBuoy,
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
      { href: "/clients", label: "Clients", adminOnly: false, icon: Users },
      { href: "/reviews", label: "Reviews", adminOnly: false, icon: Star },
      {
        href: "/quotations",
        label: "Quotations",
        adminOnly: false,
        icon: FileText,
      },
      {
        href: "/invoicing",
        label: "Invoicing",
        adminOnly: true,
        icon: Receipt,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        href: "/expenses",
        label: "Expenses",
        adminOnly: true,
        icon: Wallet,
      },
      {
        href: "/dashboard/payments",
        label: "Payments",
        adminOnly: true,
        icon: DollarIcon,
      },
      {
        href: "/emi",
        label: "EMI Tracker",
        adminOnly: true,
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      { href: "/tasks", label: "Tasks", adminOnly: false, icon: SquareCheck },
      {
        href: "/projects",
        label: "Projects",
        adminOnly: false,
        icon: Briefcase,
      },
      {
        href: "/inventory",
        label: "Inventory",
        adminOnly: false,
        icon: BoxIcon,
      },
      { href: "/services", label: "Services", adminOnly: true, icon: Code },
    ],
  },
  {
    title: "Content",
    items: [
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
      { href: "/reels", label: "Reels", adminOnly: true, icon: PlayCircle },
      { href: "/blogs", label: "Blogs", adminOnly: true, icon: FileText },
    ],
  },
  {
    title: "Team & Support",
    items: [
      {
        href: "/about-us-team",
        label: "About Us Team",
        adminOnly: true,
        icon: Users,
      },
      { href: "/careers", label: "Careers", adminOnly: true, icon: UserPlus },
      {
        href: "/developers-and-editors",
        label: "Developers",
        adminOnly: true,
        icon: Users,
      },
      { href: "/support", label: "Support", adminOnly: false, icon: LifeBuoy },
    ],
  },
];

/**
 * All possible navigation items that can be shown to a client in their portal.
 * These mirror the full admin navGroups — admin can toggle any of these on/off
 * globally from Settings → Client Portal.
 */
export const clientPortalGroups = [
  {
    title: "Overview",
    items: [
      { href: "/dashboard",         label: "Dashboard",    icon: LayoutDashboard },
      { href: "/analytics",         label: "Analytics",    icon: BarChartIcon },
      { href: "/profile",           label: "Profile",      icon: Users },
    ],
  },
  {
    title: "Sales & CRM",
    items: [
      { href: "/leads",             label: "Leads",        icon: KanbanSquare },
      { href: "/enquiries",         label: "Enquiries",    icon: LifeBuoy },
      { href: "/onboarding",        label: "Onboarding",   icon: UserPlus },
      { href: "/nda-approval",      label: "NDA Approval", icon: Lock },
      { href: "/clients",           label: "Clients",      icon: Users },
      { href: "/reviews",           label: "Reviews",      icon: Star },
      { href: "/quotations",        label: "Quotations",   icon: FileText },
      { href: "/invoicing",         label: "Invoicing",    icon: Receipt },
      { href: "/dashboard/payments",label: "Payments",     icon: DollarIcon },
    ],
  },
  {
    title: "Operations",
    items: [
      { href: "/tasks",             label: "Tasks",        icon: SquareCheck },
      { href: "/projects",          label: "Projects",     icon: Briefcase },
      { href: "/inventory",         label: "Inventory",    icon: BoxIcon },
      { href: "/expenses",          label: "Expenses",     icon: DollarIcon },
      { href: "/services",          label: "Services",     icon: Code },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/work-gallery",      label: "Work Gallery", icon: ImageIcon },
      { href: "/photo-galleries",   label: "Photos",       icon: ImageIcon },
      { href: "/reels",             label: "Reels",        icon: PlayCircle },
      { href: "/blogs",             label: "Blogs",        icon: FileText },
    ],
  },
  {
    title: "Team & Support",
    items: [
      { href: "/about-us-team",     label: "About Us Team",icon: Users },
      { href: "/careers",           label: "Careers",      icon: UserPlus },
      { href: "/developers-and-editors", label: "Developers", icon: Users },
      { href: "/support",           label: "Support",      icon: LifeBuoy },
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
export const defaultClientAllowed = [
  "/invoicing",
  "/projects",
  "/support",
];
