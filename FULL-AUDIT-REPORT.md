# Full SEO Audit — pixelatenest.com

**Date:** 6 Nov 2026 · **Business type:** Software / digital agency (Muzaffarpur, Bihar) with SaaS products, and a very large programmatic location-page network

## How this audit was done (and its limits)

| Source | Coverage |
|---|---|
| Sitemap (`/sitemap.xml`) | 7,018 URLs parsed |
| Site source files (`final-pixelate/website`) | **All 7,027 HTML pages** analysed: title, description, H1, canonical, robots, schema, images, links, word count, duplication |
| Live site | 179 URLs fetched (all core pages + 50 random city pages + 25 random state pages), homepage, robots.txt, llms.txt, security headers, redirects, 404 behaviour |
| **Not measured** | Lighthouse / CrUX / Core Web Vitals field data, Google Search Console (indexation, impressions), backlinks, SERP rankings, screenshots. No Google API or DataForSEO credentials were available, so the Performance score is an estimate from page weight and markup, **not** a measurement. |

The live sample matched the source files, so source-level findings are treated as what Google sees. The crawl cap of 500 pages was not applied because the whole site is available locally.

## SEO Health Score: **65 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 62 | 13.6 |
| Content Quality | 23% | 45 | 10.4 |
| On-Page SEO | 20% | 80 | 16.0 |
| Schema / Structured Data | 10% | 78 | 7.8 |
| Performance (estimated) | 10% | 60 | 6.0 |
| AI Search Readiness | 10% | 80 | 8.0 |
| Images | 5% | 55 | 2.8 |
| **Total** | | | **64.6 ≈ 65** |

The foundation is good (HTTPS, fast server, clean metadata, rich schema, AI crawlers welcome). The score is held down by **how the 6,900 location/state pages are built**: near-identical content, and canonical tags that tell Google to ignore most of them.

## Site inventory (sitemap)

| Section | URLs |
|---|---|
| `/locations/` (city × service/product pages) | 6,311 |
| `/states/` | 603 |
| `/services/` | 36 |
| `/industry/` | 32 |
| `/products/` | 13 |
| `/pages/` | 9 |
| `/industries/` | 7 |
| `/legal/` | 5 |
| `/blog/` | 1 |
| Homepage | 1 |

Location pages = **90% of the site**. Per city there are ~7 service pages and ~10 product pages, across ~372 cities.

---

## Top 5 critical issues

1. **2,939 city product pages canonicalise to a generic product page.** Every `…/products/academy|attendance|fmcg|hotel|library|school|transport-management-software-in-<city>.html` page (372 each) and 335 lead-generation pages declare `rel=canonical` to e.g. `/products/academy-management-software.html`. Google will treat the city page as a duplicate and drop it from the index, yet **all of them are in the sitemap**. Conflicting signal, and 2,939 sitemap URLs that cannot rank. Only gym (372), clinic (372) and 20 lead pages are self-canonical.
2. **City pages are ~99% identical to each other.** After swapping out the city name, gym pages measured 99.8% similar, website-development pages 99.4%, digital-marketing pages 97.7% (sampled pairs). This is the pattern Google's scaled-content / doorway-page policies target. Risk is site-wide, not just for these pages.
3. **~2,775 broken internal links** (361 distinct targets). City pages link to `lead-management-software-in-<city>.html` for ~37 cities where that page does not exist, so every city in that cluster carries dead links. (A further 37 hits on `/states/bihar/mailto:…` were a false positive of the checker and are not counted.)
4. **FAQPage schema on 4,300+ pages with copy that is templated.** Google restricts FAQ rich results to government/health sites since 2023, so there is no visible benefit, and templated Q&A repeated across thousands of URLs adds to the duplication footprint.
5. **Placeholder-looking contact data in structured data and `llms.txt`.** Telephone is `+91-84069-12345` everywhere (ascending digits). If it is not the real number, this hurts local trust signals and NAP consistency; also the homepage declares `AggregateRating 4.9 / 127 reviews`. Google requires self-serving ratings to be verifiable; if they are not real, this is a manual-action risk.

## Top 5 quick wins

1. Remove the 2,939 city-product pages' cross-canonical **or** make them genuinely unique and self-canonical (see action plan). Until then, remove them from the sitemap.
2. Create (or stop linking to) the ~37 missing lead-management city pages.
3. Confirm the real phone number and the review count; fix or remove `AggregateRating`.
4. Trim sitemap: drop `priority`/`changefreq` (Google ignores them), add accurate `lastmod` to all URLs (currently on only 3,274 of 7,018 = 47%, and 996 are stale at 2026-06-30).
5. Add `width`/`height` to images (72% lack them, a layout-shift risk).

---

## 1. Technical SEO — 62/100

**Good**
- HTTPS everywhere; HSTS `max-age=63072000`. `http://` and non-`www` redirect to `https://www.` (2 hops: `http://pixelatenest.com` → `https://pixelatenest.com` → `https://www…`; could be 1).
- All 179 sampled URLs returned **200**, no redirects/errors. TTFB median **0.46 s**, p90 0.54 s, worst 1.68 s (Vercel edge, Brotli enabled).
- Unknown URLs return a real **404**, not a soft 404.
- `robots.txt` is valid: sitemap declared, only `/api/`, `/server/`, `/.vscode/` and two retired pages blocked. No JS/CSS blocking.
- Security headers present: `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`, HSTS.
- `<html lang>` and viewport present on all but 2 pages; Google tag on all but 2.
- No noindex on any money page. Only 6 pages are noindex (4 `/services/detailed/*`, `portfolio-details`, one root utility page), correct and intentionally excluded from the sitemap.

**Problems**
| # | Issue | Severity |
|---|---|---|
| T1 | 2,939 city-product pages cross-canonicalise to generic pages while listed in the sitemap | **Critical** |
| T2 | ~2,775 broken internal links (see above) | **High** |
| T3 | Sitemap `lastmod` missing on 53% of URLs; 996 still dated 2026-06-30; `priority` on 3,274 and `changefreq` on 374 URLs (ignored) | Medium |
| T4 | One sitemap file of 7,018 URLs (1.1 MB). It is under the 50,000/50 MB limit but should be split per section so Search Console reports index coverage by type | Medium |
| T5 | Same-name cities: Aurangabad (Bihar/Maharashtra) and Udaipur have the same slug in two states. Titles/descriptions are now state-qualified (fixed during this audit) but `h1` and body copy still may not be | Medium |
| T6 | No Content-Security-Policy header; HSTS lacks `includeSubDomains`/`preload` | Low |
| T7 | `/services` (no extension) returns 200 alongside `/services/index.html`, `/index.html` 301 → `/`. Make sure there is one canonical form per URL and links use it | Low |
| T8 | `school-crm-muzaffarpur.html` canonicalises to a different URL and is not in the sitemap; `dashboard-add-work.html` is an admin page sitting in the public web root | Low |

## 2. Content Quality — 45/100

- Median word counts are fine on paper: city products 1,392, city services 1,532, states 1,584, industry 1,849. But the text is almost entirely boilerplate (see similarity above). Substance per unique URL is closer to a few sentences.
- **Thin/unique content gap:** no city-specific facts (local clients, local pricing, local case studies, local regulations, travel/response times). The "Pixelate Nest runs SEO … for Diglipur businesses in tourism & travel" copy is a good start, but it is the only per-city variable.
- **Product naming inconsistency:** many location pages still say "Pixelate Sports Manage" while the product was rebranded NestAcademy; the product page URL is `academy-management-software`. Brand name should be one thing everywhere.
- **E-E-A-T:** Founded 2024, no named authors, one blog post (211 words) — `/blog/post.html` is a template page, not real content. No case studies with names/numbers on the site root sample, no client logos verifiable, no team bios beyond `team-leadership.html`. Thin on experience/expertise evidence.
- **Hub pages:** 5 city hub pages (`/locations/digital-marketing-patna.html`, `software-company-patna.html`, etc.) are the only real localised content. They sit at the root of `/locations/` but link into 6,000+ near-identical leaves.
- Legal pages exist (terms, privacy, cookies) ✓.

## 3. On-Page SEO — 80/100

After this session's clean-up (1,691 titles and 4,166 descriptions rewritten):
- **0 titles over 70 chars, 0 descriptions over 160** across all pages.
- Every page has a title and description except: `dashboard-add-work.html`, `school-crm-muzaffarpur.html` (no `<title>`), `nagercoil/website-hosting-maintenance` (no description).
- **H1:** exactly one per page on all sections except 1 city-service page, `legal/` (1 page), 1 root utility page and both blog pages (0 or multiple).
- **Duplicate titles:** 20 groups before this session's fix, all Aurangabad/Udaipur (the only same-name cities) plus `/services/detailed/*` (noindex). Aurangabad/Udaipur titles now carry the state. Some service-page *descriptions* for those two cities remain identical (no room to add the state within 160 chars).
- **Titles pattern** is consistent: `Service in City | Pixelate Nest`. Fine, but ~60% of keyword intent is "company/agency in city"; titles for `software-development` could lead with "Software Company in …".
- **Internal linking:** each page has plenty of links (none under 5 except 5 pages), but links are not contextual; they are mostly nav/footer/sibling-city lists. The broken ones are the issue (T2).
- Open Graph: missing `og:image` on 18 pages (5 legal, 5 services, 4 `/pages/`, 2 root, 1 blog, 1 city service). `twitter:card` missing on 2.

## 4. Schema / Structured Data — 78/100

| Type | Where | Comment |
|---|---|---|
| Organization + LocalBusiness + PostalAddress | Nearly all pages | OK. `LocalBusiness` on a non-storefront agency is acceptable; one address (Kala Bhawan, Akharaghat Road, Muzaffarpur) |
| BreadcrumbList | ~99% of pages | Good |
| Service | All service pages, state pages, city services | Good |
| SoftwareApplication | `/products/`, `/industry/` | Good; check `offers` price is real |
| FAQPage | 3,703 city products + 603 states + 8 services + others | No rich result expected (see critical #4) |
| AggregateRating (4.9 / 127) | Homepage | **Verify**, risky if unverifiable |
| WebSite (+ SearchAction?) | Homepage | Present |

Missing: `Review`/`Person` for team, `Article`/`BlogPosting` on blog, `VideoObject` (the business sells video editing), sameAs links to social profiles for all `Organization` blocks (confirm).

## 5. Performance — 60/100 (estimated, not measured)

- HTML weight is high: homepage **208 KB**, state pages median **188 KB**, city services 115 KB, city products 66 KB.
- Homepage has **126 `<img>`**; city product pages average **~46 images per page** (169,373 `<img>` tags over 3,703 pages), which suggests repeated icon/logo/marquee images that could be CSS/SVG sprites.
- **72% of images lack `width`/`height`** → layout shift (CLS) risk.
- Service pages load a median of 3 render-blocking scripts (no `defer`/`async`); legal pages 5.
- Good: Brotli, preload/preconnect hints on the homepage, WebP in use, server TTFB under 0.6 s.
- **Next step:** run PageSpeed Insights on home + one city page + one state page, and connect Search Console CWV report. Earlier Lighthouse files in the machine's temp folder (`lh-live.json`, `lh3-home.json`) suggest this has been looked at before; those results were not used here.

## 6. Images — 55/100

- Alt text: **0 images missing `alt`** out of ~330,000 tags ✓ (excellent). Quality of alt text was not reviewed.
- Missing dimensions (72%).
- Lazy-loading attribute is present on part of the images only; confirm above-the-fold hero is *not* lazy and has `fetchpriority="high"`.

## 7. AI Search Readiness (GEO) — 80/100

- `robots.txt` explicitly allows GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, Google-Extended, PerplexityBot, Applebot, Amazonbot ✓.
- `llms.txt` exists (3.7 KB) with company, services and product URLs ✓. It repeats the suspicious phone number; keep it consistent with the verified NAP.
- Content is structured with headings, FAQs, schema — good for passage-level citation. Weakness: no original data, no named experts, no statistics with sources, so AI engines have little unique to cite. The 6,000 duplicated pages dilute this.
- Brand entity: legal name (Kalahanu Tech Studios LLP) vs brand (Pixelate Nest) are both used; add `legalName`/`alternateName` in Organization schema and a clear About page.

## 8. Sitemap & Indexation Strategy

- Sitemap matches the site: 9 local pages are not in it (404, admin page, noindex pages, 1 unreferenced school CRM page) — all correct exclusions.
- With the canonical conflict (T1), expect Search Console to show "Duplicate, Google chose different canonical" for ~2,900 URLs and "Crawled — currently not indexed" for many others.
- 6,900 programmatic URLs on a 2-year-old domain with low authority: Google is unlikely to index them all. Quality gates recommended: only publish a city page when it has unique local content.

## 9. Local SEO (Muzaffarpur / Bihar)

- Strong hub pages for Patna and Muzaffarpur and multi-state coverage.
- Only **one** physical address; 372 city pages imply presence in cities where there is none. Present as "serving" (as the copy mostly does), not "located in".
- Not reviewed (no API access): Google Business Profile, citations, review profile. Verify the NAP on GBP matches site/schema; the placeholder-looking phone is the biggest risk.

---

## Appendix A — Sample metrics by section (all pages)

| Section | Pages | Median words | Self-canonical | FAQ schema | Median HTML size |
|---|---|---|---|---|---|
| locations / products | 3,703 | 1,392 | 764 | 3,703 | 66 KB |
| locations / services | 2,604 | 1,532 | 2,603 | 2,222 | 115 KB |
| states | 603 | 1,584 | 603 | 603 | 188 KB |
| services | 40 | 971 | 36 | 8 | 115 KB |
| industry | 32 | 1,849 | 32 | 13 | 107 KB |
| products | 13 | 1,376 | 13 | 6 | 85 KB |
| pages | 10 | 536 | 9 | 0 | 89 KB |
| industries | 7 | 2,095 | 7 | 0 | 98 KB |
| legal | 5 | 1,044 | 5 | 0 | 69 KB |
| blog | 2 | 211 | 1 | 0 | 42 KB |

## Appendix B — Changes made during this audit

Before the audit, the titles/descriptions pass shortened 1,691 titles (limit 70) and 4,166 descriptions (limit 160). That pass removed the state name from city pages, which created identical titles for the two same-name cities (Aurangabad, Udaipur: 38 pages). **These were re-qualified with the state (62 pages edited)**. A backup of all HTML from before the metadata pass is in the session scratchpad (`website-html-backup.zip`).
