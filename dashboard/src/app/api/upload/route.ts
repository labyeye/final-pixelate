import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400, headers: corsHeaders });
		}

		// Validate file type (allow PDFs and documents for resumes)
		const allowedTypes = ['image/', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
		const isValidType = allowedTypes.some(type => file.type.startsWith(type) || file.type === type);
		
		if (!isValidType) {
			return NextResponse.json({ error: 'File must be an image, PDF, or document' }, { status: 400, headers: corsHeaders });
		}

		// Validate file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400, headers: corsHeaders });
		}

		// Convert file to buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Generate unique filename
		const timestamp = Date.now();
		const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
		const filename = `${timestamp}-${originalName}`;

		// Define upload path (website/assets/resumes/)
		const uploadDir = join(process.cwd(), '..', 'website', 'assets', 'resumes');
		
		// Create directory if it doesn't exist
		if (!existsSync(uploadDir)) {
			await mkdir(uploadDir, { recursive: true });
		}

		// Save file
		const filePath = join(uploadDir, filename);
		await writeFile(filePath, buffer);

		// Return relative URL for the website
		const url = `./assets/resumes/${filename}`;

		return NextResponse.json({ 
			success: true, 
			url,
			filename,
			message: 'File uploaded successfully' 
		}, { headers: corsHeaders });

	} catch (error: any) {
		console.error('Upload error:', error);
		return NextResponse.json(
			{ error: error.message || 'Failed to upload file' },
			{ status: 500, headers: corsHeaders }
		);
	}
}

// Configure for file uploads
export const config = {
	api: {
		bodyParser: false,
	},
};
