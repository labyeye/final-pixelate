"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuth } from "@/hooks/use-auth";

import {
  Code,
  Users,
  LayoutDashboard,
  KanbanSquare,
  FileText,
  Briefcase,
  Receipt,
  LifeBuoy,
  BarChart as BarChartIcon,
  DollarSign as DollarIcon,
  Image as ImageIcon,
  PlayCircle,
  UserPlus,
  Star,
  Megaphone,
  BoxIcon,
  Plus,
  SquareCheck,
  Activity,
} from "lucide-react";
import { Button } from "../ui/button";

// Grouped Navigation
const navGroups = [
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
    title: "Operations",
    items: [
      { href: "/tasks", label: "Tasks", adminOnly: false, icon: SquareCheck }, // Added Tasks here
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

const userAvatar = PlaceHolderImages.find((p) => p.id === "user-avatar-1");

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <aside className="hidden md:flex md:w-60 lg:w-72 flex-col fixed inset-y-0 z-10 border-r-2 border-black bg-background"></aside>
    );
  }

  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "staff";

  // If staff, only show a small subset of pages
  const staffAllowed = [
    "/dashboard",
    "/leads",
    "/blogs",
    "/work-gallery",
    "/enquiries",
    "/reviews",
    "/quotations",
    "/quotations/create",
  ];

  return (
    <aside className="hidden md:flex md:w-60 lg:w-72 flex-col fixed inset-y-0 z-10 border-r-2 border-black bg-background font-headline">
      <div className="p-6 border-b-2 border-black bg-white/50 backdrop-blur-sm">
        <Link href="/dashboard" className="block group">
          <h1 className="text-2xl font-black tracking-tighter group-hover:text-primary transition-colors">
            Kalahanu Tech
          </h1>
          <p className="text-sm text-muted-foreground font-bold">Studio CRM</p>
        </Link>
      </div>

      {/* Navigation Area */}
      <nav
        className="flex-1 p-4 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20"
        aria-label="Primary navigation"
      >
        {/* Quick Actions */}

        {navGroups.map((group) => {
          // Filter items based on permissions
          const filteredItems = group.items.filter((item) => {
            if (isStaff) {
              return staffAllowed.includes(item.href);
            }
            return !(item.adminOnly && !isAdmin);
          });

          if (filteredItems.length === 0) return null;

          return (
            <div key={group.title} className="space-y-2">
              <h3 className="px-2 text-xs font-black text-muted-foreground uppercase tracking-widest">
                {group.title}
              </h3>
              <div className="space-y-1">
                {filteredItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-bold transition-all border-2 rounded-md hover:translate-x-1",
                      pathname.startsWith(item.href)
                        ? "bg-primary text-primary-foreground border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted hover:border-black/10",
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t-2 border-black bg-muted/30">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-black rounded-lg">
            {user?.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : userAvatar ? (
              <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />
            ) : null}
            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-black">
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold truncate text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold truncate">
              {user.role}
            </p>
          </div>
          <Button
            onClick={logout}
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
          >
            <LifeBuoy className="w-4 h-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
