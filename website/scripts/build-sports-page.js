// One-off script: derive products/sports-management-software.html from the
// attendance-payroll-software.html template, swapping in Sports Management
// copy/images while reusing the shared nav/footer/CSS/JS scaffolding.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "products", "attendance-payroll-software.html");
const DEST = path.join(ROOT, "products", "sports-management-software.html");

let content = fs.readFileSync(SRC, "utf8");

function replaceOnce(content, from, to, label) {
  const count = content.split(from).length - 1;
  if (count !== 1) {
    throw new Error(
      `Expected exactly 1 occurrence of "${label}" but found ${count}`,
    );
  }
  return content.split(from).join(to);
}

// ---------- HEAD: title / meta / schema ----------

content = replaceOnce(
  content,
  `<title>NestHR – Attendance & Payroll Software by Pixelate Nest</title>`,
  `<title>Pixelate Sports Manage – Sports Academy &amp; Club Management Software by Pixelate Nest</title>`,
  "title",
);

content = replaceOnce(
  content,
  `    <meta
      name="description"
      content="NestHR by Pixelate Nest is a smart attendance and payroll software for automated employee tracking, salary processing, leave management, and compliance reporting. Try NestHR today."
    />`,
  `    <meta
      name="description"
      content="Pixelate Sports Manage by Pixelate Nest is an all-in-one sports academy and club management software for student and player management, coach attendance, coaching plans, facility booking, and subscription billing. Try it today."
    />`,
  "meta description",
);

content = replaceOnce(
  content,
  `    <meta
      name="keywords"
      content="NestHR, Nest HR, NestHR software, NestHR attendance, NestHR payroll, NestHR Pixelate Nest, attendance payroll software India, HRMS software India"
    />`,
  `    <meta
      name="keywords"
      content="Pixelate Sports Manage, sports academy software, sports club management software, coaching academy software, student attendance sports academy, sports academy billing software, Pixelate Nest"
    />`,
  "meta keywords",
);

content = replaceOnce(
  content,
  `      href="https://www.pixelatenest.com/products/attendance-payroll-software.html"
    />
    <meta
      property="og:title"
      content="NestHR – Attendance & Payroll Software by Pixelate Nest"
    />
    <meta
      property="og:description"
      content="NestHR by Pixelate Nest automates attendance tracking and payroll processing. Manage employees, leaves, salaries, and compliance in one place."
    />`,
  `      href="https://www.pixelatenest.com/products/sports-management-software.html"
    />
    <meta
      property="og:title"
      content="Pixelate Sports Manage – Sports Academy & Club Management Software by Pixelate Nest"
    />
    <meta
      property="og:description"
      content="Pixelate Sports Manage by Pixelate Nest automates student attendance, coach management, coaching plans, facility bookings, and subscription billing for sports academies and clubs."
    />`,
  "og title/description",
);

content = replaceOnce(
  content,
  `      property="og:url"
      content="https://www.pixelatenest.com/products/attendance-payroll-software.html"
    />`,
  `      property="og:url"
      content="https://www.pixelatenest.com/products/sports-management-software.html"
    />`,
  "og:url",
);

content = replaceOnce(
  content,
  `    <meta
      name="twitter:title"
      content="NestHR – Attendance & Payroll Software by Pixelate Nest"
    />
    <meta
      name="twitter:description"
      content="NestHR by Pixelate Nest: automated attendance and payroll software for efficient HR and workforce management."
    />`,
  `    <meta
      name="twitter:title"
      content="Pixelate Sports Manage – Sports Academy & Club Management Software by Pixelate Nest"
    />
    <meta
      name="twitter:description"
      content="Pixelate Sports Manage by Pixelate Nest: all-in-one sports academy and club management software for students, coaches, and facilities."
    />`,
  "twitter title/description",
);

content = replaceOnce(
  content,
  `      href="../assets/images/products/attendance-details/attendance-person.webp"
      as="image"
    />`,
  `      href="../assets/images/products/sports-manage/dashboard.png"
      as="image"
    />`,
  "preload image",
);

content = replaceOnce(
  content,
  `            "name": "NestHR – Attendance & Payroll Software by Pixelate Nest",
            "item": "https://www.pixelatenest.com/products/attendance-payroll-software.html"`,
  `            "name": "Pixelate Sports Manage – Sports Academy & Club Management Software by Pixelate Nest",
            "item": "https://www.pixelatenest.com/products/sports-management-software.html"`,
  "breadcrumb schema",
);

content = replaceOnce(
  content,
  `    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "NestHR",
        "alternateName": "Nest HR",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Android, iOS",
        "description": "NestHR by Pixelate Nest is a cloud-based attendance and payroll software that automates employee tracking, leave management, salary processing, and statutory compliance for Indian businesses.",
        "url": "https://www.pixelatenest.com/products/attendance-payroll-software.html",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Pixelate Nest (Kalahanu Tech Studios LLP)",
          "url": "https://www.pixelatenest.com"
        }
      }
    </script>`,
  `    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Pixelate Sports Manage",
        "alternateName": "Sports Manage",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Android, iOS",
        "description": "Pixelate Sports Manage by Pixelate Nest is a cloud-based sports academy and club management software that automates student and coach attendance, facility bookings, coaching plans, and subscription billing.",
        "url": "https://www.pixelatenest.com/products/sports-management-software.html",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Pixelate Nest (Kalahanu Tech Studios LLP)",
          "url": "https://www.pixelatenest.com"
        }
      }
    </script>`,
  "SoftwareApplication schema",
);

content = replaceOnce(
  content,
  `    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is NestHR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NestHR is a cloud-based attendance and payroll software developed by Pixelate Nest. It automates employee attendance tracking, salary processing, leave management, and statutory compliance (PF, ESI, TDS) for startups, SMEs, and enterprises across India."
            }
          },
          {
            "@type": "Question",
            "name": "Who makes NestHR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NestHR is a product of Pixelate Nest, a technology company based in Muzaffarpur, Bihar, India, operating under Kalahanu Tech Studios LLP."
            }
          },
          {
            "@type": "Question",
            "name": "What does NestHR software do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NestHR handles attendance tracking (biometric, GPS, mobile), automated payroll processing, leave management, employee self-service, compliance reports (PF, ESI, TDS), department management, and WhatsApp notifications — all from one platform."
            }
          },
          {
            "@type": "Question",
            "name": "Is NestHR available on mobile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, NestHR has a mobile app for both Android and iOS, allowing employees to mark attendance, apply for leave, and view payslips from their phones."
            }
          },
          {
            "@type": "Question",
            "name": "How is NestHR different from other HR software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NestHR is built specifically for Indian businesses with built-in PF, ESI, and TDS compliance, WhatsApp OTP login, WhatsApp payslip delivery, biometric sync, and multi-branch support — all at an affordable price for SMEs."
            }
          }
        ]
      }
    </script>`,
  `    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Pixelate Sports Manage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pixelate Sports Manage is a cloud-based sports academy and club management software developed by Pixelate Nest. It automates student and player attendance, coach and staff management, facility bookings, coaching plans, and subscription billing for sports academies, clubs, and coaching institutes across India."
            }
          },
          {
            "@type": "Question",
            "name": "Who makes Pixelate Sports Manage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pixelate Sports Manage is a product of Pixelate Nest, a technology company based in Muzaffarpur, Bihar, India, operating under Kalahanu Tech Studios LLP."
            }
          },
          {
            "@type": "Question",
            "name": "What does Pixelate Sports Manage software do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pixelate Sports Manage handles student and player attendance, coach and employee attendance, student and employee management, facility and ground management, coaching plan management, subscription and fee billing, and dashboard reporting — all from one platform."
            }
          },
          {
            "@type": "Question",
            "name": "Is Pixelate Sports Manage available on mobile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Pixelate Sports Manage has a mobile app for both Android and iOS, allowing coaches and staff to mark attendance and parents/players to view schedules, plans, and payments from their phones."
            }
          },
          {
            "@type": "Question",
            "name": "How is Pixelate Sports Manage different from other sports academy software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pixelate Sports Manage is purpose-built for sports academies and clubs with coaching plan management, facility/ground booking, subscription-based billing, and combined student + staff attendance tracking — all at an affordable price for growing academies."
            }
          }
        ]
      }
    </script>`,
  "FAQPage schema",
);

// ---------- HERO ----------

content = replaceOnce(
  content,
  `        <section class="home-hero-v1 nh-hero-split">
          <div class="nh-hs-inner">
            <!-- LEFT: Text -->
            <div class="nh-hs-left slide-left">
              <span class="nh-hs-tag">NestHR – Attendance Management</span>
              <h1>
                NestHR: Smart Attendance<br />
                &amp; Payroll Software
              </h1>
              <p>
                NestHR by Pixelate Nest streamlines employee attendance tracking
                with real-time attendance management, GPS-based check-ins, face
                recognition attendance, shift scheduling, leave management, and
                workforce monitoring.
              </p>
              <a
                href="https://www.pixelatenest.com/pages/contact.html"
                class="nh-hs-cta"
                >Explore Now</a
              >
            </div>

            <!-- RIGHT: Person + floating cards -->
            <div class="nh-hs-right slide-right">
              <!-- Person image (cards & circle already inside the image) -->
              <img
                src="../assets/images/products/attendance-details/attendance-person.webp"
                alt="NestHR Employee"
                class="nh-hs-person"
                loading="eager"
                fetchpriority="high"
                width="720"
                height="680"
              />
            </div>
          </div>
        </section>`,
  `        <section class="home-hero-v1 nh-hero-split">
          <div class="nh-hs-inner">
            <!-- LEFT: Text -->
            <div class="nh-hs-left slide-left">
              <span class="nh-hs-tag">Pixelate Sports Manage – Academy &amp; Club Management</span>
              <h1>
                Pixelate Sports Manage: Smart<br />
                Sports Academy &amp; Club Management
              </h1>
              <p>
                Pixelate Sports Manage by Pixelate Nest brings student and
                player attendance, coach management, facility bookings,
                coaching plans, and subscription billing together in one
                easy-to-use dashboard for sports academies and clubs.
              </p>
              <a
                href="https://www.pixelatenest.com/pages/contact.html"
                class="nh-hs-cta"
                >Explore Now</a
              >
            </div>

            <!-- RIGHT: Dashboard preview -->
            <div class="nh-hs-right slide-right">
              <img
                src="../assets/images/products/sports-manage/dashboard.png"
                alt="Pixelate Sports Manage Dashboard"
                class="nh-hs-person"
                loading="eager"
                fetchpriority="high"
                width="720"
                height="680"
              />
            </div>
          </div>
        </section>`,
  "hero section",
);

// ---------- ABOUT ----------

content = replaceOnce(
  content,
  `          <div class="nh-about-row">
            <div class="nh-about-right slide-right">
              <!-- YouTube Short Card -->
              <div class="nh-yt-card" id="nhYtCard" onclick="nhOpenYtModal()">
                <!-- Replace with your actual Short thumbnail URL -->
                <img
                  class="nh-yt-thumb"
                  src="../assets/videos/cover/nesthr-intro.webp"
                  alt="NestHR Demo Short"
                />
                <div class="nh-yt-card-overlay"></div>
                <div class="nh-yt-card-label">
                  <div class="nh-yt-card-label-tag">Laxmi bothra</div>
                  <p>See how NestHR simplifies payroll in 60 seconds</p>
                </div>
              </div>
            </div>

            <!-- Modal -->
            <div
              class="nh-yt-modal-backdrop"
              id="nhYtModalBackdrop"
              onclick="nhCloseYtModal(event)"
            >
              <div class="nh-yt-modal" id="nhYtModal">
                <button
                  class="nh-yt-modal-close"
                  onclick="nhCloseYtModal(null, true)"
                  aria-label="Close"
                >
                  &times;
                </button>
                <iframe
                  id="nhYtIframe"
                  src=""
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <script>
              var NH_YT_ID = "hdFeg9A9qbc";
              function nhOpenYtModal() {
                document.getElementById("nhYtIframe").src =
                  "https://www.youtube.com/embed/" +
                  NH_YT_ID +
                  "?autoplay=1&rel=0";
                document
                  .getElementById("nhYtModalBackdrop")
                  .classList.add("active");
                document.body.style.overflow = "hidden";
              }
              function nhCloseYtModal(e, force) {
                if (
                  force ||
                  (e &&
                    e.target === document.getElementById("nhYtModalBackdrop"))
                ) {
                  document.getElementById("nhYtIframe").src = "";
                  document
                    .getElementById("nhYtModalBackdrop")
                    .classList.remove("active");
                  document.body.style.overflow = "";
                }
              }
              document.addEventListener("keydown", function (e) {
                if (e.key === "Escape") nhCloseYtModal(null, true);
              });
            </script>
            <div class="nh-about-left slide-left">
              <span class="nh-about-tag">About NestHR</span>
              <h2>One platform to manage your entire workforce</h2>
              <p>
                NestHR by Pixelate Nest is a modern cloud-based HRMS designed
                for startups, SMEs, schools, agencies, and enterprises. From
                real-time attendance tracking and automated payroll processing
                to leave management, compliance reporting, and employee
                self-service — NestHR brings your entire HR operation into one
                intelligent, easy-to-use platform.
              </p>
              <div class="nh-about-highlights">
                <div class="nh-about-highlight">
                  <div class="nh-hl-icon"><i class="fas fa-cloud"></i></div>
                  <div class="nh-hl-text">
                    <strong>Cloud-Based & Accessible Anywhere</strong>
                    <span
                      >Access your HR data from any device, any location — 24/7
                      uptime guaranteed.</span
                    >
                  </div>
                </div>
                <div class="nh-about-highlight">
                  <div class="nh-hl-icon"><i class="fas fa-bolt"></i></div>
                  <div class="nh-hl-text">
                    <strong>Fully Automated Workflows</strong>
                    <span
                      >From attendance capture to payslip generation —
                      everything runs on autopilot.</span
                    >
                  </div>
                </div>
                <div class="nh-about-highlight">
                  <div class="nh-hl-icon">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <div class="nh-hl-text">
                    <strong>Built for Indian Compliance</strong>
                    <span
                      >PF, ESI, TDS challans and registers generated in seconds,
                      ready to file.</span
                    >
                  </div>
                </div>
                <div class="nh-about-highlight">
                  <div class="nh-hl-icon">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="nh-hl-text">
                    <strong>Mobile-First Employee App</strong>
                    <span
                      >Employees mark attendance, apply for leave, and view
                      payslips from their phone.</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>`,
  `          <div class="nh-about-row">
            <div class="nh-about-right slide-right">
              <img
                src="../assets/images/products/sports-manage/facilities-manage.png"
                alt="Pixelate Sports Manage Facilities"
                style="width: 100%; border-radius: 16px"
              />
            </div>

            <div class="nh-about-left slide-left">
              <span class="nh-about-tag">About Pixelate Sports Manage</span>
              <h2>One platform to run your entire sports academy</h2>
              <p>
                Pixelate Sports Manage by Pixelate Nest is a modern cloud-based
                management system designed for sports academies, clubs,
                coaching institutes, and school sports programs. From student
                and player attendance to coach management, facility bookings,
                coaching plans, and subscription billing — Pixelate Sports
                Manage brings your entire academy operation into one
                intelligent, easy-to-use platform.
              </p>
              <div class="nh-about-highlights">
                <div class="nh-about-highlight">
                  <div class="nh-hl-icon"><i class="fas fa-cloud"></i></div>
                  <div class="nh-hl-text">
                    <strong>Cloud-Based & Accessible Anywhere</strong>
                    <span
                      >Access your academy data from any device, any location —
                      24/7 uptime guaranteed.</span
                    >
                  </div>
                </div>
                <div class="nh-about-highlight">
                  <div class="nh-hl-icon"><i class="fas fa-bolt"></i></div>
                  <div class="nh-hl-text">
                    <strong>Fully Automated Workflows</strong>
                    <span
                      >From attendance capture to subscription billing —
                      everything runs on autopilot.</span
                    >
                  </div>
                </div>
                <div class="nh-about-highlight">
                  <div class="nh-hl-icon">
                    <i class="fas fa-futbol"></i>
                  </div>
                  <div class="nh-hl-text">
                    <strong>Built for Academies & Clubs</strong>
                    <span
                      >Manage coaching plans, batches, facilities, and
                      subscriptions in one place.</span
                    >
                  </div>
                </div>
                <div class="nh-about-highlight">
                  <div class="nh-hl-icon">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="nh-hl-text">
                    <strong>Mobile-First Coach &amp; Parent App</strong>
                    <span
                      >Coaches mark attendance and parents track plans and
                      payments from their phone.</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>`,
  "about section",
);

// ---------- METHODS SECTION (replace wholesale via index slicing) ----------

{
  const startMarker = `<section class="nh-methods-section">`;
  const endMarker = `<!-- SECTION: Key Features -->`;
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error("Could not locate methods section boundaries");
  }

  const newMethods = `<section class="nh-methods-section">
        <div class="nh-container">
          <h2 class="nh-section-title slide-up">
            How <span class="nh-accent">Pixelate Sports Manage</span> works
          </h2>
          <p class="nh-section-sub slide-up" style="transition-delay: 0.1s">
            From onboarding students to collecting subscription payments,
            Pixelate Sports Manage keeps every part of your academy running
            smoothly in four simple steps.
          </p>
          <div class="nh-industries-grid">
            <div class="nh-industry-item slide-up" style="transition-delay: 0s">
              <i class="fas fa-user-plus"></i><span>1. Enroll Students &amp; Staff</span>
            </div>
            <div class="nh-industry-item slide-up" style="transition-delay: 0.1s">
              <i class="fas fa-fingerprint"></i><span>2. Track Attendance Daily</span>
            </div>
            <div class="nh-industry-item slide-up" style="transition-delay: 0.2s">
              <i class="fas fa-clipboard-list"></i><span>3. Assign Coaching Plans</span>
            </div>
            <div class="nh-industry-item slide-up" style="transition-delay: 0.3s">
              <i class="fas fa-wallet"></i><span>4. Auto-Collect Subscriptions</span>
            </div>
          </div>
        </div>
      </section>

      `;

  content =
    content.slice(0, startIdx) + newMethods + content.slice(endIdx);
}

// ---------- FEATURES SECTION ----------

content = replaceOnce(
  content,
  `      <section class="nh-features-section">
        <div class="nh-container">
          <h2 class="nh-section-title slide-up">
            Everything you need to
            <span class="nh-accent">run HR on autopilot</span>
          </h2>
          <p class="nh-section-sub slide-up" style="transition-delay: 0.1s">
            NestHR is packed with 9+ powerful modules built to eliminate manual
            HR work, reduce errors, and give your team more time to focus on
            what matters.
          </p>
          <div class="nh-features-grid">
            <div class="nh-feat-card slide-up" style="transition-delay: 0s">
              <div class="nh-feat-icon"><i class="fas fa-fingerprint"></i></div>
              <h3>Attendance Tracking</h3>
              <p>
                Biometric, mobile, and GPS-based attendance capture with
                real-time dashboards. Know who is present, late, or absent at a
                glance — across all locations.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.08s">
              <div class="nh-feat-icon">
                <i class="fas fa-money-check-alt"></i>
              </div>
              <h3>Payroll Processing</h3>
              <p>
                Process salaries for your entire team in one click.
                Auto-calculates PF, ESI, TDS, HRA, and overtime. Payslips are
                emailed directly to employees.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.16s">
              <div class="nh-feat-icon">
                <i class="fas fa-calendar-check"></i>
              </div>
              <h3>Leave Management</h3>
              <p>
                Employees apply online, managers approve in-app, and the system
                auto-adjusts payroll — no WhatsApp, no spreadsheets, no
                paperwork.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.24s">
              <div class="nh-feat-icon"><i class="fas fa-users"></i></div>
              <h3>Employee Records</h3>
              <p>
                Maintain a centralised digital employee directory with
                documents, roles, salary history, and department info — securely
                stored and always accessible.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.32s">
              <div class="nh-feat-icon"><i class="fas fa-chart-bar"></i></div>
              <h3>Performance Monitoring</h3>
              <p>
                Track productivity, set goals, and generate performance reports
                for individuals and teams. Build a data-driven culture of
                accountability.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.4s">
              <div class="nh-feat-icon">
                <i class="fas fa-file-invoice"></i>
              </div>
              <h3>Compliance Reports</h3>
              <p>
                Generate PF challans, ESI challans, Form 16, salary registers,
                and TDS reports in seconds. Stay audit-ready and legally
                compliant at all times.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.08s">
              <div class="nh-feat-icon"><i class="fas fa-user-plus"></i></div>
              <h3>Recruitment Module</h3>
              <p>
                Manage job postings, track applicants, and onboard new hires —
                all within NestHR. Cut your hiring time and reduce HR overhead
                significantly.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.16s">
              <div class="nh-feat-icon"><i class="fas fa-sitemap"></i></div>
              <h3>Department Management</h3>
              <p>
                Create departments, assign roles, manage reporting hierarchies,
                and get department-wise attendance and payroll breakdowns in one
                place.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.24s">
              <div class="nh-feat-icon"><i class="fas fa-chart-pie"></i></div>
              <h3>Reports &amp; Analytics</h3>
              <p>
                Get deep insights through visual dashboards and downloadable
                reports — attendance trends, payroll summaries, leave patterns,
                and more.
              </p>
            </div>
          </div>
        </div>
      </section>`,
  `      <section class="nh-features-section">
        <div class="nh-container">
          <h2 class="nh-section-title slide-up">
            Everything you need to
            <span class="nh-accent">run your sports academy</span>
          </h2>
          <p class="nh-section-sub slide-up" style="transition-delay: 0.1s">
            Pixelate Sports Manage is packed with 9 powerful modules built to
            eliminate manual academy admin work, reduce errors, and give your
            coaches more time to coach.
          </p>
          <div class="nh-features-grid">
            <div class="nh-feat-card slide-up" style="transition-delay: 0s">
              <div class="nh-feat-icon"><i class="fas fa-fingerprint"></i></div>
              <h3>Student Attendance</h3>
              <p>
                Track daily attendance for every student and player across
                batches, with real-time dashboards showing who's present, late,
                or absent.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.08s">
              <div class="nh-feat-icon">
                <i class="fas fa-clipboard-check"></i>
              </div>
              <h3>Employee &amp; Coach Attendance</h3>
              <p>
                Mark and monitor attendance for coaches, trainers, and support
                staff across all your academy locations.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.16s">
              <div class="nh-feat-icon">
                <i class="fas fa-user-friends"></i>
              </div>
              <h3>Student Management</h3>
              <p>
                Maintain a centralised digital profile for every student and
                player — documents, batch history, performance notes, and
                contact info.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.24s">
              <div class="nh-feat-icon"><i class="fas fa-users-cog"></i></div>
              <h3>Employee Management</h3>
              <p>
                Manage coach and staff records, roles, schedules, and
                assignments across departments and coaching batches.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.32s">
              <div class="nh-feat-icon"><i class="fas fa-map-marker-alt"></i></div>
              <h3>Facilities Management</h3>
              <p>
                Manage grounds, courts, pools, and equipment bookings so
                facilities are never double-booked or under-utilised.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.4s">
              <div class="nh-feat-icon">
                <i class="fas fa-clipboard-list"></i>
              </div>
              <h3>Coaching Plans Management</h3>
              <p>
                Create and assign coaching plans and batches, track progress,
                and adjust training schedules with ease.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.08s">
              <div class="nh-feat-icon"><i class="fas fa-wallet"></i></div>
              <h3>Subscriptions &amp; Fee Billing</h3>
              <p>
                Automate recurring subscription billing, track dues, and send
                payment reminders to parents and students automatically.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.16s">
              <div class="nh-feat-icon"><i class="fas fa-sitemap"></i></div>
              <h3>Batch &amp; Department Management</h3>
              <p>
                Organise students and staff into batches and departments and
                get batch-wise attendance and billing breakdowns in one place.
              </p>
            </div>
            <div class="nh-feat-card slide-up" style="transition-delay: 0.24s">
              <div class="nh-feat-icon"><i class="fas fa-chart-pie"></i></div>
              <h3>Reports &amp; Analytics</h3>
              <p>
                Get deep insights through visual dashboards and downloadable
                reports — attendance trends, subscription revenue, and coaching
                plan performance.
              </p>
            </div>
          </div>
        </div>
      </section>`,
  "features section",
);

// ---------- MOBILE APP SECTION ----------

content = replaceOnce(
  content,
  `          <p
            style="
              font-size: 1.7rem;
              font-weight: 600;
              color: #1e2d5a;
              max-width: 1260px;
              margin: 0 auto 32px;
            "
          >
            Stay connected with NestHR wherever you go with our mobile app for
            android and iOS
          </p>`,
  `          <p
            style="
              font-size: 1.7rem;
              font-weight: 600;
              color: #1e2d5a;
              max-width: 1260px;
              margin: 0 auto 32px;
            "
          >
            Stay connected with Pixelate Sports Manage wherever you go with our
            mobile app for android and iOS
          </p>`,
  "mobile app paragraph",
);

// ---------- INDUSTRIES SECTION ----------

content = replaceOnce(
  content,
  `          <h2 class="nh-section-title slide-up">
            Built for every industry,
            <span class="nh-accent">customised for yours</span>
          </h2>
          <p class="nh-section-sub slide-up" style="transition-delay: 0.1s">
            NestHR adapts to the unique workforce needs of 10+ industries — from
            fast-growing startups to large enterprises with multi-branch
            operations.
          </p>
          <div class="nh-industries-grid">
            <div class="nh-industry-item slide-up" style="transition-delay: 0s">
              <i class="fas fa-laptop-code"></i><span>IT &amp; Tech</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.07s"
            >
              <i class="fas fa-industry"></i><span>Manufacturing</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.14s"
            >
              <i class="fas fa-store"></i><span>Retail &amp; FMCG</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.21s"
            >
              <i class="fas fa-graduation-cap"></i><span>Education</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.28s"
            >
              <i class="fas fa-heartbeat"></i><span>Healthcare</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.07s"
            >
              <i class="fas fa-concierge-bell"></i><span>Hospitality</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.14s"
            >
              <i class="fas fa-truck"></i><span>Logistics</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.21s"
            >
              <i class="fas fa-hard-hat"></i><span>Construction</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.28s"
            >
              <i class="fas fa-seedling"></i><span>Startups</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.35s"
            >
              <i class="fas fa-building"></i><span>Corporates</span>
            </div>
          </div>`,
  `          <h2 class="nh-section-title slide-up">
            Built for every sport,
            <span class="nh-accent">customised for your academy</span>
          </h2>
          <p class="nh-section-sub slide-up" style="transition-delay: 0.1s">
            Pixelate Sports Manage adapts to the unique needs of 10+ types of
            sports academies and clubs — from single-sport academies to
            multi-branch, multi-sport clubs.
          </p>
          <div class="nh-industries-grid">
            <div class="nh-industry-item slide-up" style="transition-delay: 0s">
              <i class="fas fa-futbol"></i><span>Football Academies</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.07s"
            >
              <i class="fas fa-baseball-ball"></i><span>Cricket Academies</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.14s"
            >
              <i class="fas fa-swimmer"></i><span>Swimming Academies</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.21s"
            >
              <i class="fas fa-dumbbell"></i><span>Fitness &amp; Gyms</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.28s"
            >
              <i class="fas fa-fist-raised"></i><span>Martial Arts Schools</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.07s"
            >
              <i class="fas fa-table-tennis"></i><span>Badminton &amp; Tennis</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.14s"
            >
              <i class="fas fa-graduation-cap"></i><span>School Sports Programs</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.21s"
            >
              <i class="fas fa-chalkboard-teacher"></i><span>Coaching Institutes</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.28s"
            >
              <i class="fas fa-building"></i><span>Sports Complexes</span>
            </div>
            <div
              class="nh-industry-item slide-up"
              style="transition-delay: 0.35s"
            >
              <i class="fas fa-medal"></i><span>Multi-Sport Clubs</span>
            </div>
          </div>`,
  "industries section",
);

// ---------- WHY SECTION ----------

content = replaceOnce(
  content,
  `          <h2 class="nh-section-title slide-up" style="text-align: center">
            Why businesses choose <span class="nh-accent">NestHR</span>
          </h2>
          <p
            class="nh-section-sub slide-up"
            style="transition-delay: 0.1s; text-align: center"
          >
            More than just software — NestHR is a complete HR transformation for
            your business.
          </p>
          <div class="nh-why-grid">
            <div class="nh-why-card slide-up" style="transition-delay: 0s">
              <i class="fas fa-hourglass-half"></i>
              <strong>Saves Hours Every Day</strong>
              <p>
                Automate repetitive HR tasks and free your team for strategic
                work that actually moves the business forward.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.1s">
              <i class="fas fa-ban"></i>
              <strong>Zero Paperwork</strong>
              <p>
                All records, payslips, registers, and compliance documents are
                digital — searchable, secure, and always available.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.2s">
              <i class="fas fa-bullseye"></i>
              <strong>100% Accurate Payroll</strong>
              <p>
                Eliminate manual calculation errors. NestHR computes every
                deduction, allowance, and statutory contribution automatically.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.3s">
              <i class="fas fa-balance-scale"></i>
              <strong>Statutory Compliance</strong>
              <p>
                Stay legally compliant with auto-generated PF, ESI, and TDS
                reports — no consultant fees, no last-minute scrambles.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.1s">
              <i class="fas fa-user-cog"></i>
              <strong>Employee Self-Service</strong>
              <p>
                Employees manage their own attendance, leave requests, and
                payslip downloads — reducing HR queries by 70%.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.2s">
              <i class="fas fa-rocket"></i>
              <strong>Quick Onboarding</strong>
              <p>
                Get started in hours, not weeks. Import employee data, set up
                policies, and go live with minimal IT effort.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.3s">
              <i class="fas fa-code-branch"></i>
              <strong>Multi-Branch Ready</strong>
              <p>
                Manage attendance, payroll, and HR operations across multiple
                offices and locations from a single dashboard.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.4s">
              <i class="fas fa-headset"></i>
              <strong>Dedicated Support</strong>
              <p>
                Our team is always reachable via call, email, or chat — fast
                responses, real solutions, no bots.
              </p>
            </div>
          </div>`,
  `          <h2 class="nh-section-title slide-up" style="text-align: center">
            Why academies choose <span class="nh-accent">Pixelate Sports Manage</span>
          </h2>
          <p
            class="nh-section-sub slide-up"
            style="transition-delay: 0.1s; text-align: center"
          >
            More than just software — Pixelate Sports Manage is a complete
            operations upgrade for your academy or club.
          </p>
          <div class="nh-why-grid">
            <div class="nh-why-card slide-up" style="transition-delay: 0s">
              <i class="fas fa-hourglass-half"></i>
              <strong>Saves Hours Every Day</strong>
              <p>
                Automate repetitive admin tasks and free your coaches and staff
                for what matters — training and coaching.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.1s">
              <i class="fas fa-ban"></i>
              <strong>Zero Paperwork</strong>
              <p>
                All student records, plans, and payment history are digital —
                searchable, secure, and always available.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.2s">
              <i class="fas fa-bullseye"></i>
              <strong>100% Accurate Billing</strong>
              <p>
                Eliminate manual calculation errors. Pixelate Sports Manage
                computes every subscription, due, and reminder automatically.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.3s">
              <i class="fas fa-calendar-check"></i>
              <strong>Reliable Attendance Records</strong>
              <p>
                Keep accurate, always-available attendance history for every
                student, player, coach, and staff member.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.1s">
              <i class="fas fa-user-cog"></i>
              <strong>Coach &amp; Parent Self-Service</strong>
              <p>
                Coaches mark their own attendance and parents track plans and
                dues — reducing front-desk queries significantly.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.2s">
              <i class="fas fa-rocket"></i>
              <strong>Quick Onboarding</strong>
              <p>
                Get started in hours, not weeks. Import student and staff data,
                set up plans, and go live with minimal effort.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.3s">
              <i class="fas fa-code-branch"></i>
              <strong>Multi-Branch Ready</strong>
              <p>
                Manage attendance, billing, and operations across multiple
                academy branches from a single dashboard.
              </p>
            </div>
            <div class="nh-why-card slide-up" style="transition-delay: 0.4s">
              <i class="fas fa-headset"></i>
              <strong>Dedicated Support</strong>
              <p>
                Our team is always reachable via call, email, or chat — fast
                responses, real solutions, no bots.
              </p>
            </div>
          </div>`,
  "why section",
);

// ---------- CLIENTS / TESTIMONIALS SECTION ----------

content = replaceOnce(
  content,
  `          <h2 class="nh-section-title slide-up">
            Meet the brands that <span class="nh-accent">chose NestHR</span>
          </h2>
          <p class="nh-section-sub">
            Trusted by 20+ growing businesses across India — from startups to
            enterprises.
          </p>`,
  `          <h2 class="nh-section-title slide-up">
            Meet the academies that <span class="nh-accent">chose Pixelate Sports Manage</span>
          </h2>
          <p class="nh-section-sub">
            Trusted by growing sports academies and clubs across India.
          </p>`,
  "clients headline",
);

content = replaceOnce(
  content,
  `          <div class="nh-testimonials">
            <div class="nh-testi-card slide-up" style="transition-delay: 0s">
              <div class="nh-testi-stars">★★★★★</div>
              <p>
                "NestHR has completely transformed how we manage our team.
                Payroll that used to take two days now takes 10 minutes. Highly
                recommend!"
              </p>
              <div class="nh-testi-author">
                <strong>Ravi Sharma</strong><br />
                <span>HR Manager, TechCorp India</span>
              </div>
            </div>
            <div class="nh-testi-card slide-up" style="transition-delay: 0.15s">
              <div class="nh-testi-stars">★★★★★</div>
              <p>
                "The leave management and biometric sync features saved us hours
                every week. Our team loves the self-service portal."
              </p>
              <div class="nh-testi-author">
                <strong>Priya Nair</strong><br />
                <span>Operations Head, RetailZone</span>
              </div>
            </div>
            <div class="nh-testi-card slide-up" style="transition-delay: 0.3s">
              <div class="nh-testi-stars">★★★★★</div>
              <p>
                "Statutory compliance was always a headache. NestHR generates PF
                and ESI challans in seconds. It's a game-changer for us."
              </p>
              <div class="nh-testi-author">
                <strong>Ankit Verma</strong><br />
                <span>CEO, BuildRight Constructions</span>
              </div>
            </div>
          </div>`,
  `          <div class="nh-testimonials">
            <div class="nh-testi-card slide-up" style="transition-delay: 0s">
              <div class="nh-testi-stars">★★★★★</div>
              <p>
                "Pixelate Sports Manage has completely transformed how we run
                our academy. Attendance and subscription billing that used to
                take hours now take minutes. Highly recommend!"
              </p>
              <div class="nh-testi-author">
                <strong>Rohit Kumar</strong><br />
                <span>Director, Champions Football Academy</span>
              </div>
            </div>
            <div class="nh-testi-card slide-up" style="transition-delay: 0.15s">
              <div class="nh-testi-stars">★★★★★</div>
              <p>
                "The coaching plans and facility booking features saved us
                hours every week. Parents love the subscription tracking too."
              </p>
              <div class="nh-testi-author">
                <strong>Neha Singh</strong><br />
                <span>Operations Head, Ace Swimming Academy</span>
              </div>
            </div>
            <div class="nh-testi-card slide-up" style="transition-delay: 0.3s">
              <div class="nh-testi-stars">★★★★★</div>
              <p>
                "Managing multiple batches and coaches was always a headache.
                Pixelate Sports Manage brought it all onto one dashboard. A
                game-changer for our club."
              </p>
              <div class="nh-testi-author">
                <strong>Arjun Mehta</strong><br />
                <span>Founder, Victory Cricket Club</span>
              </div>
            </div>
          </div>`,
  "testimonials",
);

// ---------- STATS SECTION ----------

content = replaceOnce(
  content,
  `            <div class="nh-stat-item slide-up">
              <div>
                <span class="nh-stat-num" data-target="20">0</span
                ><span class="nh-stat-plus">+</span>
              </div>
              <div class="nh-stat-label">Customers</div>
            </div>
            <div class="nh-stat-item slide-up">
              <div>
                <span class="nh-stat-num" data-target="500">0</span
                ><span class="nh-stat-plus">+</span>
              </div>
              <div class="nh-stat-label">Employees Managed</div>
            </div>
            <div class="nh-stat-item slide-up">
              <div>
                <span class="nh-stat-num" data-target="10">0</span
                ><span class="nh-stat-plus">+</span>
              </div>
              <div class="nh-stat-label">Industries Served</div>
            </div>`,
  `            <div class="nh-stat-item slide-up">
              <div>
                <span class="nh-stat-num" data-target="15">0</span
                ><span class="nh-stat-plus">+</span>
              </div>
              <div class="nh-stat-label">Academies &amp; Clubs</div>
            </div>
            <div class="nh-stat-item slide-up">
              <div>
                <span class="nh-stat-num" data-target="2000">0</span
                ><span class="nh-stat-plus">+</span>
              </div>
              <div class="nh-stat-label">Students Managed</div>
            </div>
            <div class="nh-stat-item slide-up">
              <div>
                <span class="nh-stat-num" data-target="10">0</span
                ><span class="nh-stat-plus">+</span>
              </div>
              <div class="nh-stat-label">Sports Categories</div>
            </div>`,
  "stats section",
);

// ---------- CTA BANNER ----------

content = replaceOnce(
  content,
  `          <h2 class="slide-up">
            Discuss business needs, find out pricing or get a demo.<br />We
            would love to talk.
          </h2>`,
  `          <h2 class="slide-up">
            Discuss your academy's needs, find out pricing or get a demo.<br />We
            would love to talk.
          </h2>`,
  "cta banner",
);

fs.writeFileSync(DEST, content, "utf8");
console.log(
  "Wrote draft through cta-banner:",
  path.relative(ROOT, DEST),
);
