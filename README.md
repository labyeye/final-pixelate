# PixelateNest — Folder Structure Guide

## Current Structure

```
final-pixelate/
├── dashboard/                        # Next.js CRM dashboard (separate app)
│   ├── src/
│   ├── public/
│   ├── scripts/
│   ├── package.json
│   └── ...
│
├── website/                          # Main marketing website (static HTML)
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   ├── careers.html
│   ├── pricing.html
│   ├── blogs.html
│   ├── blog-post.html
│   ├── locations.html
│   ├── state.html
│   ├── technologies.html
│   ├── product.html
│   ├── photography.html
│   ├── portfolio-details.html
│   ├── team-leadership.html
│   ├── 404.html
│   ├── cookie-policy.html
│   ├── privacy-policy.html
│   ├── refund-policy.html
│   ├── terms-of-service.html
│   │
│   ├── webdev.html                   # ← service page sitting at root
│   ├── app-dev.html                  # ← service page sitting at root
│   ├── software-dev.html             # ← service page sitting at root
│   ├── video-ed.html                 # ← service page sitting at root
│   ├── hosting-maintenance.html      # ← service page sitting at root
│   ├── detailed-services-digital.html
│   ├── detailed-services-uiux.html
│   ├── detailed-services.html
│   ├── school-crm-muzaffarpur.html   # ← location page sitting at root
│   │
│   ├── industry-ecommerce.html       # ← industry pages mixed in root
│   ├── industry-education.html
│   ├── industry-logistics.html
│   ├── industry-manufacturing.html
│   ├── industry-realestate.html
│   ├── industry-travel.html
│   ├── industry-utilities.html
│   │
│   ├── styles.css                    # ← global + page CSS all in root
│   ├── about.css
│   ├── app-dev.css
│   ├── blog.css
│   ├── careers.css
│   ├── contact.css
│   ├── digital-marketing.css
│   ├── hosting-maintenance.css
│   ├── industry-styles.css
│   ├── locations.css
│   ├── photography-carousel.css
│   ├── pixy-chatbot.css
│   ├── portfolio-detail.css
│   ├── pricing.css
│   ├── product.css
│   ├── software-dev.css
│   ├── state.css
│   ├── uiux-branding.css
│   ├── video-ed.css
│   ├── video-ed-styles.css
│   ├── web-dev.css
│   │
│   ├── js/
│   │   ├── index.js
│   │   ├── pixy-chatbot.js
│   │   ├── form-handler.js
│   │   ├── activity-tracker.js
│   │   └── quick-contact-buttons.js
│   │
│   ├── assets/
│   │   ├── fonts/
│   │   ├── about/
│   │   ├── brands/
│   │   ├── cities/
│   │   ├── digital/
│   │   ├── homescreen/
│   │   ├── industries/
│   │   ├── services/
│   │   ├── software-features/
│   │   ├── product-software/
│   │   ├── factory-management-images/
│   │   ├── school-crm-images/
│   │   ├── resumes/
│   │   ├── product-common.css        # ← CSS inside assets
│   │   └── (loose images: logos, banners, etc.)
│   │
│   ├── products/                     # product pages in own folder
│   │   └── *.html (8 files)
│   │
│   ├── detailed-services/            # sub-service pages
│   │   ├── app-development/index.html
│   │   ├── web-development/index.html
│   │   ├── software-development/index.html
│   │   └── video-editing/index.html
│   │
│   ├── counter-billing-bihar/        # location landing pages
│   │   ├── counter-billing-common.css
│   │   └── *.html (20 city pages)
│   │
│   ├── factory-management-bihar/
│   │   ├── factory-management-common.css
│   │   └── *.html (20 city pages)
│   │
│   ├── school-crm-bihar/
│   │   ├── school-crm-common.css
│   │   └── *.html (20 city pages)
│   │
│   ├── sitemap-*.xml (9 sitemaps)
│   ├── robots.txt
│   ├── .htaccess
│   ├── purge.js / purgecss.config.js / cleanup-webp.js / convert-to-webp.js
│   ├── cities.json / services-data.json
│   ├── llms.txt
│   └── pixy-chatbot-snippet.html / pixy-test.html
```

---

## Recommended Professional Structure

```
final-pixelate/
├── dashboard/                              # (unchanged — already well structured)
│
├── website/
│   │
│   ├── index.html                          # Homepage
│   ├── 404.html
│   ├── robots.txt
│   ├── .htaccess
│   │
│   ├── css/
│   │   ├── global.css                      # base & shared styles (renamed styles.css)
│   │   ├── components/
│   │   │   ├── chatbot.css
│   │   │   └── carousel.css
│   │   └── pages/
│   │       ├── about.css
│   │       ├── contact.css
│   │       ├── careers.css
│   │       ├── pricing.css
│   │       ├── blog.css
│   │       ├── portfolio.css
│   │       ├── locations.css
│   │       ├── industries.css
│   │       ├── hosting.css
│   │       └── services/
│   │           ├── web-dev.css
│   │           ├── app-dev.css
│   │           ├── software-dev.css
│   │           ├── video-editing.css
│   │           ├── digital-marketing.css
│   │           └── uiux-branding.css
│   │
│   ├── js/
│   │   ├── main.js                         # renamed index.js
│   │   ├── chatbot.js
│   │   ├── form-handler.js
│   │   ├── activity-tracker.js
│   │   └── quick-contact-buttons.js
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logos/
│   │   │   ├── banners/
│   │   │   ├── about/
│   │   │   ├── brands/
│   │   │   ├── homescreen/
│   │   │   ├── industries/
│   │   │   ├── services/
│   │   │   ├── products/
│   │   │   └── portfolio/
│   │   ├── videos/
│   │   │   └── 404animation.mp4
│   │   ├── fonts/
│   │   │   ├── all.min.css
│   │   │   ├── fa-brands-400.woff2
│   │   │   └── fa-solid-900.woff2
│   │   ├── icons/
│   │   │   └── favicon.ico
│   │   └── docs/
│   │       └── resumes/
│   │
│   ├── pages/
│   │   ├── about.html
│   │   ├── contact.html
│   │   ├── careers.html
│   │   ├── pricing.html
│   │   ├── technologies.html
│   │   ├── team-leadership.html
│   │   ├── photography.html
│   │   ├── locations.html
│   │   ├── state.html
│   │   └── portfolio-details.html
│   │
│   ├── services/
│   │   ├── web-development.html
│   │   ├── app-development.html
│   │   ├── software-development.html
│   │   ├── video-editing.html
│   │   ├── hosting-maintenance.html
│   │   ├── digital-marketing.html
│   │   ├── uiux-branding.html
│   │   └── detailed/
│   │       ├── app-development/index.html
│   │       ├── web-development/index.html
│   │       ├── software-development/index.html
│   │       └── video-editing/index.html
│   │
│   ├── industries/
│   │   ├── ecommerce.html
│   │   ├── education.html
│   │   ├── logistics.html
│   │   ├── manufacturing.html
│   │   ├── real-estate.html
│   │   ├── travel.html
│   │   └── utilities.html
│   │
│   ├── products/
│   │   ├── counter-billing-software.html
│   │   ├── school-management-system.html
│   │   ├── hotel-management-software.html
│   │   └── ...
│   │
│   ├── blog/
│   │   ├── index.html                      # blog listing
│   │   └── post.html                       # blog post template
│   │
│   ├── legal/
│   │   ├── cookie-policy.html
│   │   ├── privacy-policy.html
│   │   ├── refund-policy.html
│   │   └── terms-of-service.html
│   │
│   ├── locations/
│   │   ├── counter-billing-bihar/
│   │   │   └── *.html (20 city pages)
│   │   ├── factory-management-bihar/
│   │   │   └── *.html (20 city pages)
│   │   └── school-crm-bihar/
│   │       └── *.html (20 city pages)
│   │
│   ├── sitemaps/
│   │   ├── sitemap-index.xml
│   │   ├── sitemap-main.xml
│   │   └── ...
│   │
│   ├── data/
│   │   ├── cities.json
│   │   └── services-data.json
│   │
│   └── tools/                              # build/dev scripts
│       ├── purge.js
│       ├── purgecss.config.js
│       ├── convert-to-webp.js
│       └── cleanup-webp.js
│
└── README.md
```
