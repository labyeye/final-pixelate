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
      {
        href: "/dashboard/payments",
        label: "Payments",
        adminOnly: true, // Assuming only admits/accounts record payments? Or maybe some staff? Let's say admin only for now or check. User is "admin" in context usually.
        icon: DollarIcon,
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
      {
        href: "/expenses",
        label: "Expenses",
        adminOnly: false,
        icon: DollarIcon,
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
