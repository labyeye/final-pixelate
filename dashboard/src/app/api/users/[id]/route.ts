import { NextResponse } from 'next/server';
import * as svc from '@/lib/services';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const item = await svc.findById('users', params.id);
		if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
		return NextResponse.json(item);
	} catch (e: any) {
		return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	try {
		const body = await request.json();
		const updated = await svc.updateById('users', params.id, body);
		return NextResponse.json(updated);
	} catch (e: any) {
		return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		const ok = await svc.deleteById('users', params.id);
		if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });

		// Cascade cleanup: remove this user from project assignees, unset lead assignments, and clear quotation author references
		try {
			const projectsCol = await svc.getCollection('projects');
			// Remove any assignee entries that reference this user id (string or ObjectId)
							// Find projects that reference this user as an assignee and remove those entries
							const affected = await projectsCol.find({ 'assignees.id': { $exists: true } }).toArray();
							for (const p of affected) {
								const before = Array.isArray(p.assignees) ? p.assignees : [];
								const after = before.filter((a: any) => String(a.id) !== String(params.id));
								if (after.length !== before.length) {
									await projectsCol.updateOne({ _id: p._id }, { $set: { assignees: after, updatedAt: new Date() } });
								}
							}

			const leadsCol = await svc.getCollection('leads');
			await leadsCol.updateMany(
				{ $or: [ { assignedTo: params.id }, { assignedTo: new ObjectId(params.id) } ] },
				{ $unset: { assignedTo: '', assignedToName: '' } }
			);

			const quotationsCol = await svc.getCollection('quotations');
			await quotationsCol.updateMany(
				{ authorId: { $in: [params.id, new ObjectId(params.id)] } },
				{ $unset: { authorId: '' } }
			);
		} catch (e) {
			console.error('Failed to cascade-clean references for deleted user', e);
		}

		return NextResponse.json({ success: true });
	} catch (e: any) {
		return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
	}
}

