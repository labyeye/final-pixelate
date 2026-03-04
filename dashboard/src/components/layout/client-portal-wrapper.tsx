"use client";

import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "./sidebar";
import { MobileHeader } from "./header";

export function ClientPortalWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const isClient = user?.role === "client";

  // Both clients and staff/admin get the same sidebar + header shell.
  // The Sidebar component itself decides which nav items to show per role.
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <div className="print:hidden">
        <Sidebar />
      </div>
      <div className="md:pl-60 lg:pl-72 print:pl-0">
        <div className="print:hidden">
          <MobileHeader />
        </div>
        <main className="p-4 sm:p-6 lg:p-8 print:p-0">
          {children}
        </main>
      </div>
    </div>
  );
}
