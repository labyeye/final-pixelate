"use client";

import { apiFetch } from "@/lib/api-fetch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, LifeBuoy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import {
  navGroups,
  defaultStaffAllowed,
  clientNavItems,
  defaultClientAllowed,
  clientSpecificNavItems,
} from "@/lib/nav-config";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const userAvatar = PlaceHolderImages.find((p) => p.id === "user-avatar-1");

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [globalClientPages, setGlobalClientPages] =
    useState<string[]>(defaultClientAllowed);

  useEffect(() => {
    apiFetch("/api/settings/client-sidebar")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.allowedClientPages)) {
          setGlobalClientPages(data.allowedClientPages);
        }
      })
      .catch(() => {});
  }, []);

  const close = () => setIsOpen(false);

  const isClient = user?.role === "client";
  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "staff";
  const userAllowedPages =
    user?.allowedPages !== undefined ? user.allowedPages : defaultStaffAllowed;

  const visibleClientNavItems = clientNavItems.filter((item) =>
    globalClientPages.includes(item.href),
  );

  const linkClass = (href: string, exact = false) =>
    cn(
      "flex items-center gap-3 px-3 py-2.5 text-sm font-bold transition-all border-2 rounded-md",
      (
        exact
          ? pathname === href
          : pathname === href || pathname.startsWith(href + "/")
      )
        ? "bg-primary text-primary-foreground border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted hover:border-black/10",
    );

  return (
    <>
      {}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b-2 border-black bg-background px-4 md:hidden">
        <Link href="/dashboard" className="font-black tracking-tighter text-lg">
          Kalahanu Tech
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 border-2 border-black"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] p-0 border-r-2 border-black bg-background flex flex-col"
          >
            {}
            <div className="p-5 border-b-2 border-black bg-white/50">
              <Link href="/dashboard" onClick={close} className="block">
                <img
                  src="../assets/images/logo-transparent.png"
                  alt="Kalahanu Tech Logo"
                  className="mx-auto mb-1 w-12 h-12"
                />
                <h1 className="text-xl font-black tracking-tighter text-center">
                  Kalahanu Tech
                </h1>
                <p className="text-xs text-muted-foreground font-bold text-center">
                  Studios CRM
                </p>
              </Link>
            </div>

            {}
            <nav className="flex-1 overflow-y-auto p-3 space-y-5">
              {isClient ? (
                <>
                  <div className="space-y-1">
                    <h3 className="px-2 text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">
                      Dashboard
                    </h3>
                    {visibleClientNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={close}
                        className={linkClass(item.href)}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <h3 className="px-2 text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">
                      Client Portal
                    </h3>
                    {clientSpecificNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={close}
                        className={linkClass(item.href)}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                navGroups.map((group) => {
                  const filteredItems = group.items.filter((item) => {
                    if (isStaff) return userAllowedPages.includes(item.href);
                    return !(item.adminOnly && !isAdmin);
                  });
                  if (filteredItems.length === 0) return null;

                  return (
                    <div key={group.title} className="space-y-1">
                      <h3 className="px-2 text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">
                        {group.title}
                      </h3>
                      {filteredItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={close}
                          className={linkClass(item.href)}
                        >
                          <item.icon className="w-4 h-4 shrink-0" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  );
                })
              )}
            </nav>

            {}
            {user && (
              <div className="p-4 border-t-2 border-black bg-muted/30">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border-2 border-black rounded-lg shrink-0">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : userAvatar ? (
                      <AvatarImage
                        src={userAvatar.imageUrl}
                        alt="User Avatar"
                      />
                    ) : null}
                    <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-black text-sm">
                      {user.name?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold truncate text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                      {user.role}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      logout();
                      close();
                    }}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground rounded-md"
                  >
                    <LifeBuoy className="w-4 h-4" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
