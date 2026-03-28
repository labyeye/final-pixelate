(async () => {})();
import { NextResponse } from 'next/server';
import * as svc from '@/lib/services';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { createProjectJourneyEvent } from '@/lib/journey-helpers';

export async function GET() {
	try {
		const col = await svc.getCollection('projects');
		const items = await col.find().toArray();
		
		// Fetch clients and team members for enrichment
		const clientCol = await svc.getCollection('clients');
		const usersCol = await svc.getCollection('users');
		const clients = await clientCol.find().toArray();
		const teamMembers = await usersCol.find({ jobRole: { $exists: true } }).toArray();
		
		// Enrich projects with client names and assignee names
		const enrichedItems = items.map((project) => {
			let enriched = { ...project };
			
			// Enrich client name
			if (project.clientId || project.client) {
				const clientId = project.clientId || project.client;
				const clientIdStr = String(clientId);
				const clientDoc = clients.find((c: any) => {
					const cId = String(c._id || c.id || '');
					return cId === clientIdStr;
				});
				if (clientDoc) {
					enriched.clientName = clientDoc.name;
				}
			}
			
			// Enrich assignee names
			if (Array.isArray(project.assignees) && project.assignees.length > 0) {
				enriched.assignees = project.assignees.map((assignee: any) => {
					const assigneeId = String(assignee.id ?? assignee);
					const teamMember = teamMembers.find((t: any) => {
						const tId = String(t._id || t.id || '');
						return tId === assigneeId;
					});
					return {
						...assignee,
						name: teamMember?.name || assignee.name || '—'
					};
				});
			}
			
			return enriched;
		});
		
		return NextResponse.json(enrichedItems);
	} catch (e: any) {
		console.error('GET /api/projects error:', e);
		return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const col = await svc.getCollection('projects');
		const toInsert = { ...body, createdAt: new Date() };
		const res = await col.insertOne(toInsert);
		const created = { ...toInsert, _id: res.insertedId };
		// create an invoice record so dashboard revenue reflects this project
		try {
			await svc.createInvoice({ projectId: String(res.insertedId), title: body.title, amount: body.amount, createdAt: new Date() });
		} catch (e) {
			console.error('Failed to create linked invoice', e);
		}

		try {
			const db = await getDb();
			const projectId = String(res.insertedId);
			const existing = await db.collection('journey_events').findOne({
				'metadata.projectId': projectId,
				type: 'project_update',
			});
			if (!existing) {
				await createProjectJourneyEvent(db, projectId, created as Record<string, any>, 'created');
			}
		} catch (journeyErr) {
			console.error('Failed to auto-create journey event for project:', journeyErr);
		}

		return NextResponse.json(created, { status: 201 });
	} catch (e: any) {
		return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
	}
}

