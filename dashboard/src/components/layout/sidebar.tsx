"use client";

import { apiFetch } from "@/lib/api-fetch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuth } from "@/hooks/use-auth";
import {
  navGroups,
  defaultStaffAllowed,
  clientNavItems,
  defaultClientAllowed,
  clientSpecificNavItems,
} from "@/lib/nav-config";
import { useEffect, useState } from "react";
import { ChevronDown, LifeBuoy, Search } from "lucide-react";
import { Button } from "../ui/button";

const userAvatar = PlaceHolderImages.find((p) => p.id === "user-avatar-1");

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [globalClientPages, setGlobalClientPages] =
    useState<string[]>(defaultClientAllowed);

  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [q, setQ] = useState("");
  useEffect(() => {
    try { setOpen(JSON.parse(localStorage.getItem("nav_open") || "{}")); } catch {}
  }, []);
  const toggle = (t: string, cur: boolean) =>
    setOpen((o) => {
      const next = { ...o, [t]: !cur };
      try { localStorage.setItem("nav_open", JSON.stringify(next)); } catch {}
      return next;
    });

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

  if (!user) {
    return (
      <aside className="hidden md:flex md:w-60 lg:w-72 flex-col fixed inset-y-0 z-10 border-r-2 border-black bg-background"></aside>
    );
  }

  const isClient = user.role === "client";
  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "staff";
  const userAllowedPages =
    user.allowedPages !== undefined ? user.allowedPages : defaultStaffAllowed;

  const visibleClientNavItems = clientNavItems.filter((item) =>
    globalClientPages.includes(item.href),
  );

  return (
    <aside className="hidden md:flex md:w-60 lg:w-72 flex-col fixed inset-y-0 z-10 border-r-2 border-black bg-background font-headline">
      <div className="p-6 border-b-2 border-black bg-white/50 backdrop-blur-sm">
        <Link href="/dashboard" className="block group">
          <img
            src="../assets/images/logo-transparent.png"
            alt="Kalahanu Tech Logo"
            className="mx-auto mb-2 w-16 h-16"
          />
          <h1 className="text-2xl font-black tracking-tighter group-hover:text-primary transition-colors">
            Kalahanu Tech
          </h1>
          <p className="text-sm text-muted-foreground font-bold">Studios CRM</p>
        </Link>
      </div>
      <nav
        className="flex-1 p-4 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20"
        aria-label="Primary navigation"
      >
        {isClient ? (
          <>
            <div className="space-y-2">
              <h3 className="px-2 text-xs font-black text-muted-foreground uppercase tracking-widest">
                Dashboard
              </h3>
              <div className="space-y-1">
                {visibleClientNavItems.map((item) => (
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

            <div className="space-y-2">
              <h3 className="px-2 text-xs font-black text-muted-foreground uppercase tracking-widest">
                Client Portal
              </h3>
              <div className="space-y-1">
                {clientSpecificNavItems.map((item) => (
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
          </>
        ) : (
          <>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Find a page"
                className="w-full h-9 pl-8 pr-2 text-xs font-bold border-2 border-black rounded-md bg-white outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              />
            </div>
            {navGroups.map((group, gi) => {
              if (isStaff && group.title === "Nest HR") return null;
              const term = q.trim().toLowerCase();
              const filteredItems = group.items.filter((item) => {
                if (term && !item.label.toLowerCase().includes(term) && !group.title.toLowerCase().includes(term)) return false;
                if (isStaff) return userAllowedPages.includes(item.href);
                return !(item.adminOnly && !isAdmin);
              });
              if (filteredItems.length === 0) return null;
              const active = filteredItems.some((i) => pathname === i.href || pathname.startsWith(i.href + "/"));
              // first group and the group holding the current page start open; everything else folded
              const isOpen = term ? true : open[group.title] ?? (gi === 0 || active);
              return (
                <div key={group.title} className="animate-nav-in" style={{ animationDelay: `${gi * 30}ms` }}>
                  <button
                    onClick={() => toggle(group.title, isOpen)}
                    className="flex w-full items-center justify-between px-2 h-8 text-[11px] font-black text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-1.5">
                      {group.title}
                      {active && !isOpen && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </span>
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen ? "rotate-0" : "-rotate-90")} />
                  </button>
                  <div className={cn("grid transition-[grid-template-rows] duration-200 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden">
                      <div className="space-y-0.5 pt-1 pb-2">
                        {filteredItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-2.5 px-3 h-8 text-[13px] font-bold transition-[transform,background-color,box-shadow] duration-150 border-2 rounded-md hover:translate-x-0.5 active:scale-[0.98]",
                              pathname === item.href || pathname.startsWith(item.href + "/")
                                ? "bg-primary text-primary-foreground border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted hover:border-black/10",
                            )}
                          >
                            <item.icon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </nav>

      {}
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
