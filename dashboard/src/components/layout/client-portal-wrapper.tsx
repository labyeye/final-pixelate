"use client";

import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "./sidebar";
import { MobileHeader } from "./header";

export function ClientPortalWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const isClient = user?.role === "client";

  if (isClient) {
    // Client portal: no sidebar, no header, full-width layout
    return (
      <div className="min-h-screen bg-background text-foreground font-body">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Sidebar />
      <div className="md:pl-60 lg:pl-72">
        <MobileHeader />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
