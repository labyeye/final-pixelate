import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import os from 'os';

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

				// Define candidate upload paths and pick a safe one.
				// On some serverless hosts writing outside the allowed directory (or to a sibling folder)
				// may fail. We'll attempt a few sensible locations and fall back to the OS temp dir.

				const candidates = [
					// sibling website folder (used in local dev setups)
					join(process.cwd(), '..', 'website', 'assets', 'resumes'),
					// website under current working directory
					join(process.cwd(), 'website', 'assets', 'resumes'),
					// public folder (Next.js / static public)
					join(process.cwd(), 'public', 'assets', 'resumes'),
					// final fallback: system temp directory
					join(os.tmpdir(), 'pixelatenest', 'resumes'),
				];

				let uploadDir: string | null = null;

				for (const cand of candidates) {
					try {
						// Try to create the directory (recursive). If it succeeds, use it.
						await mkdir(cand, { recursive: true });
						// Double-check existsSync just in case
						if (existsSync(cand)) {
							uploadDir = cand;
							break;
						}
					} catch (err) {
						// Ignore and try next candidate
						// Some hosts will throw when attempting to write to protected paths.
						// We'll continue to the next candidate.
						console.warn('Could not use upload candidate', cand, err && (err as Error).message);
					}
				}

				if (!uploadDir) {
					// As a last resort, try os.tmpdir() without nested folders
					const fallback = join(os.tmpdir(), filename);
					try {
						await writeFile(fallback, buffer);
						const url = `file://${fallback}`;
						return NextResponse.json({ success: true, url, filename, message: 'File uploaded to temporary storage' }, { headers: corsHeaders });
					} catch (err) {
						console.error('Failed to write to fallback tmp file', err);
						return NextResponse.json({ error: 'Server cannot store uploaded files. Please configure external storage.' }, { status: 500, headers: corsHeaders });
					}
				}

				// Save file into chosen uploadDir
				const filePath = join(uploadDir, filename);
				await writeFile(filePath, buffer);

				// If we wrote into a public-facing path, return a relative URL that the website can use.
				// Prefer relative public paths when possible.
				let url: string;
				if (uploadDir.includes(join('public', 'assets')) || uploadDir.includes(join('website', 'assets'))) {
					// site can serve from ./assets/resumes/
					url = `./assets/resumes/${filename}`;
				} else if (uploadDir.includes(os.tmpdir())) {
					url = `file://${filePath}`;
				} else {
					url = `./assets/resumes/${filename}`;
				}

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
