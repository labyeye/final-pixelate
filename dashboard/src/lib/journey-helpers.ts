/**
 * journey-helpers.ts
 *
 * Shared utility: given a fully-fetched quotation document and its client,
 * inserts one `journey_events` record.  Called after a quotation is saved
 * so the event always reflects the real persisted data.
 */

import { Db, ObjectId } from 'mongodb';

export function parseJourneyOccurredAt(
  value: unknown,
  fallback: Date = new Date(),
): Date {
  if (!value) return fallback;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? fallback : value;
  }

  const raw = String(value).trim();
  if (!raw) return fallback;

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const localDate = new Date(`${raw}T00:00:00`);
    return Number.isNaN(localDate.getTime()) ? fallback : localDate;
  }

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

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

export async function createOnboardingJourneyEvent(
  db: Db,
  onboardingId: string,
  onboardingDoc: Record<string, any>,
) {
  const rawClientId = onboardingDoc.clientId;
  if (!rawClientId) {
    return;
  }

  let clientDoc: any = null;
  try {
    clientDoc = await db.collection('clients').findOne({
      _id: new ObjectId(String(rawClientId)),
    });
  } catch {
    clientDoc = await db.collection('clients').findOne({ _id: rawClientId });
  }

  const clientName: string =
    onboardingDoc.clientName ??
    onboardingDoc.company ??
    clientDoc?.name ??
    clientDoc?.businessName ??
    '';

  const projectTitle =
    onboardingDoc.projectTitle ??
    onboardingDoc.projectType ??
    onboardingDoc.productType ??
    null;

  const descriptionParts: string[] = [];

  if (onboardingDoc.projectType) {
    descriptionParts.push(`🧩 Project Type: ${onboardingDoc.projectType}`);
  }
  if (onboardingDoc.productType) {
    descriptionParts.push(`🛠 Product Type: ${onboardingDoc.productType}`);
  }
  if (onboardingDoc.budget) {
    descriptionParts.push(`💰 Budget: ${onboardingDoc.budget}`);
  }
  if (onboardingDoc.startDate) {
    descriptionParts.push(`🚀 Start Date: ${onboardingDoc.startDate}`);
  }
  if (onboardingDoc.deadline) {
    descriptionParts.push(`📅 Deadline: ${onboardingDoc.deadline}`);
  }
  if (onboardingDoc.brief) {
    descriptionParts.push(`📝 Brief: ${onboardingDoc.brief}`);
  }

  await db.collection('journey_events').insertOne({
    clientId: String(rawClientId),
    clientName,
    projectId: onboardingDoc.projectId ? String(onboardingDoc.projectId) : null,
    projectName: projectTitle,
    type: 'onboarding',
    title: `Onboarding Completed${projectTitle ? ` – ${projectTitle}` : ''}`,
    description: descriptionParts.join('\n\n') || 'Client onboarding record created.',
    performedBy: 'System',
    status: 'Completed',
    fileUrl: null,
    linkUrl: `/onboarding`,
    occurredAt: parseJourneyOccurredAt(onboardingDoc.date),
    metadata: {
      onboardingId,
      projectTitle: onboardingDoc.projectTitle ?? null,
      projectType: onboardingDoc.projectType ?? null,
      productType: onboardingDoc.productType ?? null,
    },
    createdAt: new Date(),
  });
}

export async function createProjectJourneyEvent(
  db: Db,
  projectId: string,
  projectDoc: Record<string, any>,
  mode: 'created' | 'updated' = 'created',
) {
  const rawClientId = projectDoc.clientId ?? projectDoc.client;
  if (!rawClientId) {
    return;
  }

  let clientDoc: any = null;
  try {
    clientDoc = await db.collection('clients').findOne({
      _id: new ObjectId(String(rawClientId)),
    });
  } catch {
    clientDoc = await db.collection('clients').findOne({ _id: rawClientId });
  }

  const clientName: string =
    projectDoc.clientName ??
    clientDoc?.name ??
    clientDoc?.businessName ??
    '';

  const title = projectDoc.title ?? 'Project Created';
  const services = Array.isArray(projectDoc.services) ? projectDoc.services : [];
  const serviceNames = services
    .map((s: any) => s?.name)
    .filter((name: any) => typeof name === 'string' && name.trim().length > 0);

  const descriptionParts: string[] = [
    `📁 Project: ${title}`,
  ];

  if (projectDoc.amount != null) {
    descriptionParts.push(`💰 Amount: ₹${Number(projectDoc.amount || 0).toLocaleString('en-IN')}`);
  }
  if (projectDoc.deliveryDate) {
    descriptionParts.push(`📅 Delivery Date: ${projectDoc.deliveryDate}`);
  }
  if (serviceNames.length > 0) {
    descriptionParts.push(`🧩 Services: ${serviceNames.join(', ')}`);
  }

  await db.collection('journey_events').insertOne({
    clientId: String(rawClientId),
    clientName,
    projectId,
    projectName: title,
    type: 'project_update',
    title: `${mode === 'updated' ? 'Project Updated' : 'Project Created'} – ${title}`,
    description: descriptionParts.join('\n\n'),
    performedBy: 'System',
    status: 'Completed',
    fileUrl: null,
    linkUrl: `/projects`,
    occurredAt: parseJourneyOccurredAt(mode === 'updated' ? projectDoc.updatedAt : projectDoc.createdAt),
    metadata: {
      projectId,
      eventMode: mode,
      amount: projectDoc.amount ?? null,
      servicesCount: services.length,
    },
    createdAt: new Date(),
  });
}
