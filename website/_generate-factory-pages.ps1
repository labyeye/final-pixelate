$schoolDir = "c:/Users/labhb/Desktop/projects/final-pixelate/website/school-crm-bihar"
$factoryDir = "c:/Users/labhb/Desktop/projects/final-pixelate/website/factory-management-bihar"

if (!(Test-Path $factoryDir)) {
  New-Item -ItemType Directory -Path $factoryDir | Out-Null
}

Copy-Item "$schoolDir/school-crm-common.css" "$factoryDir/factory-management-common.css" -Force

$files = Get-ChildItem $schoolDir -Filter "school-crm-*.html"

foreach ($f in $files) {
  $name = $f.Name.Replace("school-crm-", "factory-management-")
  $out = Join-Path $factoryDir $name
  $c = Get-Content $f.FullName -Raw

  $c = $c.Replace("school-crm-bihar/", "factory-management-bihar/")
  $c = $c.Replace("school-crm-common.css", "factory-management-common.css")
  $c = $c.Replace("School ERP UI Preview Carousel", "Factory Management UI Preview Carousel")
  $c = $c.Replace("../assets/school-crm-images/", "../assets/factory-management-images/")

  $c = $c.Replace("Smart School CRM & ERP Solution in", "Smart Factory Management Software in")
  $c = $c.Replace("School CRM in", "Factory Management Software in")
  $c = $c.Replace("School ERP Bihar", "Factory Management Software Bihar")
  $c = $c.Replace("School Management Software India", "Factory Management Software India")
  $c = $c.Replace('"name": "School CRM and ERP Solutions"', '"name": "Factory Management Software Solutions"')

  $c = $c.Replace("Automate admissions, fees, exams, and staff management with`n                      one platform built for modern schools across", "Automate production, inventory, quality checks, and workforce management with`n                      one platform built for modern factories across")
  $c = $c.Replace("<span class=""stat-number"" data-target=""50000"">0</span>", "<span class=""stat-number"" data-target=""120000"">0</span>")
  $c = $c.Replace("<div class=""stat-label"">Student Records Managed</div>", "<div class=""stat-label"">Production Records Managed</div>")
  $c = $c.Replace("<i class=""fa-solid fa-building-columns""></i> School CRM in", "<i class=""fa-solid fa-industry""></i> Factory Management Software in")
  $c = $c.Replace("Built for Fast, Accurate School Operations", "Built for Fast, Accurate Factory Operations")
  $c = $c.Replace("Pixelate Nest helps schools replace manual registers with a fully`n            connected School ERP Bihar workflow. From admissions and fee`n            collection to exams, attendance, and communication, your team gets a`n            single system that saves time, reduces errors, and gives management`n            real-time clarity for faster decisions.", "Pixelate Nest helps factories replace spreadsheets and manual tracking with a connected Factory Management Software Bihar workflow. From production planning and inventory to machine monitoring, quality checks, and workforce control, your team gets one system that reduces delays, improves output quality, and enables faster management decisions.")

  $c = $c.Replace("A modern School Management Software India stack designed for city,`n              district, and multi-branch school groups.", "A modern Factory Management Software India stack designed for small plants, mid-size factories, and multi-unit industrial operations.")
  $c = $c.Replace("Student Management System", "Production Planning & Work Orders")
  $c = $c.Replace("Complete student lifecycle handling: onboarding, profile history,`n                class transfer, TC workflow, document vault, and parent mapping.", "Plan production batches, create digital work orders, assign tasks by line, and track execution in real time from one control panel.")
  $c = $c.Replace("Teacher & Staff Management", "Workforce & Shift Management")
  $c = $c.Replace("Manage teacher schedules, payroll attributes, responsibilities,`n                leave records, and workload planning from one dashboard.", "Manage operator schedules, shift rosters, attendance, overtime, and role assignments with clear visibility for floor supervisors.")
  $c = $c.Replace("Fees & Accounting Module", "Procurement & Cost Control")
  $c = $c.Replace("Smart fee structures, due alerts, instant receipts, discount`n                rules, fine logic, and accounting-ready reporting.", "Track raw material purchases, vendor bills, consumption trends, and production cost against each batch for better margin control.")
  $c = $c.Replace("Exam & Marks Entry System", "Quality Control & Inspection")
  $c = $c.Replace("Define exam patterns, automate mark sheets, map grading rules,`n                and publish result analytics without spreadsheet errors.", "Run stage-wise quality checks, capture defect logs, enforce QC checklists, and publish quality analytics without manual errors.")
  $c = $c.Replace("Attendance Tracking", "Machine Utilization Tracking")
  $c = $c.Replace("Daily, period-wise, and biometric-ready attendance with instant`n                absentee notifications for parents and administrators.", "Track machine runtime, downtime, and utilization percentages with alerts for stoppages and maintenance windows.")
  $c = $c.Replace("Secure portals for Student, Teacher, Principal, Accountant, and`n                IT Admin with restricted access and activity logs.", "Secure portals for plant manager, production supervisor, quality lead, accountant, and system admin with audit trails.")
  $c = $c.Replace("Fully responsive panel experience for school owners, principals,`n                and office teams working from phones, tablets, and desktops.", "Responsive dashboard experience for factory owners, plant heads, and operations teams working from phones, tablets, and desktops.")

  $c = $c.Replace("Role-Based Dashboard Experience", "Role-Based Factory Dashboard Experience")
  $c = $c.Replace("One system, different views. Every stakeholder sees only what they`n              need.", "One system, different operational views. Every team sees only the modules they need.")
  $c = $c.Replace("Student Dashboard", "Plant Manager Dashboard")
  $c = $c.Replace("Personal profile, attendance summary, homework status, marks,`n                fee dues, and important school announcements in one place.", "Monitor production output, pending orders, machine efficiency, inventory status, and daily KPIs from a unified executive dashboard.")
  $c = $c.Replace("Teacher Panel", "Production Supervisor Panel")
  $c = $c.Replace("Class timetable, attendance entry, lesson plans, exams, and`n                parent communication tools for smooth classroom operations.", "Manage line-wise assignments, shift handovers, production delays, and team productivity with floor-level control tools.")
  $c = $c.Replace("Principal Overview", "Operations Head Overview")
  $c = $c.Replace("Real-time performance snapshots across academics, attendance,`n                finance, and staff productivity for strategic decision-making.", "Get real-time snapshots across production, quality, dispatch, and maintenance performance for strategic planning.")
  $c = $c.Replace("Accountant System", "Store & Procurement Panel")
  $c = $c.Replace("Fee reconciliation, ledger exports, pending payment tracking,`n                concession management, and month-end school finance reports.", "Track GRN entries, stock consumption, reorder levels, vendor invoices, and procurement cycles from one operations-friendly panel.")
  $c = $c.Replace("IT Admin Control", "System Admin Control")

  $c = $c.Replace("Clean interface patterns designed for faster adoption by school`n              teams.", "Clean interface patterns designed for fast adoption by production, store, and quality teams.")
  $c = $c.Replace("Business Benefits for School Leadership", "Business Benefits for Factory Leadership")
  $c = $c.Replace("Replace repetitive paperwork with digital workflows for`n                admissions, attendance, exams, and payroll coordination.", "Replace repetitive paperwork with digital workflows for production, quality, inventory, and dispatch coordination.")
  $c = $c.Replace("Better Parent Communication", "Better Team Coordination")
  $c = $c.Replace("Send instant updates for attendance, fees, homework, exam`n                results, and circulars to keep parent trust strong.", "Enable faster collaboration between planning, production, stores, and management with real-time operational visibility.")

  $c = $c.Replace("Transform Your School Management Today", "Transform Your Factory Operations Today")
  $c = $c.Replace("Launch a scalable School CRM in", "Launch scalable Factory Management Software in")
  $c = $c.Replace("with Pixelate Nest and give your team one complete operating`n              system.", "with Pixelate Nest and give your plant one connected operating system.")

  $c = $c.Replace("Is this School ERP suitable for small schools in", "Is this factory software suitable for small and mid-sized factories in")
  $c = $c.Replace("Yes. Our School ERP Bihar setup is modular, so small schools can`n                start with admissions, attendance, and fees first, then add more`n                modules as they grow.", "Yes. Our Factory Management Software Bihar setup is modular, so factories can start with production and inventory, then add quality, maintenance, and procurement modules as they grow.")
  $c = $c.Replace("Does it support multiple users and roles at the same time?", "Does it support multiple users and plant roles at the same time?")
  $c = $c.Replace("Is training provided for school staff?", "Is training provided for factory staff?")
  $c = $c.Replace("Can this integrate with existing school data?", "Can this integrate with existing factory data?")
  $c = $c.Replace("We support secure migration of existing student, fee, and exam`n                data from spreadsheets or legacy software into the new School`n                Management Software India stack.", "We support secure migration of existing production, inventory, and quality data from spreadsheets or legacy tools into the new Factory Management Software India stack.")
  $c = $c.Replace("Is it mobile-friendly for parents and teachers?", "Is it mobile-friendly for plant managers and supervisors?")

  Set-Content $out -Value $c -Encoding UTF8
}

Write-Output ("Generated factory files: " + (Get-ChildItem $factoryDir -Filter "factory-management-*.html").Count)

