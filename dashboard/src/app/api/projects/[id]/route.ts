import { NextResponse } from 'next/server';
import * as svc from '@/lib/services';
import { getDb } from '@/lib/mongodb';
import { createProjectJourneyEvent, parseJourneyOccurredAt } from '@/lib/journey-helpers';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const item = await svc.findById('projects', id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await svc.updateById('projects', id, { ...body, updatedAt: new Date() });
    try {
      
      const col = await svc.getCollection('invoices');
      await col.updateMany({ projectId: String(id) }, { $set: { title: body.title, amount: body.amount, updatedAt: new Date() } });

      
      if (body.status === 'COMPLETED' || (updated && updated.status === 'COMPLETED')) {
        const existing = await col.findOne({ projectId: String(id) });
        if (!existing) {
          await col.insertOne({ projectId: String(id), title: body.title ?? updated?.title ?? '', amount: body.amount ?? updated?.amount ?? 0, clientId: body.clientId ?? updated?.clientId ?? null, createdAt: new Date() });
        }
      }
    } catch (e) {
      console.error('Failed to update/create linked invoices', e);
    }

    if (updated && (updated.clientId || updated.client)) {
      try {
        const db = await getDb();
        const projectId = String(updated._id ?? updated.id ?? id);
        const existing = await db.collection('journey_events').findOne({
          'metadata.projectId': projectId,
          type: 'project_update',
        });

        if (existing?._id) {
          const rawClientId = updated.clientId ?? updated.client;
          const serviceNames = Array.isArray(updated.services)
            ? updated.services
                .map((s: any) => s?.name)
                .filter((name: any) => typeof name === 'string' && name.trim().length > 0)
            : [];

          const descriptionParts: string[] = [
            `📁 Project: ${updated.title ?? existing.projectName ?? 'Project'}`,
          ];

          if (updated.amount != null) {
            descriptionParts.push(`💰 Amount: ₹${Number(updated.amount || 0).toLocaleString('en-IN')}`);
          }
          if (updated.deliveryDate) {
            descriptionParts.push(`📅 Delivery Date: ${updated.deliveryDate}`);
          }
          if (serviceNames.length > 0) {
            descriptionParts.push(`🧩 Services: ${serviceNames.join(', ')}`);
          }

          await db.collection('journey_events').updateOne(
            { _id: existing._id },
            {
              $set: {
                clientId: String(rawClientId),
                clientName: updated.clientName ?? existing.clientName ?? '',
                projectId,
                projectName: updated.title ?? existing.projectName ?? null,
                title: `Project Updated – ${updated.title ?? existing.projectName ?? 'Project'}`,
                description: descriptionParts.join('\n\n'),
                status: 'Completed',
                occurredAt: parseJourneyOccurredAt(updated.updatedAt, new Date()),
                updatedAt: new Date(),
                metadata: {
                  ...(existing.metadata ?? {}),
                  projectId,
                  eventMode: 'updated',
                  amount: updated.amount ?? null,
                  servicesCount: Array.isArray(updated.services) ? updated.services.length : 0,
                },
              },
            },
          );
        } else {
          await createProjectJourneyEvent(
            db,
            projectId,
            updated as Record<string, any>,
            'updated',
          );
        }
      } catch (journeyErr) {
        console.error('Failed to sync project update to journey:', journeyErr);
      }
    }

    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const ok = await svc.softDeleteById('projects', id);
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
