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
import { Loader2, Save, Users, UserCheck } from "lucide-react";

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  allowedPages: string[];
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Sub-component: Staff permissions accordion                          */
/* ─────────────────────────────────────────────────────────────────── */
function StaffPermissions() {
  const { toast } = useToast();
  const [staffUsers, setStaffUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/settings/sidebar");
        if (!res.ok) throw new Error("Failed to fetch staff");
        const data = await res.json();
        setStaffUsers(
          data.map((u: any) => ({
            ...u,
            allowedPages:
              u.allowedPages?.length ? u.allowedPages : defaultStaffAllowed,
          })),
        );
      } catch {
        toast({ title: "Error", description: "Failed to load staff.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggle = (userId: string, href: string) =>
    setStaffUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const has = u.allowedPages.includes(href);
        return {
          ...u,
          allowedPages: has
            ? u.allowedPages.filter((p) => p !== href)
            : [...u.allowedPages, href],
        };
      }),
    );

  const save = async (staff: ManagedUser) => {
    setSaving(staff.id);
    try {
      const res = await fetch("/api/settings/sidebar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: staff.id, allowedPages: staff.allowedPages }),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast({ title: "Saved", description: `Permissions updated for ${staff.name}` });
    } catch {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

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
                {staff.allowedPages.length} pages
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2 border-t-2 border-black bg-muted/20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
              {navGroups.map((group) => {
                const nonAdminItems = group.items.filter((i) => !i.adminOnly);
                if (nonAdminItems.length === 0) return null;
                return (
                  <div key={group.title} className="space-y-3">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                      {group.title}
                    </h4>
                    <div className="space-y-2">
                      {nonAdminItems.map((item) => {
                        const checked = staff.allowedPages.includes(item.href);
                        const id = `staff-${staff.id}-${item.href}`;
                        return (
                          <div key={item.href} className="flex items-center gap-2">
                            <Checkbox
                              id={id}
                              checked={checked}
                              onCheckedChange={() => toggle(staff.id, item.href)}
                              className="border-2 border-black"
                            />
                            <Label htmlFor={id} className="text-sm font-semibold cursor-pointer flex items-center gap-1.5">
                              <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                              {item.label}
                            </Label>
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
