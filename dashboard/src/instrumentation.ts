// Runs once when the Next.js server process boots (dev and prod, PM2 restarts
// included). Pings each connected product's backend so a misconfigured URL/
// secret or a down backend shows up immediately in the server logs instead of
// only surfacing later as a "Fetch Failed" toast somewhere in the CRM UI.
type ProductCheck = {
  label: string;
  backendUrl: string;
  secret: string;
};

async function checkProduct({ label, backendUrl, secret }: ProductCheck) {
  if (!backendUrl || !secret) {
    console.log(`⚠️  ${label} not configured — missing backend URL or secret`);
    return;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${backendUrl}/internal/stats`, {
      headers: { "X-Stats-Key": secret },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      console.log(`✅ ${label} Connected (${backendUrl})`);
    } else {
      console.log(`❌ ${label} responded with ${res.status} (${backendUrl})`);
    }
  } catch (err: any) {
    console.log(`❌ ${label} unreachable at ${backendUrl} — ${err?.message ?? err}`);
  }
}

export async function register() {
  // This module is also loaded for the edge runtime; only run the checks
  // once, from the actual Node.js server process.
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const products: ProductCheck[] = [
    {
      label: "Nest HR",
      backendUrl: process.env.NESTHR_BACKEND_URL ?? "",
      secret: process.env.NESTHR_STATS_SECRET ?? "",
    },
    {
      label: "Nest Academy",
      backendUrl: process.env.NESTPLAY_BACKEND_URL ?? "",
      secret: process.env.NESTPLAY_STATS_SECRET ?? "",
    },
    {
      label: "Nest Leads",
      backendUrl: process.env.NESTLEADS_BACKEND_URL ?? "",
      secret: process.env.NESTLEADS_SECRET ?? "",
    },
  ];

  // 30-day account deletions: purge whatever is due, hourly (also checked whenever the Accounts page is opened).
  if (process.env.DB_MANAGER_URI) {
    const purge = () => import("@/lib/account-delete").then((m) => m.purgeDue()).catch((e) => console.log("account purge:", e?.message ?? e));
    setTimeout(purge, 60_000).unref?.();
    setInterval(purge, 3_600_000).unref?.();
  }

  console.log("— Checking connected product backends —");
  await Promise.all(products.map(checkProduct));
}
