"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  navGroups,
  defaultStaffAllowed,
  clientNavItems,
  clientPortalGroups,
  defaultClientAllowed,
} from "@/lib/nav-config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Users, UserCheck, ChevronRight, ChevronDown } from "lucide-react";

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  allowedPages: string[];
  pagePermissions?: Record<string, { add?: boolean; view?: boolean; edit?: boolean; delete?: boolean }>;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Sub-component: Staff permissions accordion                          */
/* ─────────────────────────────────────────────────────────────────── */
function StaffPermissions() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [staffUsers, setStaffUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  // track expanded pages per staff: map userId -> Set of hrefs
  const [openPages, setOpenPages] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/settings/sidebar");
        if (!res.ok) throw new Error("Failed to fetch staff");
        const data = await res.json();
        setStaffUsers(
          data.map((u: any) => {
            const allowed = u.allowedPages?.length ? u.allowedPages : defaultStaffAllowed;
            // If API provides pagePermissions use it, otherwise derive view-only permissions from allowedPages
            const pagePermissions = u.pagePermissions || allowed.reduce((acc: any, href: string) => {
              acc[href] = { view: true };
              return acc;
            }, {});
            return { ...u, allowedPages: allowed, pagePermissions };
          }),
        );
      } catch {
        toast({ title: "Error", description: "Failed to load staff.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const togglePermission = (userId: string, href: string, perm: keyof NonNullable<ManagedUser['pagePermissions']>) =>
    setStaffUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const perms = { ...(u.pagePermissions || {}) } as Record<string, any>;
        perms[href] = perms[href] || { add: false, view: false, edit: false, delete: false };
        perms[href][perm] = !perms[href][perm];

        // Update allowedPages: include href if any permission true, remove otherwise
        const anyTrue = Object.values(perms[href]).some(Boolean);
        const allowedPages = anyTrue ? Array.from(new Set([...(u.allowedPages || []), href])) : (u.allowedPages || []).filter((p) => p !== href);

        return { ...u, pagePermissions: perms, allowedPages };
      }),
    );

  const save = async (staff: ManagedUser) => {
    setSaving(staff.id);
    try {
      // derive allowedPages from pagePermissions (pages with any true)
      const pagePerms = staff.pagePermissions || {};
      const derivedAllowed = Object.keys(pagePerms).filter((href) => {
        const p = pagePerms[href] || {};
        return !!(p.view || p.add || p.edit || p.delete);
      });

      const adminName = currentUser?.name || currentUser?.email || "Admin";

      const res = await fetch("/api/settings/sidebar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: staff.id, 
          allowedPages: derivedAllowed, 
          pagePermissions: pagePerms,
          adminName 
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast({ title: "Saved", description: `Permissions updated for ${staff.name}` });
    } catch {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  // Set a specific permission to a boolean value (used by Checkbox onCheckedChange)
  const setPermission = (userId: string, href: string, perm: keyof NonNullable<ManagedUser['pagePermissions']>, value: boolean) =>
    setStaffUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const perms = { ...(u.pagePermissions || {}) } as Record<string, any>;
        perms[href] = perms[href] || { add: false, view: false, edit: false, delete: false };
        perms[href][perm] = value;

        // Update allowedPages: include href if any permission true, remove otherwise
        const anyTrue = Object.values(perms[href]).some(Boolean);
        const allowedPages = anyTrue ? Array.from(new Set([...(u.allowedPages || []), href])) : (u.allowedPages || []).filter((p) => p !== href);

        return { ...u, pagePermissions: perms, allowedPages };
      }),
    );

  const isPageOpen = (userId: string, href: string) => !!(openPages[userId] && openPages[userId].has(href));
  const togglePageOpen = (userId: string, href: string) =>
    setOpenPages((prev) => {
      const copy: Record<string, Set<string>> = { ...prev };
      const setForUser = new Set(copy[userId] ? Array.from(copy[userId]) : []);
      if (setForUser.has(href)) setForUser.delete(href);
      else setForUser.add(href);
      copy[userId] = setForUser;
      return copy;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (staffUsers.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No staff members found. Add staff from the Users page.
      </p>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {staffUsers.map((staff) => (
        <AccordionItem
          key={staff.id}
          value={staff.id}
          className="border-2 border-black rounded-lg overflow-hidden"
        >
          <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-black text-sm border-2 border-black">
                {staff.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-black text-sm">{staff.name}</p>
                <p className="text-xs text-muted-foreground font-normal">{staff.email}</p>
              </div>
              <Badge variant="outline" className="ml-2 border-black font-bold text-xs">
                {Object.keys(staff.pagePermissions || {}).filter(h => {
                  const p = staff.pagePermissions?.[h] || {};
                  return !!(p.view || p.add || p.edit || p.delete);
                }).length} pages
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2 border-t-2 border-black bg-muted/20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
              {navGroups.map((group) => {
                // Show all sidebar items here (include adminOnly items so admins
                // can toggle visibility for staff). Previously we filtered out
                // admin-only pages which hid some sidebar entries from this panel.
                const itemsToShow = group.items;
                if (itemsToShow.length === 0) return null;
                return (
                  <div key={group.title} className="space-y-3">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                      {group.title}
                    </h4>
                    <div className="space-y-2">
                      {itemsToShow.map((item) => {
                        const perms = staff.pagePermissions?.[item.href] || { add: false, view: false, edit: false, delete: false };
                        const idBase = `staff-${staff.id}-${item.href}`;
                        const open = isPageOpen(staff.id, item.href);
                        return (
                          <div key={item.href} className="border-b border-transparent last:border-b-0">
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2">
                                <Label className="text-sm font-semibold flex items-center gap-1.5">
                                  <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                                  {item.label}
                                </Label>
                              </div>
                              <button
                                type="button"
                                onClick={() => togglePageOpen(staff.id, item.href)}
                                aria-expanded={open}
                                className="p-1 rounded hover:bg-muted/30"
                              >
                                {open ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </button>
                            </div>

                            {open && (
                              <div className="flex items-center gap-3 pl-8 pb-2">
                                <div className="flex items-center gap-1">
                                  <Checkbox id={`${idBase}-view`} checked={!!perms.view} onCheckedChange={(v) => setPermission(staff.id, item.href, "view", !!v)} className="border-2 border-black" />
                                  <span className="text-xs font-semibold">View</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Checkbox id={`${idBase}-add`} checked={!!perms.add} onCheckedChange={(v) => setPermission(staff.id, item.href, "add", !!v)} className="border-2 border-black" />
                                  <span className="text-xs font-semibold">Add</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Checkbox id={`${idBase}-edit`} checked={!!perms.edit} onCheckedChange={(v) => setPermission(staff.id, item.href, "edit", !!v)} className="border-2 border-black" />
                                  <span className="text-xs font-semibold">Edit</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Checkbox id={`${idBase}-delete`} checked={!!perms.delete} onCheckedChange={(v) => setPermission(staff.id, item.href, "delete", !!v)} className="border-2 border-black" />
                                  <span className="text-xs font-semibold">Delete</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end pt-5 mt-4 border-t-2 border-black/10">
              <Button
                onClick={() => save(staff)}
                disabled={saving === staff.id}
                className="border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-black"
              >
                {saving === staff.id ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {saving === staff.id ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Sub-component: Client permissions — GLOBAL toggle panel             */
/* ─────────────────────────────────────────────────────────────────── */
function ClientPermissions() {
  const { toast } = useToast();
  const [allowedPages, setAllowedPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/settings/client-sidebar");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAllowedPages(data.allowedClientPages ?? defaultClientAllowed);
      } catch {
        toast({ title: "Error", description: "Failed to load client settings.", variant: "destructive" });
        setAllowedPages(defaultClientAllowed);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggle = (href: string) =>
    setAllowedPages((prev) =>
      prev.includes(href) ? prev.filter((p) => p !== href) : [...prev, href],
    );

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings/client-sidebar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allowedClientPages: allowedPages }),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast({ title: "Saved", description: "Client portal visibility updated for all clients." });
    } catch {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-black bg-amber-50">
        <UserCheck className="w-5 h-5 mt-0.5 text-amber-600 shrink-0" />
        <p className="text-sm font-semibold text-amber-800">
          These settings apply to <span className="font-black">all clients</span>. Toggling a page on/off will show or hide it in every client's portal sidebar immediately.
        </p>
      </div>

      {/* Grouped page toggles */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clientPortalGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              {group.title}
            </h4>
            <div className="space-y-2">
              {group.items.map((item) => {
                const checked = allowedPages.includes(item.href);
                const id = `client-global-${item.href}`;
                return (
                  <div key={item.href} className="flex items-center gap-2">
                    <Checkbox
                      id={id}
                      checked={checked}
                      onCheckedChange={() => toggle(item.href)}
                      className="border-2 border-black"
                    />
                    <Label
                      htmlFor={id}
                      className="text-sm font-semibold cursor-pointer flex items-center gap-1.5"
                    >
                      <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                      {item.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-black/10">
        <p className="text-sm text-muted-foreground font-semibold">
          {allowedPages.length} of {clientNavItems.length} pages enabled
        </p>
        <Button
          onClick={save}
          disabled={saving}
          className="border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-black"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Main Settings Page                                                  */
/* ─────────────────────────────────────────────────────────────────── */
export default function SettingsPage() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return (
      <div className="space-y-8 font-headline">
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle className="text-2xl font-black tracking-tighter">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Only admins can access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-headline max-w-5xl">
      {/* Page header */}
      <header>
        <h1 className="text-5xl font-black tracking-tighter">SETTINGS</h1>
        <p className="text-muted-foreground text-lg mt-1">
          Manage sidebar visibility for staff members and client portals.
        </p>
      </header>

      <Tabs defaultValue="staff" className="w-full">
        <TabsList className="border-2 border-black rounded-lg p-1 h-auto gap-1 bg-muted/50 mb-6">
          <TabsTrigger
            value="staff"
            className="font-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-md px-5 py-2 flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Staff Permissions
          </TabsTrigger>
          <TabsTrigger
            value="clients"
            className="font-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-md px-5 py-2 flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            Client Portal
          </TabsTrigger>
        </TabsList>

        {/* ── Staff Tab ─────────────────────────────────────────────── */}
        <TabsContent value="staff">
          <Card className="border-2 border-black">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="font-black tracking-tight text-xl flex items-center gap-2">
                <Users className="w-5 h-5" />
                Staff Sidebar Permissions
              </CardTitle>
              <CardDescription className="font-semibold">
                Choose which sidebar pages each staff member can see.
                Unchecked pages are hidden from their navigation.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <StaffPermissions />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Client Tab ────────────────────────────────────────────── */}
        <TabsContent value="clients">
          <Card className="border-2 border-black">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="font-black tracking-tight text-xl flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Client Portal Visibility
              </CardTitle>
              <CardDescription className="font-semibold">
                Control which pages each client can see in their portal sidebar.
                Only clients with a portal login appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ClientPermissions />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
