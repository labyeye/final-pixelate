import * as svc from "@/lib/services";

type SyncStatus = "activate" | "deactivate";

type ProductConfig = {
  backendUrl: string;
  secret: string;
  path: (tenantId: string) => string;
  body: (status: SyncStatus, renewalDate?: string | null) => Record<string, unknown>;
};

function getProductConfig(product: string): ProductConfig | null {
  switch (product) {
    case "nesthr":
      return {
        backendUrl: process.env.NESTHR_BACKEND_URL ?? "",
        secret: process.env.NESTHR_CRM_SECRET ?? process.env.NESTHR_STATS_SECRET ?? "",
        path: (tenantId) => `/api/crm/companies/${tenantId}/subscription`,
        body: (status, renewalDate) => ({
          status: status === "activate" ? "active" : "inactive",
          paymentStatus: status === "activate" ? "completed" : undefined,
          renewalDate: renewalDate ?? undefined,
        }),
      };
    case "nestleads":
      return {
        backendUrl: process.env.NESTLEADS_BACKEND_URL ?? "",
        secret: process.env.NESTLEADS_CRM_SECRET ?? process.env.NESTLEADS_STATS_SECRET ?? "",
        path: (tenantId) => `/internal/tenants/${tenantId}/subscription`,
        body: (status, renewalDate) => ({
          status: status === "activate" ? "active" : "suspended",
          renewalDate: renewalDate ?? undefined,
        }),
      };
    case "nestsports":
      return {
        backendUrl: process.env.NESTSPORTS_BACKEND_URL ?? "",
        secret: process.env.NESTSPORTS_CRM_SECRET ?? process.env.NESTSPORTS_STATS_SECRET ?? "",
        path: (tenantId) => `/api/crm/companies/${tenantId}/subscription`,
        body: (status, renewalDate) => ({
          status: status === "activate" ? "active" : "inactive",
          paymentStatus: status === "activate" ? "completed" : undefined,
          renewalDate: renewalDate ?? undefined,
        }),
      };
    default:
      return null;
  }
}

/**
 * Pushes a subscription activate/deactivate call to the product backend a
 * client is linked to (client.product + client.externalTenantId). No-ops
 * silently if the client isn't linked to a product or the backend/secret
 * for that product isn't configured yet — this must never throw, since it
 * runs alongside payment recording and a sync failure shouldn't block that.
 */
export async function syncClientSubscription(
  clientId: string,
  status: SyncStatus,
  renewalDate?: string | null,
): Promise<void> {
  try {
    const client = await svc.findById("clients", clientId);
    if (!client) return;

    const product = (client as any).product;
    const externalTenantId = (client as any).externalTenantId;
    if (!product || product === "none" || !externalTenantId) return;

    const config = getProductConfig(product);
    if (!config || !config.backendUrl || !config.secret) {
      console.warn(
        `[product-sync] Skipping ${product} sync for client ${clientId} — backend URL/secret not configured`,
      );
      return;
    }

    const res = await fetch(`${config.backendUrl}${config.path(externalTenantId)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.secret,
      },
      body: JSON.stringify(config.body(status, renewalDate)),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        `[product-sync] ${product} subscription ${status} failed for client ${clientId} (${res.status}): ${text.slice(0, 200)}`,
      );
    }
  } catch (e: any) {
    console.error(`[product-sync] Sync error for client ${clientId}:`, e?.message ?? e);
  }
}
