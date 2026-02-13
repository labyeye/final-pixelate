"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { navGroups, defaultStaffAllowed } from "@/lib/nav-config";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

interface StaffUser {
  id: string;
  name: string;
  email: string;
  allowedPages: string[];
}

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchStaffUsers();
  }, []);

  const fetchStaffUsers = async () => {
    try {
      const res = await fetch("/api/settings/sidebar");
      if (!res.ok) throw new Error("Failed to fetch staff");
      const data = await res.json();
      // Initialize allowedPages with default if empty/undefined
      const processed = data.map((u: any) => ({
        ...u,
        allowedPages:
          u.allowedPages && u.allowedPages.length > 0
            ? u.allowedPages
            : defaultStaffAllowed,
      }));
      setStaffUsers(processed);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load staff users.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cleanPath = (path: string) => path.split("?")[0];

  const handleTogglePage = (userId: string, pageHref: string) => {
    setStaffUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const currentPages = u.allowedPages || [];
        const exists = currentPages.includes(pageHref);
        let newPages;
        if (exists) {
          newPages = currentPages.filter((p) => p !== pageHref);
        } else {
          newPages = [...currentPages, pageHref];
        }
        return { ...u, allowedPages: newPages };
      }),
    );
  };

  const saveSettings = async (user: StaffUser) => {
    setSaving(user.id);
    try {
      const res = await fetch("/api/settings/sidebar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          allowedPages: user.allowedPages,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast({
        title: "Success",
        description: `Permissions updated for ${user.name}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
        <p className="text-muted-foreground">
          Only admins can access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage sidebar visibility for staff members.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Sidebar Permissions</CardTitle>
          <CardDescription>
            Select which pages each staff member can see in their sidebar.
            Unchecking a page will hide it from their navigation menu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {staffUsers.map((staff) => (
              <AccordionItem key={staff.id} value={staff.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-bold">{staff.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      {staff.email}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {navGroups.map((group) => (
                      <div key={group.title} className="space-y-3">
                        <h4 className="text-sm font-black text-muted-foreground uppercase tracking-wider">
                          {group.title}
                        </h4>
                        <div className="space-y-2">
                          {group.items
                            .filter((item) => !item.adminOnly) // Only show non-admin pages
                            .map((item) => {
                              const isChecked = staff.allowedPages.includes(
                                item.href,
                              );
                              const id = `check-${staff.id}-${item.href}`;
                              return (
                                <div
                                  key={item.href}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={id}
                                    checked={isChecked}
                                    onCheckedChange={() =>
                                      handleTogglePage(staff.id, item.href)
                                    }
                                  />
                                  <Label
                                    htmlFor={id}
                                    className="text-sm font-medium cursor-pointer"
                                  >
                                    {item.label}
                                  </Label>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end pt-4 border-t">
                    <Button
                      onClick={() => saveSettings(staff)}
                      disabled={saving === staff.id}
                    >
                      {saving === staff.id && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      {saving === staff.id ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {staffUsers.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No staff members found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
