/**
 * POST /api/journey/backfill
 *
 * One-time backfill: scans all non-DRAFT quotations that have no
 * journey event yet and creates one for each.
 * Safe to call multiple times — it skips quotations that already
 * have an event (checked via metadata.quotationId).
 */

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { createQuotationJourneyEvent } from '@/lib/journey-helpers';

export async function POST() {
  try {
    const db = await getDb();

    // 1. Fetch all non-DRAFT quotations
    const quotations = await db
      .collection('quotations')
      .find({ status: { $nin: ['DRAFT'] }, deleted: { $ne: true } })
      .toArray();

    let created = 0;
    let skipped = 0;

    for (const q of quotations) {
      const quotationId = String(q._id);

      // 2. Check if a journey event already exists for this quotation
      const exists = await db.collection('journey_events').findOne({
        'metadata.quotationId': quotationId,
      });

      if (exists) {
        skipped++;
        continue;
      }

      // 3. Create the journey event from the real DB document
      try {
        await createQuotationJourneyEvent(db, quotationId, q as Record<string, any>);
        created++;
      } catch (err) {
        console.error(`Failed to create journey event for quotation ${quotationId}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Backfill complete. Created: ${created}, Skipped (already existed): ${skipped}.`,
      created,
      skipped,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
