import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { syncClientSubscription } from "@/lib/product-sync";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

// Daily job: find invoices tied to a product-linked client whose
// subscription renewalDate has passed, and tell that product to cut off
// access. Run once a day via an external scheduler hitting this URL with
// ?secret=CRON_SECRET (or header x-cron-secret).
export async function GET(request: NextRequest) {
  const secret =
    request.headers.get("x-cron-secret") ||
    request.nextUrl.searchParams.get("secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const invoicesCol = await svc.getCollection("invoices");
    const clientsCol = await svc.getCollection("clients");

    const now = new Date();
    const expiredInvoices = await invoicesCol
      .find({
        renewalDate: { $ne: null, $lt: now.toISOString() },
        clientId: { $ne: null },
      })
      .toArray();

    const results: { clientId: string; status: string }[] = [];
    const processedClients = new Set<string>();

    for (const invoice of expiredInvoices) {
      const clientId = String(invoice.clientId);
      if (processedClients.has(clientId)) continue;
      processedClients.add(clientId);

      const client = await clientsCol.findOne({ _id: (invoice as any).clientId } as any);
      if (!client || !(client as any).product || (client as any).product === "none") continue;

      await syncClientSubscription(clientId, "deactivate");
      results.push({ clientId, status: "deactivated" });
    }

    return NextResponse.json({ success: true, processed: results.length, results });
  } catch (error: any) {
    console.error("deactivate-expired-subscriptions cron error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process expired subscriptions" },
      { status: 500 },
    );
  }
}
