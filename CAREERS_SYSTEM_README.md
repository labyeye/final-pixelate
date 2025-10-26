# Careers Management System

Complete full-stack careers management system for Pixelate Nest with admin dashboard and public-facing careers page.

## Overview

This system allows you to:
- **Post job positions** from the dashboard
- **Manage applications** received for each job
- **Track application status** (pending, reviewing, shortlisted, rejected, hired)
- **Display active jobs** on the public website
- **Receive applications** through an integrated form

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CAREERS SYSTEM                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Dashboard (Admin)                     Website (Public)         │
│  ────────────────                      ───────────────          │
│                                                                  │
│  📝 Create Jobs                        📋 View Jobs             │
│  ✏️  Edit Jobs                         📝 Apply to Jobs         │
│  🗑️  Delete Jobs                       🔍 Filter by Dept       │
│  👥 View Applications                                           │
│  ✅ Update App Status                                           │
│                                                                  │
│                    ↓                            ↓                │
│                                                                  │
│              ┌───────────────────────────────┐                  │
│              │       API ENDPOINTS           │                  │
│              │                               │                  │
│              │  /api/careers                 │                  │
│              │  /api/careers/[id]            │                  │
│              │  /api/applications            │                  │
│              │  /api/applications/[id]       │                  │
│              │  /api/upload                  │                  │
│              └───────────────────────────────┘                  │
│                            ↓                                     │
│                                                                  │
│              ┌───────────────────────────────┐                  │
│              │       MONGODB DATABASE        │                  │
│              │                               │                  │
│              │  📊 careers collection        │                  │
│              │  📊 applications collection   │                  │
│              └───────────────────────────────┘                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Files Created

### Dashboard (Admin Interface)

#### 1. **Main Careers Page** - `/dashboard/src/app/(crm)/careers/page.tsx`
- View all job postings (active and closed)
- Stats cards showing:
  - Total jobs
  - Active postings
  - Closed postings
  - Total applications
- Filter jobs by status (all/active/closed)
- Quick actions: Edit, Delete, View Applications
- Responsive design

#### 2. **Add Job Page** - `/dashboard/src/app/(crm)/careers/add/page.tsx`
- Form to create new job postings
- Fields:
  - Job Title
  - Department (Development, Design, Video, Marketing, Management)
  - Location
  - Employment Type (Full-Time, Part-Time, Contract, Freelance, Internship)
  - Experience Required
  - Status (Active/Closed)
  - Job Description
  - Requirements (dynamic array)
  - Responsibilities (dynamic array)
  - Skills/Tags (dynamic array)
- Form validation
- Success/error handling

#### 3. **Edit Job Page** - `/dashboard/src/app/(crm)/careers/edit/[id]/page.tsx`
- Pre-filled form with existing job data
- Same fields as Add Job page
- Update existing job posting
- Form validation

#### 4. **Applications Page** - `/dashboard/src/app/(crm)/careers/[id]/applications/page.tsx`
- View all applications for a specific job
- Application stats:
  - Total applications
  - Pending review
  - Under review
  - Shortlisted
- Filter applications by status
- Application details:
  - Candidate name, email, phone
  - Application date
  - Cover letter
  - Resume download link
  - Portfolio link (if provided)
  - LinkedIn profile (if provided)
- Status management dropdown
- Send email to candidate button

### API Routes

#### 1. **Careers API** - `/dashboard/src/app/api/careers/route.ts`
- **GET** `/api/careers` - Fetch all job postings with application count
- **POST** `/api/careers` - Create new job posting

#### 2. **Single Career API** - `/dashboard/src/app/api/careers/[id]/route.ts`
- **GET** `/api/careers/[id]` - Fetch single job posting
- **PUT** `/api/careers/[id]` - Update job posting
- **DELETE** `/api/careers/[id]` - Delete job posting

#### 3. **Applications API** - `/dashboard/src/app/api/applications/route.ts`
- **GET** `/api/applications?jobId=[id]` - Fetch applications (optionally filtered by job)
- **POST** `/api/applications` - Create new application

#### 4. **Single Application API** - `/dashboard/src/app/api/applications/[id]/route.ts`
- **PATCH** `/api/applications/[id]` - Update application status
- **DELETE** `/api/applications/[id]` - Delete application

### Website (Public Interface)

#### Updated Careers Page - `/website/careers.html`
- Dynamically fetches and displays active jobs from API
- Department filter (All, Development, Design, Video, Marketing)
- Application modal with form:
  - Full Name
  - Email
  - Phone
  - Resume upload (PDF, DOC, DOCX)
  - Portfolio URL (optional)
  - LinkedIn URL (optional)
  - Cover Letter
- Real-time job filtering
- Loading states
- Error handling

## Database Schema

### `careers` Collection

```javascript
{
  _id: ObjectId,
  title: String,              // "Senior Full-Stack Developer"
  department: String,         // "development", "design", "video", "marketing", "management"
  location: String,           // "Remote", "Hybrid", "On-Site"
  type: String,               // "Full-Time", "Part-Time", "Contract", "Freelance", "Internship"
  experience: String,         // "3+ Years Experience"
  description: String,        // Full job description
  requirements: [String],     // ["5+ years React", "Node.js expert"]
  responsibilities: [String], // ["Lead development", "Mentor team"]
  tags: [String],             // ["React", "Node.js", "MongoDB"]
  status: String,             // "active" or "closed"
  createdAt: String,          // ISO date
  updatedAt: String           // ISO date
}
```

### `applications` Collection

```javascript
{
  _id: ObjectId,
  jobId: ObjectId,           // Reference to careers._id
  name: String,              // "John Doe"
  email: String,             // "john@example.com"
  phone: String,             // "+1234567890"
  resumeUrl: String,         // URL to uploaded resume
  portfolioUrl: String,      // Optional
  linkedinUrl: String,       // Optional
  coverLetter: String,       // Application cover letter
  status: String,            // "pending", "reviewing", "shortlisted", "rejected", "hired"
  appliedAt: String,         // ISO date
  updatedAt: String          // ISO date (when status changes)
}
```

## How to Use

### For Admins (Dashboard)

1. **Access the Careers Dashboard**
   - Navigate to `https://pixelatenest-crm.vercel.app/careers`
   - You'll see all job postings and stats

2. **Create a New Job Posting**
   - Click "Add Job Posting" button
   - Fill in all required fields
   - Add requirements, responsibilities, and tags
   - Set status to "Active" to make it visible on website
   - Click "Create Job Posting"

3. **Edit a Job Posting**
   - Click the edit icon (✏️) on any job card
   - Modify the fields you want to update
   - Click "Update Job Posting"

4. **View Applications**
   - Click the applications button (👥) on any job card
   - See all applications for that job
   - Filter by status (pending, reviewing, shortlisted)
   - Update application status using the dropdown
   - View candidate details and download resumes
   - Send email directly to candidates

5. **Delete a Job Posting**
   - Click the delete icon (🗑️) on any job card
   - Confirm deletion (this will not delete applications)

### For Job Seekers (Website)

1. **Browse Jobs**
   - Visit `https://www.pixelatenest.com/careers.html`
   - View all active job postings
   - Use department filters to narrow down

2. **Apply to a Job**
   - Click "Apply Now" on any job card
   - Fill in the application form
   - Upload your resume (PDF, DOC, or DOCX)
   - Add portfolio/LinkedIn links (optional)
   - Write a cover letter
   - Click "Submit Application"

## API Integration

The website connects to your dashboard API at `https://pixelatenest-crm.vercel.app/api`

### Endpoints Used by Website:

```javascript
// Fetch all active jobs
GET https://pixelatenest-crm.vercel.app/api/careers

// Submit application
POST https://pixelatenest-crm.vercel.app/api/applications
{
  jobId: "...",
  name: "...",
  email: "...",
  phone: "...",
  resumeUrl: "...",
  portfolioUrl: "...",
  linkedinUrl: "...",
  coverLetter: "..."
}

// Upload resume
POST https://pixelatenest-crm.vercel.app/api/upload
FormData with file
```

## Application Status Flow

```
Pending → Reviewing → Shortlisted → Hired
            ↓
         Rejected
```

- **Pending**: New application, not yet reviewed
- **Reviewing**: Application is being reviewed by team
- **Shortlisted**: Candidate moved to next stage
- **Rejected**: Application declined
- **Hired**: Candidate accepted the offer

## Features

### Dashboard Features:
✅ Create, edit, and delete job postings  
✅ View application statistics  
✅ Filter jobs by status  
✅ Track applications for each job  
✅ Update application status  
✅ View candidate details  
✅ Download resumes  
✅ Email candidates directly  
✅ Responsive design for mobile  

### Website Features:
✅ Dynamic job listings from database  
✅ Filter by department  
✅ Application modal with form validation  
✅ Resume file upload  
✅ Portfolio and LinkedIn integration  
✅ Real-time filtering  
✅ Loading states  
✅ Error handling  
✅ Mobile responsive  

## Next Steps

1. **Test the System**
   - Create a test job posting from the dashboard
   - Visit the careers page and verify it appears
   - Submit a test application
   - Check the applications page in dashboard

2. **Configure Email Notifications** (Optional)
   - Set up email service to notify admins when new applications arrive
   - Send confirmation emails to applicants

3. **Add More Features** (Future Enhancements)
   - Application scoring system
   - Interview scheduling
   - Email templates for candidate communication
   - Application analytics and reports
   - Export applications to CSV
   - Bulk status updates

## Troubleshooting

### Jobs not showing on website?
- Check if job status is set to "active"
- Verify API URL is correct in careers.html
- Check browser console for errors

### Applications not submitting?
- Verify resume file size is under 5MB
- Check if all required fields are filled
- Ensure upload API endpoint is working

### Can't access dashboard?
- Make sure you're logged in
- Check if careers route is accessible at `/careers`

## Support

For any issues or questions, contact the development team or refer to the main project documentation.

---

**Created for Pixelate Nest** - Full-stack careers management system
