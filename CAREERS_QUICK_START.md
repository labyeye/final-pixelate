# 🚀 Careers System - Quick Start Guide

## 5-Minute Setup & Testing

### Step 1: Access Dashboard (30 seconds)
```
1. Go to: https://pixelatenest-crm.vercel.app/careers
2. You'll see the Careers management page
3. Notice: "Careers" appears in the left sidebar with 👤+ icon
```

### Step 2: Create Your First Job (2 minutes)
```
1. Click "Add Job Posting" button
2. Fill in the form:
   - Job Title: "Senior Developer"
   - Department: Select "Development"
   - Location: "Remote"
   - Employment Type: "Full-Time"
   - Experience: "3+ Years"
   - Status: "Active" ← Important!
   - Description: Write a brief job description
   - Add at least one requirement
   - Add at least one responsibility
   - Add tags: "React", "Node.js"
3. Click "Create Job Posting"
4. ✅ Job created!
```

### Step 3: Verify on Website (1 minute)
```
1. Open: https://www.pixelatenest.com/careers.html
2. Your job should appear in the job listings
3. Test filter buttons (All, Development, Design, etc.)
4. Your job should show under "Development"
```

### Step 4: Test Application Flow (2 minutes)
```
1. On careers.html, click "Apply Now" on your job
2. Modal opens with application form
3. Fill in:
   - Name: "Test Applicant"
   - Email: your-email@example.com
   - Phone: "+1234567890"
   - Upload a test PDF as resume
   - Cover Letter: "I'm interested in this position"
4. Click "Submit Application"
5. ✅ Application submitted!
```

### Step 5: Review Application in Dashboard (1 minute)
```
1. Go back to dashboard: /careers
2. Your job card now shows "1" application
3. Click the application count button (👥 1)
4. See the application details
5. Try updating status: Select "Reviewing" from dropdown
6. ✅ Status updated!
```

---

## 🎯 Common Tasks

### Create a New Job
**Dashboard → Careers → Add Job Posting → Fill Form → Submit**

### Edit a Job
**Dashboard → Careers → Click ✏️ on job card → Edit → Update**

### Delete a Job
**Dashboard → Careers → Click 🗑️ on job card → Confirm**

### View Applications
**Dashboard → Careers → Click 👥 number on job card**

### Update Application Status
**Dashboard → Careers → [Job ID] → Applications → Select new status from dropdown**

### Filter Jobs by Department (Website)
**careers.html → Click department button (All, Development, Design, etc.)**

---

## 🔍 Where Everything Is

### Dashboard URLs:
- **Main Page**: `/careers`
- **Add Job**: `/careers/add`
- **Edit Job**: `/careers/edit/[job-id]`
- **Applications**: `/careers/[job-id]/applications`

### API Endpoints:
- **Jobs**: `/api/careers`
- **Single Job**: `/api/careers/[id]`
- **Applications**: `/api/applications`
- **Single Application**: `/api/applications/[id]`

### Website:
- **Careers Page**: `/careers.html`

---

## 📊 What You'll See

### Dashboard Stats:
- **Total Jobs**: All jobs (active + closed)
- **Active Postings**: Currently accepting applications
- **Closed Postings**: No longer accepting applications
- **Total Applications**: All applications received

### Application Stats (per job):
- **Total Applications**: All received
- **Pending Review**: New, not yet reviewed
- **Under Review**: Being evaluated
- **Shortlisted**: Moved to next stage

---

## 🎨 Job Departments

Choose from:
- **Development** (Web, Mobile, Backend, etc.)
- **Design** (UI/UX, Graphic Design)
- **Video** (Video Editing, Motion Graphics)
- **Marketing** (Digital Marketing, SEO, Social Media)
- **Management** (Project Manager, Team Lead)

---

## 💡 Pro Tips

1. **Set Status to "Active"** - Only active jobs appear on the website
2. **Use Tags** - Helps candidates find relevant positions (e.g., "React", "Remote", "Senior")
3. **Write Clear Descriptions** - First 200 characters show on job cards
4. **Update Application Status** - Keep candidates informed of their progress
5. **Filter Applications** - Use status filters to focus on specific stages

---

## 🐛 Troubleshooting

### Job not showing on website?
✅ **Solution**: Check if job status is "Active" in dashboard

### Can't submit application?
✅ **Solution**: Ensure resume file is under 5MB and is PDF/DOC/DOCX format

### Application count not updating?
✅ **Solution**: Refresh the careers dashboard page

### Modal not opening?
✅ **Solution**: Check browser console for errors, ensure JavaScript is enabled

---

## 📞 Support

For issues:
1. Check `CAREERS_SYSTEM_README.md` for detailed documentation
2. Check `CAREERS_IMPLEMENTATION_SUMMARY.md` for technical details
3. Contact your development team

---

## ✅ Success Checklist

After completing Quick Start:

- [ ] Dashboard is accessible at `/careers`
- [ ] Can create a new job posting
- [ ] Job appears on `careers.html`
- [ ] Can submit application from website
- [ ] Application appears in dashboard
- [ ] Can update application status
- [ ] Can edit job details
- [ ] Filters work on both dashboard and website

**All checked? You're ready to start hiring! 🎉**

---

**Created for Pixelate Nest** | Last Updated: 2024
