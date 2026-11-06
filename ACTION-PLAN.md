# SEO Action Plan — pixelatenest.com

Ordered by impact. Owner estimate assumes one developer who already knows the page generator.

## CRITICAL — fix now

| # | Action | Why | Effort |
|---|---|---|---|
| C1 | **Resolve the canonical conflict on 2,939 city product pages.** Choose one: (a) make each page unique enough and set `canonical` to itself; or (b) keep the generic canonical and **remove these URLs from the sitemap** and stop internal-linking them heavily. Recommended: (a) for top 30–50 cities, (b) for the rest. | Google will ignore the pages anyway; the sitemap says the opposite | M (generator change + rebuild) |
| C2 | **Fix ~2,775 broken internal links.** ~37 cities link to `lead-management-software-in-<city>.html` that does not exist. Generate the missing pages or remove the link from the sibling lists. Re-run the link checker after. | Wasted crawl budget, poor UX, quality signal | S |
| C3 | **Verify and correct the phone number** `+91-84069-12345` in schema, `llms.txt`, footer, and Google Business Profile. | Looks like a placeholder; NAP trust | XS |
| C4 | **Verify or remove `AggregateRating` 4.9/127** on the homepage. Only keep it if backed by visible, verifiable reviews on the page. | Manual-action risk for self-serving ratings | XS |

## HIGH — within 1 week

| # | Action | Effort |
|---|---|---|
| H1 | **Add real per-city differentiation** to city pages: 3–5 unique, factual elements per page (local industries served, real client or project, local pricing/response time, local FAQs). Target < 70% similarity between any two cities. Start with Patna, Muzaffarpur, Ranchi, Lucknow, Delhi, Noida, Kolkata, Mumbai, Bengaluru. | L, ongoing |
| H2 | **Set a publish gate for programmatic pages**: only publish/sitemap a city page that passes the uniqueness check. Pages that do not pass: `noindex` or leave out of sitemap. | M |
| H3 | **Rebuild the sitemap**: split into `sitemap-locations.xml`, `sitemap-states.xml`, `sitemap-core.xml` under a sitemap index; accurate `lastmod` on every URL (real content change date); drop `priority` and `changefreq`. | S |
| H4 | **Reduce FAQPage schema duplication.** Keep FAQ markup only on pages whose questions/answers are unique; remove from templated city pages. | S |
| H5 | **Add `width`/`height` + `loading="lazy"`** to images (hero image: `fetchpriority="high"`, no lazy). Replace repeated icon images with inline SVG or CSS. | M |
| H6 | **Run PageSpeed Insights / connect Search Console** on home, one state page, one city page. This audit could not measure CWV. | XS |
| H7 | **Brand consistency:** retire "Pixelate Sports Manage" wording on city academy pages in favour of the current product name. | S |

## MEDIUM — within 1 month

| # | Action |
|---|---|
| M1 | Build real content: 10–15 blog posts / case studies with named authors, dates, original numbers (target the "company in Patna/Muzaffarpur/Bihar" and product-comparison topics). Replace the 211-word `blog/post.html` template with real posts using `BlogPosting` schema. |
| M2 | Strengthen E-E-A-T: named team bios with credentials, client logos with permission, 3+ detailed case studies, link to GBP/LinkedIn/Clutch/GoodFirms profiles via `sameAs`. |
| M3 | Resolve same-name cities (Aurangabad, Udaipur): make H1 and intro text state-specific; add state to the remaining duplicate service descriptions. |
| M4 | Fix remaining one-offs: add `<title>` to `school-crm-muzaffarpur.html` and a description to `nagercoil/website-hosting-maintenance`; exactly one H1 on legal and blog pages; add `og:image` to 18 pages; move `dashboard-add-work.html` out of the public web root or protect it. |
| M5 | Reduce HTML weight on state pages (188 KB median): lazy-render long city lists; paginate. |
| M6 | Defer or async render-blocking scripts on service/legal pages. |
| M7 | Optimise internal links: replace long sibling-city link lists with contextual links to the nearest 5–8 cities and the parent state/hub. |

## LOW — backlog

| # | Action |
|---|---|
| L1 | Add CSP header; add `includeSubDomains; preload` to HSTS once all subdomains are HTTPS. |
| L2 | Collapse the `http://pixelatenest.com` → `https://pixelatenest.com` → `https://www…` redirect into one hop. |
| L3 | Decide one canonical form for extensionless vs `.html` URLs (`/services` vs `/services/index.html`) and enforce it via redirects. |
| L4 | Add `VideoObject` schema for video editing portfolio, `alternateName`/`legalName` for the LLP in Organization schema. |
| L5 | Add original data pieces (stats, benchmarks) for better AI-search citability. |

## Suggested 30-day order

1. Week 1: C3, C4, C2, H6 → then C1(b) quick containment (sitemap clean-up).
2. Week 2: H3, H4, H2 (publish gate), H5.
3. Weeks 3–4: H1 for the top 10 cities, M1 first 5 posts, M2, M4.
4. Re-audit after 4–6 weeks using Search Console index-coverage and CWV data.

## Success measures
- Search Console: "Duplicate, Google chose different canonical" falls from ~2,900 toward 0 for pages you want indexed.
- Indexed pages / submitted pages ratio per sitemap section rises.
- Broken internal links = 0 on re-crawl.
- Core Web Vitals: LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on home + sample city/state pages.
