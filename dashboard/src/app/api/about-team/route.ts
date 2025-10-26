import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/services';
import { ObjectId } from 'mongodb';

export async function GET() {
	try {
		const collection = await getCollection('aboutTeam');
		const items = await collection.find().sort({ order: 1 }).toArray();
		return NextResponse.json(items);
	} catch (e: any) {
		console.error('Error fetching about team:', e);
		return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const collection = await getCollection('aboutTeam');
		
		const newMember = {
			name: body.name,
			designation: body.designation,
			phone: body.phone || '',
			imageUrl: body.imageUrl || '',
			socialLinks: {
				instagram: body.socialLinks?.instagram || '',
				linkedin: body.socialLinks?.linkedin || '',
				facebook: body.socialLinks?.facebook || ''
			},
			order: body.order || 0,
			createdAt: new Date()
		};

		const result = await collection.insertOne(newMember);
		return NextResponse.json({ ...newMember, _id: result.insertedId }, { status: 201 });
	} catch (e: any) {
		console.error('Error creating about team member:', e);
		return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
	}
}

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const { _id, ...updateData } = body;

		if (!_id) {
			return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
		}

		const collection = await getCollection('aboutTeam');
		
		const updateFields = {
			name: updateData.name,
			designation: updateData.designation,
			phone: updateData.phone || '',
			imageUrl: updateData.imageUrl || '',
			socialLinks: {
				instagram: updateData.socialLinks?.instagram || '',
				linkedin: updateData.socialLinks?.linkedin || '',
				facebook: updateData.socialLinks?.facebook || ''
			},
			order: updateData.order || 0,
			updatedAt: new Date()
		};

		const result = await collection.updateOne(
			{ _id: new ObjectId(_id) },
			{ $set: updateFields }
		);

		if (result.matchedCount === 0) {
			return NextResponse.json({ error: 'Member not found' }, { status: 404 });
		}

		return NextResponse.json({ _id, ...updateFields });
	} catch (e: any) {
		console.error('Error updating about team member:', e);
		return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
		}

		const collection = await getCollection('aboutTeam');
		const result = await collection.deleteOne({ _id: new ObjectId(id) });

		if (result.deletedCount === 0) {
			return NextResponse.json({ error: 'Member not found' }, { status: 404 });
		}

		return NextResponse.json({ success: true, deletedId: id });
	} catch (e: any) {
		console.error('Error deleting about team member:', e);
		return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
	}
}
