
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/hooks/use-auth';
import { Code, Users, LayoutDashboard, KanbanSquare, FileText, Briefcase, Receipt, LifeBuoy, Columns, BarChart as BarChartIcon, DollarSign as DollarIcon, Image as ImageIcon, PlayCircle, UserPlus } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', adminOnly: false, icon: LayoutDashboard },
  { href: '/profile', label: 'Profile', adminOnly: false, icon: Users },
  { href: '/leads', label: 'Leads', adminOnly: false, icon: KanbanSquare },
  { href: '/enquiries', label: 'Enquiries', adminOnly: false, icon: LifeBuoy },
  { href: '/clients', label: 'Clients', adminOnly: false, icon: Users },
  { href: '/quotations', label: 'Quotations', adminOnly: false, icon: FileText },
  { href: '/projects', label: 'Projects', adminOnly: false, icon: Briefcase },
  { href: '/work-gallery', label: 'Work Gallery', adminOnly: true, icon: ImageIcon },
  { href: '/reels', label: 'Reels', adminOnly: true, icon: PlayCircle },
  { href: '/blogs', label: 'Blogs', adminOnly: true, icon: FileText },
  { href: '/about-us-team', label: 'About Us Team', adminOnly: true, icon: Users },
  { href: '/careers', label: 'Careers', adminOnly: true, icon: UserPlus },
  { href: '/analytics', label: 'Analytics', adminOnly: false, icon: BarChartIcon },
  { href: '/invoicing', label: 'Invoicing', adminOnly: true, icon: Receipt },
  { href: '/developers-and-editors', label: 'Developers & Editors', adminOnly: true, icon: Users },
  { href: '/services', label: 'Services', adminOnly: true, icon: Code },
  { href: '/expenses', label: 'Expenses', adminOnly: false, icon: DollarIcon },
  { href: '/support', label: 'Support', adminOnly: false, icon: LifeBuoy },
];

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) {
    // This case should be handled by the AuthProvider's loading state,
    // but as a fallback, we render an empty sidebar.
    return (
        <aside className="hidden md:flex md:w-60 lg:w-72 flex-col fixed inset-y-0 z-10 border-r-2 border-black bg-background">
        </aside>
    );
  }
  
  const isAdmin = user?.role === 'admin';
  const isStaff = user?.role === 'staff';

  // If staff, only show a small subset of pages (include dashboard)
  const staffAllowed = ['/dashboard', '/leads', '/blogs', '/work-gallery', '/enquiries'];
  const itemsToShow = isStaff
    ? navItems.filter(i => staffAllowed.includes(i.href))
    : navItems.filter((i) => !(i.adminOnly && !isAdmin));

  return (
    <aside className="hidden md:flex md:w-60 lg:w-72 flex-col fixed inset-y-0 z-10 border-r-2 border-black bg-background">
      <div className="p-6 border-b-2 border-black">
        <Link href="/dashboard" className="block group">
          <h1 className="text-2xl font-bold tracking-tighter group-hover:text-primary">Pixelate Nest</h1>
          <p className="text-sm text-muted-foreground">Creative Agency CRM</p>
        </Link>
      </div>
      {/*
        Make the central navigation area scrollable when the viewport is short.
        We keep header (brand) and footer (user area) fixed and allow the nav
        to overflow-y:auto. This preserves all existing classes and styles.
      */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto" aria-label="Primary navigation">
        {itemsToShow.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 rounded-none border-2 border-foreground p-3 text-base font-bold transition-colors",
              pathname.startsWith(item.href)
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-foreground hover:bg-foreground hover:text-background'
            )}
          >
            {item.icon && <item.icon />}
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-6 border-t-2 border-black">
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-black rounded-none">
                {user?.avatar ? (
                  // If user has uploaded an avatar (data URL or URL), use it
                  <AvatarImage src={user.avatar} alt={`${user.name || 'User'} avatar`} />
                ) : (
                  // fallback to repo placeholder image
                  userAvatar ? <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" /> : null
                )}
                <AvatarFallback className="rounded-none bg-accent text-accent-foreground font-bold">
                    {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                </AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm text-muted-foreground uppercase">{user.role}</p>
                 <button onClick={logout} className="text-sm text-muted-foreground hover:text-primary underline">
                  Logout
                </button>
            </div>
        </div>
      </div>
    </aside>
  );
}
