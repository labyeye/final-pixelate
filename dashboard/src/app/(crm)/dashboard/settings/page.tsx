"use client";

import { apiFetch } from "@/lib/api-fetch";
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
import {
  Loader2,
  Save,
  Users,
  UserCheck,
  ChevronRight,
  ChevronDown,
  ShieldAlert,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  allowedPages: string[];
  pagePermissions?: Record<
    string,
    { add?: boolean; view?: boolean; edit?: boolean; delete?: boolean }
  >;
}

function StaffPermissions() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [staffUsers, setStaffUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const [openPages, setOpenPages] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/api/settings/sidebar");
        if (!res.ok) throw new Error("Failed to fetch staff");
        const data = await res.json();
        setStaffUsers(
          data.map((u: any) => {
            const allowed = u.allowedPages?.length
              ? u.allowedPages
              : defaultStaffAllowed;

            const pagePermissions =
              u.pagePermissions ||
              allowed.reduce((acc: any, href: string) => {
                acc[href] = { view: true };
                return acc;
              }, {});
            return { ...u, allowedPages: allowed, pagePermissions };
          }),
        );
      } catch {
        toast({
          title: "Error",
          description: "Failed to load staff.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const togglePermission = (
    userId: string,
    href: string,
    perm: keyof NonNullable<ManagedUser["pagePermissions"]>,
  ) =>
    setStaffUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const perms = { ...(u.pagePermissions || {}) } as Record<string, any>;
        perms[href] = perms[href] || {
          add: false,
          view: false,
          edit: false,
          delete: false,
        };
        perms[href][perm] = !perms[href][perm];

        const anyTrue = Object.values(perms[href]).some(Boolean);
        const allowedPages = anyTrue
          ? Array.from(new Set([...(u.allowedPages || []), href]))
          : (u.allowedPages || []).filter((p) => p !== href);

        return { ...u, pagePermissions: perms, allowedPages };
      }),
    );

  const save = async (staff: ManagedUser) => {
    setSaving(staff.id);
    try {
      const pagePerms = staff.pagePermissions || {};
      const derivedAllowed = Object.keys(pagePerms).filter((href) => {
        const p = pagePerms[href] || {};
        return !!(p.view || p.add || p.edit || p.delete);
      });

      const adminName = currentUser?.name || currentUser?.email || "Admin";

      const res = await apiFetch("/api/settings/sidebar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: staff.id,
          allowedPages: derivedAllowed,
          pagePermissions: pagePerms,
          adminName,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast({
        title: "Saved",
        description: `Permissions updated for ${staff.name}`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const setPermission = (
    userId: string,
    href: string,
    perm: keyof NonNullable<ManagedUser["pagePermissions"]>,
    value: boolean,
  ) =>
    setStaffUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const perms = { ...(u.pagePermissions || {}) } as Record<string, any>;
        perms[href] = perms[href] || {
          add: false,
          view: false,
          edit: false,
          delete: false,
        };
        perms[href][perm] = value;

        const anyTrue = Object.values(perms[href]).some(Boolean);
        const allowedPages = anyTrue
          ? Array.from(new Set([...(u.allowedPages || []), href]))
          : (u.allowedPages || []).filter((p) => p !== href);

        return { ...u, pagePermissions: perms, allowedPages };
      }),
    );

  const isPageOpen = (userId: string, href: string) =>
    !!(openPages[userId] && openPages[userId].has(href));
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
                <p className="text-xs text-muted-foreground font-normal">
                  {staff.email}
                </p>
              </div>
              <Badge
                variant="outline"
                className="ml-2 border-black font-bold text-xs"
              >
                {
                  Object.keys(staff.pagePermissions || {}).filter((h) => {
                    const p = staff.pagePermissions?.[h] || {};
                    return !!(p.view || p.add || p.edit || p.delete);
                  }).length
                }{" "}
                pages
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2 border-t-2 border-black bg-muted/20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
              {navGroups.map((group) => {
                if (group.items.length === 0) return null;
                if (group.title === "Nest HR") return null;
                return (
                  <div key={group.title} className="space-y-3">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                      {group.title}
                    </h4>
                    <div className="space-y-2">
                      {group.items.map((item) => {
                        const perms = staff.pagePermissions?.[item.href] || {
                          add: false,
                          view: false,
                          edit: false,
                          delete: false,
                        };
                        const idBase = `staff-${staff.id}-${item.href}`;
                        const open = isPageOpen(staff.id, item.href);
                        return (
                          <div
                            key={item.href}
                            className="border-b border-transparent last:border-b-0"
                          >
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2">
                                <Label className="text-sm font-semibold flex items-center gap-1.5">
                                  <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                                  {item.label}
                                </Label>
                                {item.adminOnly && (
                                  <span
                                    title="Admin-only page — grant access carefully"
                                    className="flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-300 rounded px-1 py-0.5 leading-none"
                                  >
                                    <ShieldAlert className="w-2.5 h-2.5" />
                                    Admin
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  togglePageOpen(staff.id, item.href)
                                }
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
                                  <Checkbox
                                    id={`${idBase}-view`}
                                    checked={!!perms.view}
                                    onCheckedChange={(v) =>
                                      setPermission(
                                        staff.id,
                                        item.href,
                                        "view",
                                        !!v,
                                      )
                                    }
                                    className="border-2 border-black"
                                  />
                                  <span className="text-xs font-semibold">
                                    View
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Checkbox
                                    id={`${idBase}-add`}
                                    checked={!!perms.add}
                                    onCheckedChange={(v) =>
                                      setPermission(
                                        staff.id,
                                        item.href,
                                        "add",
                                        !!v,
                                      )
                                    }
                                    className="border-2 border-black"
                                  />
                                  <span className="text-xs font-semibold">
                                    Add
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Checkbox
                                    id={`${idBase}-edit`}
                                    checked={!!perms.edit}
                                    onCheckedChange={(v) =>
                                      setPermission(
                                        staff.id,
                                        item.href,
                                        "edit",
                                        !!v,
                                      )
                                    }
                                    className="border-2 border-black"
                                  />
                                  <span className="text-xs font-semibold">
                                    Edit
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Checkbox
                                    id={`${idBase}-delete`}
                                    checked={!!perms.delete}
                                    onCheckedChange={(v) =>
                                      setPermission(
                                        staff.id,
                                        item.href,
                                        "delete",
                                        !!v,
                                      )
                                    }
                                    className="border-2 border-black"
                                  />
                                  <span className="text-xs font-semibold">
                                    Delete
                                  </span>
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

function ClientPermissions() {
  const { toast } = useToast();
  const [allowedPages, setAllowedPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/api/settings/client-sidebar");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAllowedPages(data.allowedClientPages ?? defaultClientAllowed);
      } catch {
        toast({
          title: "Error",
          description: "Failed to load client settings.",
          variant: "destructive",
        });
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
      const res = await apiFetch("/api/settings/client-sidebar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allowedClientPages: allowedPages }),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast({
        title: "Saved",
        description: "Client portal visibility updated for all clients.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
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
      {}
      <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-black bg-amber-50">
        <UserCheck className="w-5 h-5 mt-0.5 text-amber-600 shrink-0" />
        <p className="text-sm font-semibold text-amber-800">
          These settings apply to{" "}
          <span className="font-black">all clients</span>. Toggling a page
          on/off will show or hide it in every client's portal sidebar
          immediately.
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

function DocumentSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/api/settings");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setSettings({
          invoicePrefix: data.invoicePrefix ?? "KTS/",
          invoiceStartNumber: data.invoiceStartNumber ?? 1,
          receiptPrefix: data.receiptPrefix ?? "RCPT/",
          receiptStartNumber: data.receiptStartNumber ?? 1,
          quotationPrefix: data.quotationPrefix ?? "PXL-",
          quotationStartNumber: data.quotationStartNumber ?? 1,
        });
      } catch {
        toast({
          title: "Error",
          description: "Failed to load document settings.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast({
        title: "Saved",
        description: "Document numbering settings updated successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
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
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Invoice Settings */}
        <div className="space-y-4 p-4 border-2 border-black rounded-lg bg-muted/30">
          <h3 className="font-black text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Invoice Numbering
          </h3>
          <div className="space-y-2">
            <Label htmlFor="invPrefix" className="font-bold">
              Prefix
            </Label>
            <Input
              id="invPrefix"
              value={settings.invoicePrefix}
              onChange={(e) =>
                setSettings({ ...settings, invoicePrefix: e.target.value })
              }
              className="border-2 border-black font-semibold"
              placeholder="e.g. KTS/"
            />
            <p className="text-xs text-muted-foreground font-medium">
              Prefix added before the number (e.g. KTS/2024-2025/0001)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="invStart" className="font-bold">
              Starting Number
            </Label>
            <Input
              id="invStart"
              type="number"
              value={settings.invoiceStartNumber}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  invoiceStartNumber: parseInt(e.target.value) || 1,
                })
              }
              className="border-2 border-black font-semibold"
            />
            <p className="text-xs text-muted-foreground font-medium">
              The sequence will start from this number for new invoices.
            </p>
          </div>
        </div>

        {/* Receipt Settings */}
        <div className="space-y-4 p-4 border-2 border-black rounded-lg bg-muted/30">
          <h3 className="font-black text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Receipt Numbering
          </h3>
          <div className="space-y-2">
            <Label htmlFor="rcptPrefix" className="font-bold">
              Prefix
            </Label>
            <Input
              id="rcptPrefix"
              value={settings.receiptPrefix}
              onChange={(e) =>
                setSettings({ ...settings, receiptPrefix: e.target.value })
              }
              className="border-2 border-black font-semibold"
              placeholder="e.g. RCPT/"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rcptStart" className="font-bold">
              Starting Number
            </Label>
            <Input
              id="rcptStart"
              type="number"
              value={settings.receiptStartNumber}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  receiptStartNumber: parseInt(e.target.value) || 1,
                })
              }
              className="border-2 border-black font-semibold"
            />
          </div>
        </div>

        {/* Quotation Settings */}
        <div className="space-y-4 p-4 border-2 border-black rounded-lg bg-muted/30">
          <h3 className="font-black text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Quotation Numbering
          </h3>
          <div className="space-y-2">
            <Label htmlFor="quotPrefix" className="font-bold">
              Prefix
            </Label>
            <Input
              id="quotPrefix"
              value={settings.quotationPrefix}
              onChange={(e) =>
                setSettings({ ...settings, quotationPrefix: e.target.value })
              }
              className="border-2 border-black font-semibold"
              placeholder="e.g. PXL-"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quotStart" className="font-bold">
              Starting Number
            </Label>
            <Input
              id="quotStart"
              type="number"
              value={settings.quotationStartNumber}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  quotationStartNumber: parseInt(e.target.value) || 1,
                })
              }
              className="border-2 border-black font-semibold"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t-2 border-black/10">
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
          <TabsTrigger
            value="documents"
            className="font-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-md px-5 py-2 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Documents
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
                Choose which sidebar pages each staff member can see. Unchecked
                pages are hidden from their navigation.
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
                Control which pages clients can see in their portal sidebar.
                "Client Portal Exclusive" pages are client-only routes. All
                other pages are shared dashboard routes accessible to clients.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ClientPermissions />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Document Tab ─────────────────────────────────────────── */}
        <TabsContent value="documents">
          <Card className="border-2 border-black">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="font-black tracking-tight text-xl flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Numbering Settings
              </CardTitle>
              <CardDescription className="font-semibold">
                Configure how Invoice, Receipt, and Quotation numbers are
                generated.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <DocumentSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
