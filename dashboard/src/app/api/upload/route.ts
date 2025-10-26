import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

		// Validate file type
		if (!file.type.startsWith('image/')) {
			return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
		}

		// Validate file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
		}

		// Convert file to buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Generate unique filename
		const timestamp = Date.now();
		const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
		const filename = `${timestamp}-${originalName}`;

		// Define upload path (website/assets/about/)
		const uploadDir = join(process.cwd(), '..', 'website', 'assets', 'about');
		
		// Create directory if it doesn't exist
		if (!existsSync(uploadDir)) {
			await mkdir(uploadDir, { recursive: true });
		}

		// Save file
		const filePath = join(uploadDir, filename);
		await writeFile(filePath, buffer);

		// Return relative URL for the website
		const url = `./assets/about/${filename}`;

		return NextResponse.json({ 
			success: true, 
			url,
			filename,
			message: 'File uploaded successfully' 
		});

	} catch (error: any) {
		console.error('Upload error:', error);
		return NextResponse.json(
			{ error: error.message || 'Failed to upload file' },
			{ status: 500 }
		);
	}
}

// Configure for file uploads
export const config = {
	api: {
		bodyParser: false,
	},
};
