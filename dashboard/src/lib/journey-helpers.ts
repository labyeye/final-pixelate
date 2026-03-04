/**
 * journey-helpers.ts
 *
 * Shared utility: given a fully-fetched quotation document and its client,
 * inserts one `journey_events` record.  Called after a quotation is saved
 * so the event always reflects the real persisted data.
 */

import { Db, ObjectId } from 'mongodb';

export async function createQuotationJourneyEvent(
  db: Db,
  quotationId: string,          // MongoDB _id string of the saved quotation
  quotationDoc: Record<string, any>, // The complete quotation as stored in DB
) {
  // ── 1. Fetch client by the quotation's clientId ─────────────────────────
  const rawClientId = quotationDoc.clientId;
  let clientDoc: any = null;
  try {
    clientDoc = await db.collection('clients').findOne({
      _id: new ObjectId(String(rawClientId)),
    });
  } catch {
    clientDoc = await db.collection('clients').findOne({ _id: rawClientId });
  }
  const clientName: string =
    clientDoc?.name ?? clientDoc?.businessName ?? '';
  const clientId: string = String(rawClientId);

  // ── 2. Map quotation status → journey status badge ───────────────────────
  const statusMap: Record<string, string> = {
    SENT:      'Sent',
    APPROVED:  'Approved',
    REJECTED:  'Rejected',
    CONVERTED: 'Completed',
    PENDING:   'Pending',
  };
  const journeyStatus = statusMap[quotationDoc.status] ?? 'Pending';

  // ── 3. Compute grand total from the real services array ──────────────────
  const services: any[]    = quotationDoc.services    ?? [];
  const timeline: any[]    = quotationDoc.timeline    ?? [];
  const modules:  any[]    = quotationDoc.modules     ?? [];
  const scope:    string[] = quotationDoc.scope       ?? [];
  const deliverables: string[] = quotationDoc.deliverables ?? [];

  const grandTotal: number = services.reduce(
    (sum, s) => sum + (Number(s.price) || 0) * (Number(s.qty) || 1),
    0,
  );

  // ── 4. Build the description from the real quotation fields ──────────────
  const parts: string[] = [];

  parts.push(`📄 Quote ID: ${quotationDoc.quoteId}`);

  if (quotationDoc.subtitle)
    parts.push(`📝 ${quotationDoc.subtitle}`);

  if (quotationDoc.objective)
    parts.push(`🎯 Objective: ${quotationDoc.objective}`);

  if (quotationDoc.purpose)
    parts.push(`💡 Purpose: ${quotationDoc.purpose}`);

  if (scope.length > 0)
    parts.push(`🔧 Scope of Work:\n${scope.map(s => `  • ${s}`).join('\n')}`);

  if (services.length > 0) {
    const lines = services.map(
      s =>
        `${s.serviceName} × ${s.qty ?? 1}` +
        (s.price ? ` @ ₹${Number(s.price).toLocaleString('en-IN')}` : ''),
    );
    parts.push(`💼 Services:\n${lines.map(l => `  • ${l}`).join('\n')}`);
    parts.push(`💰 Grand Total: ₹${grandTotal.toLocaleString('en-IN')}`);
  }

  if (timeline.length > 0) {
    const lines = timeline.map(t => `${t.phase} – ${t.duration}`);
    parts.push(`🗓 Timeline:\n${lines.map(l => `  • ${l}`).join('\n')}`);
  }

  if (modules.length > 0) {
    const lines = modules.map(
      m => `${m.moduleName}${m.description ? ` (${m.description})` : ''}`,
    );
    parts.push(`🧩 Modules:\n${lines.map(l => `  • ${l}`).join('\n')}`);
  }

  if (deliverables.length > 0)
    parts.push(`📦 Deliverables:\n${deliverables.map(d => `  • ${d}`).join('\n')}`);

  if (quotationDoc.paymentTerms)
    parts.push(`💳 Payment Terms: ${quotationDoc.paymentTerms}`);

  if (quotationDoc.notes)
    parts.push(`📌 Notes: ${quotationDoc.notes}`);

  // ── 5. Insert the journey event ──────────────────────────────────────────
  await db.collection('journey_events').insertOne({
    clientId,
    clientName,
    projectId:   null,
    projectName: quotationDoc.title ?? null,
    type:        'quotation',
    title:       `Quotation Sent – ${quotationDoc.title || quotationDoc.quoteId}`,
    description: parts.join('\n\n'),
    performedBy: 'System',
    status:      journeyStatus,
    fileUrl:     null,
    linkUrl:     `/quotations/${quotationId}/view`,
    occurredAt:  new Date(),
    metadata: {
      quotationId,
      quoteId:        quotationDoc.quoteId,
      grandTotal,
      servicesCount:  services.length,
      modulesCount:   modules.length,
      scopeCount:     scope.length,
      timelinePhases: timeline.length,
      quotationStatus: quotationDoc.status,
    },
    createdAt: new Date(),
  });
}
