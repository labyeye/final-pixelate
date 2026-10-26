// Server-side map of every Pixelate Nest product backend the dashboard controls (used by the /api/product-* proxies).
// Each backend serves /api/crm/metrics and /api/crm/accounts, guarded by the x-api-key shared secret.
export type ProductId = "hrms" | "leads" | "play" | "gym" | "care";

type Cfg = { label: string; url?: string; secret?: string; envHint: string };

export function productConfig(id: string): Cfg | null {
  const e = process.env;
  switch (id) {
    case "hrms":
      return { label: "Nest HR", url: e.NESTHR_BACKEND_URL, secret: e.CRM_API_SECRET ?? e.NESTHR_STATS_SECRET, envHint: "NESTHR_BACKEND_URL and NESTHR_STATS_SECRET" };
    case "leads":
      return { label: "Nest Leads", url: e.NESTLEADS_BACKEND_URL, secret: e.NESTLEADS_CRM_SECRET ?? e.NESTLEADS_SECRET, envHint: "NESTLEADS_BACKEND_URL and NESTLEADS_CRM_SECRET" };
    case "play":
      return { label: "Nest Academy", url: e.NESTSPORTS_BACKEND_URL ?? e.NESTPLAY_BACKEND_URL, secret: e.NESTSPORTS_CRM_SECRET ?? e.NESTPLAY_CRM_SECRET ?? e.NESTSPORTS_STATS_SECRET, envHint: "NESTSPORTS_BACKEND_URL and NESTSPORTS_CRM_SECRET" };
    case "gym":
      return { label: "Nest Gym", url: e.NESTGYM_BACKEND_URL, secret: e.NESTGYM_CRM_SECRET, envHint: "NESTGYM_BACKEND_URL and NESTGYM_CRM_SECRET" };
    case "care":
      return { label: "Nest Doc", url: e.NESTCARE_BACKEND_URL, secret: e.NESTCARE_CRM_SECRET, envHint: "NESTCARE_BACKEND_URL and NESTCARE_CRM_SECRET" };
    default:
      return null;
  }
}

export const backendRoot = (url: string) => url.replace(/\/$/, "").replace(/\/api$/, "");
