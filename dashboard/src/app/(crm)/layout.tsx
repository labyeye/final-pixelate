import { Sidebar } from "@/components/layout/sidebar";
import { MobileHeader } from "@/components/layout/header";
import { AuthProvider } from "@/hooks/use-auth";
import { ClientPortalWrapper } from "@/components/layout/client-portal-wrapper";

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ClientPortalWrapper>{children}</ClientPortalWrapper>
    </AuthProvider>
  );
}
