import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/services';

// Cache for 5 minutes - ISR style
export const revalidate = 300;

export async function GET() {
	try {
		// Add CORS headers for public access
		const headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
			'Content-Type': 'application/json',
		};

		const collection = await getCollection('aboutTeam');
		const items = await collection
			.find()
			.sort({ order: 1 })
			.project({
				// Only return necessary fields for public consumption
				name: 1,
				designation: 1,
				imageUrl: 1,
				socialLinks: 1,
				order: 1,
				_id: 0, // Exclude _id from public API
			})
			.toArray();

		return NextResponse.json(items, { 
			status: 200,
			headers 
		});
	} catch (e: any) {
		console.error('Error fetching public about team:', e);
		return NextResponse.json(
			{ error: 'Failed to fetch team members' }, 
			{ 
				status: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
				}
			}
		);
	}
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		},
	});
}
