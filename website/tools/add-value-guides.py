"""Insert a buyer's-guide section (tools/guide_content.py) into every
locations/<state>/<city>/{services,products}/*.html page.

Run from anywhere:  python tools/add-value-guides.py
Idempotent: an existing block between the value-guide markers is replaced.
To remove everything: strip text between <!-- value-guide:start --> and <!-- value-guide:end -->.
"""
import html, importlib.util, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from guide_content import G  # noqa: E402

spec = importlib.util.spec_from_file_location("bcp", os.path.join(HERE, "build-city-pages.py"))
bcp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bcp)
nice, pick, LANG, SERVICES = bcp.nice, bcp.pick, bcp.LANG, bcp.SERVICES

SITE = "https://www.pixelatenest.com"
START, END = "<!-- value-guide:start -->", "<!-- value-guide:end -->"
PRODUCTS = {
    "school-management-software": "School Management Software", "attendance-management-software": "Attendance & HR Software",
    "hotel-management-software": "Hotel Management Software", "kirana-store-billing-software": "Kirana Billing Software",
    "fmcg-retail-software": "FMCG Retail Software", "library-management-software": "Library Management Software",
    "sports-management-software": "Sports Academy Software", "transport-management-software": "Transport Management Software",
    "lead-management-software": "Lead Management Software",
}
SVC_LABEL = {s: l for s, l, _ in SERVICES}

CSS = """<style>
.vg{padding:64px 20px;background:#fff}.vg *{box-sizing:border-box}
.vg-in{max-width:1100px;margin:0 auto}
.vg h2{font-size:clamp(1.6rem,3vw,2.4rem);line-height:1.2;color:var(--primary-900,#054bab);margin:0 0 16px}
.vg h3{font-size:1.15rem;color:var(--primary-900,#054bab);margin:0 0 12px}
.vg p,.vg li{font-size:1rem;line-height:1.7;color:#333}
.vg .lead{font-size:1.1rem;max-width:880px;margin:0 0 32px}
.vg-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.vg-card{background:#f7f9fd;border:1px solid rgba(5,75,171,.14);border-radius:14px;padding:24px}
.vg-card ul{margin:0;padding-left:20px}.vg-card li{margin-bottom:8px}
.vg-faq details{border:1px solid rgba(5,75,171,.14);border-radius:12px;padding:14px 18px;margin-bottom:10px;background:#fff}
.vg-faq summary{cursor:pointer;font-weight:600;color:var(--primary-900,#054bab)}
.vg-faq details p{margin:10px 0 0}
.vg-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
.vg-links a{display:inline-block;padding:8px 14px;border:1px solid rgba(5,75,171,.25);border-radius:999px;font-size:.92rem;color:var(--primary-900,#054bab);text-decoration:none}
.vg-links a:hover{background:rgba(5,75,171,.08)}
.vg-sub{margin-top:32px}
@media(max-width:720px){.vg{padding:44px 16px}.vg-grid{grid-template-columns:1fr}}
</style>"""


def li(items, C, S):
    return "".join(f"<li>{html.escape(x.replace('{C}', C).replace('{S}', S), quote=False)}</li>" for x in items)


def block(state, city, kind, slug, cities):
    g = G[slug]
    S, C = nice(state), nice(city)
    sub = lambda x: x.replace("{C}", C).replace("{S}", S)
    esc = lambda x: html.escape(sub(x), quote=False)
    i = cities.index(city)
    near = [cities[(i + k) % len(cities)] for k in range(1, min(4, len(cities) - 1) + 1)]
    lang = LANG[state]
    local = pick(state + city + slug, [
        f"Pixelate Nest is based in Muzaffarpur, Bihar, and works with businesses in {C}, {S} online — calls, WhatsApp and screen-sharing — so you don't need to travel to get a clear plan and quote.",
        f"We serve {C} and nearby cities such as {', '.join(nice(c) for c in near[:3])} remotely. If your customers speak {lang}, tell us and we'll plan the content and interface around it.",
        f"Whether you are in {C} or elsewhere in {S}, the process is the same: a free discovery call, a written scope and quote, regular progress updates, and support after launch.",
    ])
    related = [(f"{SITE}/states/{state}/{city}.html", f"Website Development Agency in {C}")]
    related += [(f"{SITE}/locations/{state}/{city}/services/{s}.html", f"{SVC_LABEL[s]} in {C}") for s in SVC_LABEL if (kind, s) != ("services", slug)]
    related += [(f"{SITE}/locations/{state}/{city}/products/{p}.html", f"{n} in {C}") for p, n in PRODUCTS.items() if (kind, p) != ("products", slug)]
    same = [(f"{SITE}/locations/{state}/{c}/{kind}/{slug}.html", f"{g['label'].capitalize()} in {nice(c)}") for c in near]
    links = "".join(f'<a href="{u}">{html.escape(t, quote=False)}</a>' for u, t in related + same)
    faqs = "".join(f"<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>" for q, a in g["faq"])
    return f"""{START}
{CSS}
<section class="vg" id="buyers-guide" aria-labelledby="vg-h2">
  <div class="vg-in">
    <h2 id="vg-h2">{esc(g['h'])}</h2>
    <p class="lead">{esc(g['answer'])}</p>
    <div class="vg-grid">
      <div class="vg-card"><h3>Who needs this in {html.escape(C)}?</h3><ul>{li(g['who'], C, S)}</ul></div>
      <div class="vg-card"><h3>What affects the cost?</h3><p>{esc(g['cost_intro'])}</p><ul>{li(g['cost'], C, S)}</ul></div>
      <div class="vg-card"><h3>How to choose the right provider</h3><ul>{li(g['choose'], C, S)}</ul></div>
      <div class="vg-card"><h3>Common mistakes to avoid</h3><ul>{li(g['mistakes'], C, S)}</ul></div>
    </div>
    <p class="vg-sub">{html.escape(local, quote=False)}</p>
    <div class="vg-faq vg-sub"><h3>Questions {html.escape(C)} customers ask</h3>{faqs}</div>
    <div class="vg-sub"><h3>Related services and nearby cities</h3><div class="vg-links">{links}</div></div>
  </div>
</section>
{END}"""


def faq_schema(g, C, S):
    sub = lambda x: x.replace("{C}", C).replace("{S}", S)
    d = {"@context": "https://schema.org", "@type": "FAQPage",
         "mainEntity": [{"@type": "Question", "name": sub(q), "acceptedAnswer": {"@type": "Answer", "text": sub(a)}} for q, a in g["faq"]]}
    return '<script type="application/ld+json">' + json.dumps(d, ensure_ascii=False) + "</script>\n"


def anchor(s):
    m = s.find('<section class="nh-cta-banner"')
    if m != -1:
        return m
    h = re.search(r"<h2[^>]*>\s*(Frequently Asked Questions|[^<]*FAQs)\s*</h2>", s)
    if h:
        return s.rindex("<section", 0, h.start())
    f = s.find("<footer")
    last = s.rfind("</section>", 0, f if f != -1 else len(s))
    return last + len("</section>") if last != -1 else (f if f != -1 else s.rindex("</body>"))


def main():
    n = skipped = 0
    for state in sorted(os.listdir(os.path.join(ROOT, "locations"))):
        sd = os.path.join(ROOT, "locations", state)
        if not os.path.isdir(sd):
            continue
        cities = sorted(c for c in os.listdir(sd) if os.path.isdir(os.path.join(sd, c)))
        for city in cities:
            for kind in ("services", "products"):
                d = os.path.join(sd, city, kind)
                if not os.path.isdir(d):
                    continue
                for fn in os.listdir(d):
                    slug = fn[:-5]
                    if not fn.endswith(".html") or slug not in G:
                        skipped += 1
                        continue
                    p = os.path.join(d, fn)
                    s = open(p, encoding="utf-8", newline="").read()
                    s = re.sub(re.escape(START) + r".*?" + re.escape(END) + r"\n?", "", s, flags=re.S)
                    if '"FAQPage"' not in s:
                        s = s.replace("</head>", faq_schema(G[slug], nice(city), nice(state)) + "</head>", 1)
                    a = anchor(s)
                    s = s[:a] + block(state, city, kind, slug, cities) + "\n" + s[a:]
                    open(p, "w", encoding="utf-8", newline="").write(s)
                    n += 1
    print(n, "pages updated;", skipped, "files skipped")


if __name__ == "__main__":
    main()
