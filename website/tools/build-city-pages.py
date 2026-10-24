"""Generate states/<state>/<city>.html for every city in locations/<state>/ from states/bihar/muzaffarpur.html.

Run from the website dir:  python tools/build-city-pages.py
Only creates new files (never overwrites muzaffarpur.html). Re-running regenerates them.
"""
import hashlib, html, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://www.pixelatenest.com"
T = open(os.path.join(ROOT, "states/bihar/muzaffarpur.html"), encoding="utf-8", newline="").read()
assert "\r\n" not in T

LANG = {
    "andaman-and-nicobar-islands": "Hindi, Bengali, Tamil and English", "andhra-pradesh": "Telugu and English",
    "arunachal-pradesh": "Hindi and English", "assam": "Assamese, Bengali and English", "bihar": "Hindi, Maithili and Bhojpuri",
    "chhattisgarh": "Hindi and Chhattisgarhi", "delhi": "Hindi, Punjabi and English", "goa": "Konkani, Marathi and English",
    "gujarat": "Gujarati and Hindi", "haryana": "Hindi and Haryanvi", "himachal-pradesh": "Hindi and Pahari",
    "jammu-and-kashmir": "Urdu, Kashmiri, Dogri and Hindi", "jharkhand": "Hindi and Santali", "karnataka": "Kannada and English",
    "kerala": "Malayalam and English", "ladakh": "Ladakhi, Hindi and English", "madhya-pradesh": "Hindi and English",
    "maharashtra": "Marathi, Hindi and English", "manipur": "Meitei and English", "meghalaya": "Khasi, Garo and English",
    "mizoram": "Mizo and English", "nagaland": "Nagamese and English", "odisha": "Odia and English",
    "puducherry": "Tamil, Telugu and English", "punjab": "Punjabi and Hindi", "rajasthan": "Hindi and Rajasthani",
    "sikkim": "Nepali, Hindi and English", "tamil-nadu": "Tamil and English", "telangana": "Telugu, Urdu and English",
    "tripura": "Bengali, Kokborok and English", "uttar-pradesh": "Hindi and Urdu", "uttarakhand": "Hindi, Garhwali and Kumaoni",
    "west-bengal": "Bengali and Hindi",
}
SERVICES = [
    ("web-development", "Website Development", "fa-globe"),
    ("app-development", "Mobile App Development", "fa-mobile-screen"),
    ("software-development", "Software Development", "fa-laptop-code"),
    ("digital-marketing", "Digital Marketing & SEO", "fa-bullhorn"),
    ("video-editing", "Video Production", "fa-video"),
    ("uiux-branding", "UI/UX Design & Branding", "fa-pen-ruler"),
    ("hosting-maintenance", "Hosting & Maintenance", "fa-server"),
]


def nice(slug):
    return " ".join(w if w == "and" else w.capitalize() for w in slug.split("-"))


def pick(key, options):
    return options[int(hashlib.md5(key.encode()).hexdigest(), 16) % len(options)]


def esc(x):
    return html.escape(x, quote=False)


def flex(phrase):
    return re.compile(r"\s+".join(re.escape(w) for w in phrase.split()))


def sub(s, old, new):
    r, n = flex(old).subn(lambda m: new, s)
    assert n, "phrase not found: " + old[:60]
    return r


def span(s, start, end):
    a = s.index(start)
    return a, s.index(end, a) + len(end)


def balanced(s, i):
    """index just after the </div> that closes the <div opening at s[i]."""
    depth = 0
    for m in re.finditer(r"<div\b|</div>", s[i:]):
        depth += 1 if m.group().startswith("<div") else -1
        if depth == 0:
            return i + m.end()
    raise ValueError


def walk(o, f, skip=("address", "geo")):
    if isinstance(o, dict):
        return {k: (v if k in skip else walk(v, f, skip)) for k, v in o.items()}
    if isinstance(o, list):
        return [walk(v, f, skip) for v in o]
    return f(o) if isinstance(o, str) else o


def build(state, city, cities):
    S, C = nice(state), nice(city)
    lang = LANG[state]
    url = f"{SITE}/states/{state}/{city}.html"
    key = state + city
    near = [c for c in cities if c != city]
    i = cities.index(city)
    near = [cities[(i + k) % len(cities)] for k in range(1, min(8, len(cities) - 1) + 1)]
    s = T

    # ---------- head ----------
    title = f"Website Development Agency in {C}, {S} | Pixelate Nest"
    desc = (f"Website development agency serving {C}, {S} — custom websites, apps, software and SEO "
            f"delivered online by Pixelate Nest. Free consultation!")
    s = re.sub(r"<title>.*?</title>", f"<title>{esc(title)}</title>", s, count=1, flags=re.S)

    def meta(s, attr, name, val):
        return re.sub(r'(<meta\s+%s="%s"\s+content=")[^"]*(")' % (attr, re.escape(name)),
                      lambda m: m.group(1) + esc(val) + m.group(2), s, count=1)
    s = meta(s, "name", "description", desc)
    s = meta(s, "property", "og:title", title)
    s = meta(s, "property", "og:description", desc)
    s = meta(s, "name", "twitter:title", title)
    s = meta(s, "name", "twitter:description", desc)
    s = s.replace(f"{SITE}/states/bihar/muzaffarpur.html", url)

    def jsonld(m):
        d = json.loads(m.group(1))
        raw = json.dumps(d)
        if '"FAQPage"' in raw:
            d["mainEntity"] = [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                               for q, a in faqs(C, S, lang, key)]
        elif '"BreadcrumbList"' in raw:
            d["itemListElement"] = [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
                {"@type": "ListItem", "position": 2, "name": "Locations", "item": SITE + "/pages/locations.html"},
                {"@type": "ListItem", "position": 3, "name": C, "item": url},
            ]
        elif '"@graph"' in raw:
            g = d["@graph"]
            g[0]["description"] = (f"Pixelate Nest is a Muzaffarpur, Bihar-based website, software and digital marketing "
                                   f"company serving businesses across India, including {C}, {S}.")
            lb = g[1]
            lb["@id"] = url + "#localbusiness"
            lb["url"] = url
            lb["name"] = f"Pixelate Nest — Website Development Agency for {C}"
            lb["alternateName"] = ["Pixelate Nest"]
            lb["slogan"] = f"Website Development Agency in {C}"
            lb["keywords"] = (f"website development agency in {C.lower()}, web development {C.lower()}, "
                              f"software company {C.lower()}, app development {C.lower()}, seo {C.lower()}")
            lb["areaServed"] = [{"@type": "City", "name": C}, {"@type": "AdministrativeArea", "name": S}]
            d["@graph"] = [g[0]] + [walk(x, lambda t: t.replace("Muzaffarpur", C)) for x in g[1:]]
            d["@graph"][1]["areaServed"] = lb["areaServed"]
        else:  # Service block
            d = walk(d, lambda t: t.replace("Muzaffarpur", C).replace("Bihar", S))
        return ('<script type="application/ld+json">\n      ' + json.dumps(d, ensure_ascii=False, indent=2).replace("\n", "\n      ")
                + "\n    </script>")
    head_end = s.index("</head>")
    head = re.sub(r'<script type="application/ld\+json">(.*?)</script>', jsonld, s[:head_end], flags=re.S)
    s = head + s[head_end:]

    # ---------- hero + pillars ----------
    a, b = span(s, '<section class="home-hero-v1">', '<section class="svc-carousel-section"')
    reg = s[a:b]
    reg = sub(reg, "Muzaffarpur's leading website company, software company, content creation agency and digital marketing company in Bihar.",
              f"A website development agency serving {C}, {S} — websites, software, apps and digital marketing for local businesses.")
    reg = sub(reg, "Muzaffarpur, Bihar", f"{C}, {S}")
    reg = reg.replace("Muzaffarpur", C).replace("Bihar", S)
    s = s[:a] + reg + s[b:]

    # ---------- services + industries ----------
    a, b = span(s, '<section class="svc-carousel-section"', '<section class="tech-stack-showcase"')
    reg = s[a:b]
    reg = sub(reg, "delivered by a team based on Akharaghat Road", "delivered online by our Muzaffarpur-based team")
    reg = sub(reg, "Muzaffarpur and North Bihar", f"{C} and nearby areas")
    reg = sub(reg, "litchi, sweets, garments and more", "shops, brands and wholesalers")
    reg = sub(reg, "for Muzaffarpur travel agents", f"for {C} travel agents")
    reg = reg.replace("Muzaffarpur-based team", "@@HQ@@").replace("Muzaffarpur", C).replace("@@HQ@@", "Muzaffarpur-based team")
    s = s[:a] + reg + s[b:]

    # ---------- longform ----------
    lead = pick(key + "lead", [
        f"Pixelate Nest builds websites, software and marketing for businesses in {C}, {S}. We are based in Muzaffarpur, Bihar, "
        f"and work with {C} clients online — discovery over a call, progress on WhatsApp, and delivery you can review at every step.",
        f"Looking for a website development agency in {C}? Pixelate Nest designs, builds and markets websites and software for "
        f"{C} businesses. Our team is in Muzaffarpur, Bihar, and we serve {S} clients through calls, WhatsApp and screen-sharing.",
        f"{C} businesses don't need a big-city agency with big-city prices. Pixelate Nest, based in Muzaffarpur, Bihar, builds "
        f"fast websites, custom software and marketing for clients in {C} and across {S}.",
    ])
    web1 = pick(key + "web", [
        f"Every website we build for a {C} business is mobile-first, fast on a 4G connection and ready for Google. We handle design, "
        f"development, hosting setup and SSL, and add call and WhatsApp buttons so enquiries reach you directly.",
        f"Most of your {C} customers will find you on a phone. So we design mobile-first, tune Core Web Vitals, and add click-to-call "
        f"and WhatsApp so a visitor becomes an enquiry in one tap.",
    ])

    def row(n, rev, img, label, ico, h3, ps, tags):
        return f'''
          <div class="story-row{' reverse' if rev else ''} mzp-reveal">
            <div class="story-media">
              <img src="../../assets/images/services/{img}" alt="{esc(h3)}" loading="lazy" width="600" height="480" />
              <span class="story-num">{n} · {label}</span>
            </div>
            <div class="story-text">
              <h3><span class="pill-ico" aria-hidden="true"><i class="fa-solid {ico}"></i></span> {esc(h3)}</h3>
              {''.join(f"<p>{p}</p>" for p in ps)}
              <div class="story-meta">{''.join(f"<span>{esc(t)}</span>" for t in tags)}</div>
            </div>
          </div>'''
    longform = f'''<section class="mzp-longform" aria-labelledby="mzp-longform-h2">
        <div class="container">
          <div class="intro mzp-reveal">
            <span class="eyebrow">How We Work</span>
            <h2 id="mzp-longform-h2" style="margin-bottom: 10px; font-size: clamp(2rem, 4vw, 5rem); color: var(--primary-900); line-height: 1.2;">
              Website Development for {esc(C)} Businesses
            </h2>
            <p class="lead">{esc(lead)}</p>
          </div>
{row("01", False, "webdev.webp", "Web", "fa-globe", f"Websites built for {C} customers", [esc(web1),
     f"Business sites, e-commerce stores, school and coaching websites, portfolio and real-estate sites — we pick the stack (WordPress, Shopify, React) that fits your budget and growth."],
     ["Business sites", "E-commerce", "Landing pages", "Web apps"])}
{row("02", True, "appdev.webp", "Software", "fa-laptop-code", "Custom software, ERP and mobile apps", [
     f"When off-the-shelf tools don't fit, we build billing, inventory, school or clinic management software and Android/iOS apps around how your {C} business actually runs.",
     "The same engineers who build it support it after launch — no hand-offs to a stranger."],
     ["ERP", "Billing & GST", "Mobile apps", "Dashboards"])}
{row("03", False, "digital.webp", "Marketing", "fa-chart-line", "Marketing that brings customers, not just clicks", [
     f"We run local SEO and Google Business Profile optimisation, Google and Meta ads, and content for {C} businesses that want calls, walk-ins or online orders.",
     "We report on leads and cost per lead — and we don't promise a #1 ranking, because no honest agency can."],
     ["Local SEO", "Google Ads", "Meta Ads", "Content"])}
        </div>
      </section>'''
    a, b = span(s, '<section class="mzp-longform"', "</section>")
    s = s[:a] + longform + s[b:]

    # ---------- services + nearby cities (replaces mzp-areas; keeps its reveal script) ----------
    def card(d, ico, cat, h3, p, href=None):
        t = f'<a href="{href}">{esc(h3)}</a>' if href else esc(h3)
        return f'''
            <article class="area mzp-reveal" data-delay="{d}" role="listitem">
              <div class="area-head"><span class="area-ico" aria-hidden="true"><i class="fa-solid {ico}"></i></span><span class="area-cat">{esc(cat)}</span></div>
              <h3>{t}</h3>
              <p>{esc(p)}</p>
            </article>'''
    svc_cards = "".join(card(k % 3 + 1, ico, "Service", f"{label} in {C}",
                             f"{label} for {C} businesses — explore pricing, process and FAQs.",
                             f"{SITE}/locations/{state}/{city}/services/{slug}.html")
                        for k, (slug, label, ico) in enumerate(SERVICES))
    near_cards = "".join(card(k % 3 + 1, "fa-location-dot", "Nearby city", f"Website Development in {nice(c)}",
                              f"We also build websites, software and marketing for businesses in {nice(c)}, {S}.",
                              f"{SITE}/states/{state}/{c}.html") for k, c in enumerate(near))
    heading = 'style="margin-bottom: 10px; font-size: clamp(2rem, 4vw, 5rem); color: var(--primary-900); line-height: 1.2;"'
    a, b = span(s, '<section class="mzp-areas"', "</section>")
    script = re.search(r"<script>.*?</script>", s[a:b], flags=re.S).group()
    areas = f'''<section class="mzp-areas" aria-labelledby="mzp-areas-h2">
        <div class="container">
          <div class="head mzp-reveal">
            <span class="eyebrow">What We Offer</span>
            <h2 id="mzp-areas-h2" {heading}>Our Services in {esc(C)}</h2>
            <p class="lead">One team for your website, software, apps and marketing in {esc(C)} — delivered online, with content planned in {esc(lang)} where your customers need it.</p>
          </div>
          <div class="area-list" role="list">{svc_cards}
          </div>
          <div class="head mzp-reveal" style="margin-top: 56px">
            <span class="eyebrow">Also in {esc(S)}</span>
            <h2 {heading}>Nearby Cities We Serve</h2>
          </div>
          <div class="area-list" role="list">{near_cards}
          </div>
        </div>
        {script}
      </section>'''
    s = s[:a] + areas + s[b:]

    # ---------- FAQ ----------
    ra = s.index('<div class="faq-right">')
    inner_end = balanced(s, ra) - len("</div>")
    first = s.index('<div class="faq-list">', ra)
    tpl = s[first:balanced(s, first)]
    tail = s[balanced(s, s.rindex('<div class="faq-list">', first, inner_end)):inner_end]
    blocks = []
    for q, ans in faqs(C, S, lang, key):
        blk = re.sub(r'(<h3 class="p-text-02">).*?(</h3>)', lambda m: m.group(1) + esc(q) + m.group(2), tpl, count=1, flags=re.S)
        blk = re.sub(r'(<p class="p-text-03 text-white-60 faq-answer">).*?(</p>)', lambda m: m.group(1) + esc(ans) + m.group(2), blk, count=1, flags=re.S)
        blocks.append(blk)
    s = s[:first] + "\n            ".join(blocks) + tail + s[inner_end:]

    # ---------- contact section (HQ stays truthful) ----------
    a, b = span(s, '<section class="mzp-visit"', "</section>")
    v = s[a:b]
    v = re.sub(r'(<h2 id="mzp-visit-h2">).*?(</h2>)', lambda m: m.group(1) + f"Talk to Our Team — Serving {esc(C)} from Muzaffarpur" + m.group(2), v, count=1, flags=re.S)
    v = re.sub(r"(<div class=\"head\">.*?<p>).*?(</p>)",
               lambda m: m.group(1) + f"We work with {esc(C)} clients online — call, WhatsApp or email us and we'll set up a free discovery call. Our headquarters are in Muzaffarpur, Bihar, if you are ever nearby." + m.group(2), v, count=1, flags=re.S)
    s = s[:a] + v + s[b:]

    # ---------- sanity ----------
    body = s[s.index("<body"):]
    for bad in ("Mithanpura", "Brahmpura", "Aghoria", "Saraiyaganj", "Club Road", "Bairiya"):
        assert bad not in s, (city, bad)
    assert body.count("Akharaghat") <= 5, (city, body.count("Akharaghat"))
    return s


def faqs(C, S, lang, key):
    return [
        (f"Which website development agency should I choose in {C}?",
         f"Pixelate Nest is a Muzaffarpur, Bihar-based agency that builds websites, software and apps for businesses in {C}, {S}. "
         f"You get one team for design, development, SEO and support, and you can see progress at every step."),
        (f"How much does website development cost in {C}?",
         "A basic business website starts from ₹15,000, e-commerce stores from ₹35,000 and custom web applications from ₹50,000. "
         "The final price depends on pages, features and integrations, and we share a clear quote after a free discovery call."),
        (f"Can you work with a business in {C} without meeting in person?",
         f"Yes. We work with {C} clients over calls, WhatsApp and screen-sharing, so you don't need to travel anywhere. "
         "Your work, files and approvals stay in one place from kickoff to launch."),
        (f"Which services do you offer in {C}?",
         f"Website development, mobile apps, custom software and ERP, digital marketing and SEO, video production, UI/UX design and branding, "
         f"and hosting and maintenance — for {C} shops, schools, clinics, factories and startups."),
        (f"Will my {C} website rank on Google?",
         f"We build in technical SEO, Core Web Vitals and Google Business Profile setup so your site has a strong start in {C} searches. "
         "Rankings depend on competition and ongoing work, so we never guarantee a #1 position — we track leads and calls instead."),
        ("Do websites include hosting and support?",
         "Our websites include SSL, hosting setup and one year of free maintenance. After that you can continue with a simple maintenance plan or manage it yourself."),
        (f"Can you build custom software or an app for my {C} business?",
         "Yes. We build billing and GST software, inventory, school and clinic management systems, and Android and iOS apps in React Native and Flutter, "
         "designed around how your business already works."),
        (f"Can you create content for {S} audiences?",
         f"We create content in Hindi and English. If your {C} customers mostly use {lang}, tell us during the discovery call and we'll plan the content accordingly."),
    ]


CSS_MARK = "/* city-page links */"


def update_support_files(all_cities):
    """locations.html city grid (static, crawlable) + small CSS for linked headings."""
    p = os.path.join(ROOT, "pages/locations.html")
    x = open(p, encoding="utf-8", newline="").read()
    parts = []
    for state, cities in all_cities:
        parts.append(f'<h2 style="grid-column: 1/-1; margin: 24px 0 0; color: var(--primary-900); font-size: 1.5rem">{esc(nice(state))}</h2>')
        for c in cities:
            parts.append(f'<a href="../states/{state}/{c}.html" class="city-card" style="padding: 18px"><h3 class="city-title">{esc(nice(c))}</h3>'
                         f'<div class="city-state">{esc(nice(state))}</div></a>')
    grid = ('<div id="cities-container" class="cities-grid">\n          <!-- city-links:start -->\n          '
            + "\n          ".join(parts)
            + "\n          <!-- city-links:end -->\n        </div>")
    x, n = re.subn(r'<div id="cities-container" class="cities-grid">.*?</div>(?=\s*</div>\s*<section)', lambda m: grid, x, count=1, flags=re.S)
    assert n, "cities-container not found"
    x = re.sub(r'<script>\s*document\.addEventListener\("DOMContentLoaded", \(\) => \{\s*const container = document\.getElementById\("cities-container"\).*?</script>', "", x, count=1, flags=re.S)
    open(p, "w", encoding="utf-8", newline="").write(x)
    css = os.path.join(ROOT, "css/pages/state.css")
    c = open(css, encoding="utf-8", newline="").read()
    if CSS_MARK not in c:
        c += (
            "\n" + CSS_MARK + "\n.mzp-areas .area h3 a { color: inherit; text-decoration: none; }\n"
            ".mzp-areas .area h3 a:hover { text-decoration: underline; }\n"
        )
        open(css, "w", encoding="utf-8", newline="").write(c)


def main():
    out = []
    all_cities = []
    for state in sorted(os.listdir(os.path.join(ROOT, "locations"))):
        sd = os.path.join(ROOT, "locations", state)
        if not os.path.isdir(sd):
            continue
        cities = sorted(c for c in os.listdir(sd) if os.path.isdir(os.path.join(sd, c)))
        all_cities.append((state, cities))
        for city in cities:
            if (state, city) == ("bihar", "muzaffarpur"):
                continue
            page = build(state, city, cities)
            with open(os.path.join(ROOT, "states", state, city + ".html"), "w", encoding="utf-8", newline="") as f:
                f.write(page)
            out.append(f"{SITE}/states/{state}/{city}.html")
    print(len(out), "pages written")
    update_support_files(all_cities)
    sm = os.path.join(ROOT, "sitemap.xml")
    x = open(sm, encoding="utf-8", newline="").read()
    new = [u for u in out if f"<loc>{u}</loc>" not in x]
    if new:
        entries = "".join(f"  <url>\n    <loc>{u}</loc>\n    <lastmod>2026-10-24</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n" for u in new)
        x = x.replace("</urlset>", "  <!-- city pages -->\n" + entries + "</urlset>")
        open(sm, "w", encoding="utf-8", newline="").write(x)
    print(len(new), "sitemap entries added")


if __name__ == "__main__":
    main()
