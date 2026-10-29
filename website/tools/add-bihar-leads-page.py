"""Builds products/lead-management-software-bihar.html from the main NestLeads page.
Target keyword: "lead management software in bihar". Re-runnable."""
import io, json, os, re, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "products", "lead-generation-software.html")
OUT = os.path.join(ROOT, "products", "lead-management-software-bihar.html")
URL = "https://www.pixelatenest.com/products/lead-management-software-bihar.html"

T = io.open(SRC, encoding="utf-8-sig", newline="").read()
nl = "\r\n" if "\r\n" in T else "\n"
T = T.replace("\r\n", "\n")

TITLE = "Lead Management Software in Bihar | NestLeads CRM by Pixelate Nest"
DESC = ("NestLeads is lead management software and CRM for businesses in Bihar. Capture leads from every channel, "
        "assign to your team, follow up on WhatsApp and track every deal. Patna, Gaya, Muzaffarpur and all Bihar cities.")
KW = ("lead management software in Bihar, lead management software Patna, CRM software Bihar, "
      "lead tracking software Bihar, NestLeads Bihar, WhatsApp CRM Bihar, lead generation software Bihar")


def setmeta(attr, val, s):
    pat = r'(%s\s+content=")[^"]*(")' % attr
    n, c = re.subn(pat, lambda m: m.group(1) + val + m.group(2), s, count=1)
    assert c == 1, attr
    return n


T, c = re.subn(r"<title>.*?</title>", lambda m: f"<title>{TITLE}</title>", T, count=1, flags=re.S)
assert c == 1
T = setmeta('name="description"', DESC, T)
T = setmeta('name="keywords"', KW, T)
T = setmeta('property="og:title"', TITLE, T)
T = setmeta('property="og:description"', DESC, T)
T = setmeta('property="og:url"', URL, T)
T = setmeta('name="twitter:title"', TITLE, T)
T = setmeta('name="twitter:description"', DESC, T)
T, c = re.subn(r'(rel="canonical"\s+href=")[^"]*(")', lambda m: m.group(1) + URL + m.group(2), T, count=1)
assert c == 1
T = T.replace('"name": "NestLeads – Lead Generation Software by Pixelate Nest",\n            "item": "https://www.pixelatenest.com/products/lead-generation-software.html"',
              f'"name": "Lead Management Software in Bihar",\n            "item": "{URL}"')
T = T.replace('"url": "https://www.pixelatenest.com/products/lead-generation-software.html"', f'"url": "{URL}"')

# hero
T, c = re.subn(r'<span class="nh-hs-tag">.*?</span>', '<span class="nh-hs-tag">NestLeads – Made for Bihar</span>', T, count=1, flags=re.S)
assert c == 1
T, c = re.subn(r"<h1>.*?</h1>", "<h1>\n                Lead Management Software<br />\n                in Bihar – NestLeads CRM\n              </h1>", T, count=1, flags=re.S)
assert c == 1
m = re.search(r"</h1>\s*<p>(.*?)</p>", T, re.S)
T = T[:m.start(1)] + ("NestLeads helps businesses in Patna, Gaya, Muzaffarpur and every city of Bihar capture leads from "
                      "calls, WhatsApp, Facebook, Instagram and websites, assign them to the right person, follow up on time "
                      "and see which leads become sales. Stop losing enquiries in notebooks and chats.") + T[m.end(1):]

bihar = os.path.join(ROOT, "locations", "bihar")
cities = sorted(d for d in os.listdir(bihar)
                if os.path.isfile(os.path.join(bihar, d, "products", "lead-management-software.html")))
nice = lambda s: " ".join(w.capitalize() for w in s.split("-"))
links = "".join(f'<a href="../locations/bihar/{c}/products/lead-management-software.html">Lead management software in {nice(c)}</a>' for c in cities)

FAQ = [
    ("What is lead management software?", "It is a tool that collects every enquiry in one place, assigns it to a salesperson, reminds them to follow up and shows what happened to each lead. NestLeads does this in one simple app."),
    ("Is NestLeads suitable for small businesses in Bihar?", "Yes. Coaching institutes, real estate agents, showrooms, clinics, service companies and distributors in Bihar can use the same simple screens. No technical knowledge is needed."),
    ("Can I follow up with leads on WhatsApp?", "Yes. You connect your own WhatsApp number and send messages, documents and templates from inside NestLeads, so your team does not switch between apps."),
    ("Does NestLeads work on mobile?", "Yes. Your team can add leads, call, set reminders and update status from the phone, in the field or in the office."),
    ("Which cities in Bihar do you serve?", "All of Bihar, including Patna, Gaya, Bhagalpur, Muzaffarpur, Darbhanga and Purnia. NestLeads is cloud based, so you can start from anywhere."),
    ("How do I get a demo?", "Use the contact page. We will show NestLeads with your own sales process and help you set it up."),
]
faq_html = "".join(f"<details><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>" for q, a in FAQ)
faq_ld = ",".join(json.dumps({"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}, ensure_ascii=False) for q, a in FAQ)

CSS = """.bl{padding:56px 16px;background:#fff;color:#111}
.bl-in{max-width:1100px;margin:0 auto}
.bl h2{font-size:clamp(1.5rem,3.5vw,2.2rem);margin:0 0 12px}
.bl p{line-height:1.7;color:#333;margin:0 0 14px}
.bl-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:20px 0}
.bl-card{border:2px solid #000;box-shadow:4px 4px 0 #000;padding:16px;background:#fff}
.bl-card h3{font-size:1.05rem;margin:0 0 6px}
.bl-card p{margin:0;font-size:.95rem}
.bl-cities{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.bl-cities a{border:2px solid #000;padding:6px 10px;font-size:.85rem;font-weight:600;color:#054bab;text-decoration:none;background:#f8faff}
.bl details{border:2px solid #000;margin:8px 0;padding:10px 14px;background:#fff}
.bl summary{cursor:pointer;font-weight:700}
.bl details p{margin:8px 0 0}"""

SECTION = f"""
      <!-- bihar-leads:start -->
      <style>
{CSS}
      </style>
      <section class="bl" id="bihar">
        <div class="bl-in">
          <h2>Lead management software built for businesses in Bihar</h2>
          <p>Most sales teams in Bihar still keep leads in notebooks, Excel sheets and WhatsApp chats. Enquiries get forgotten, follow-ups are missed and the owner never knows who is working on what. NestLeads puts every lead in one place and tells your team what to do next.</p>
          <div class="bl-grid">
            <div class="bl-card"><h3>Capture from everywhere</h3><p>Calls, WhatsApp, Facebook and Instagram ads, website forms and walk-ins all land in one list.</p></div>
            <div class="bl-card"><h3>Assign and follow up</h3><p>Each lead goes to the right person with reminders, so nobody forgets to call back.</p></div>
            <div class="bl-card"><h3>WhatsApp from inside</h3><p>Send messages and documents on your own WhatsApp number without switching apps.</p></div>
            <div class="bl-card"><h3>See what is working</h3><p>Know which source gives the most customers and which salesperson closes the most deals.</p></div>
          </div>
          <h2>Who uses lead management software in Bihar</h2>
          <p>Coaching and education institutes, real estate and property dealers, car and bike showrooms, hospitals and clinics, interior and construction companies, insurance and finance agents, and distributors across Patna, Gaya, Muzaffarpur, Bhagalpur and other towns.</p>
          <h2>Lead management software by city in Bihar</h2>
          <div class="bl-cities">{links}</div>
          <h2 style="margin-top:32px">Frequently asked questions</h2>
          {faq_html}
          <p style="margin-top:20px"><a class="nh-hs-cta" href="https://www.pixelatenest.com/pages/contact.html">Book a free NestLeads demo</a></p>
        </div>
      </section>
      <script type="application/ld+json">{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{faq_ld}]}}</script>
      <!-- bihar-leads:end -->
"""

# drop the generic FAQPage schema so this page has exactly one
T = re.sub(r'<script type="application/ld\+json">\s*\{\s*"@context": "https://schema.org",\s*"@type": "FAQPage".*?</script>', "", T, count=1, flags=re.S)
anchor = "      <!-- SECTION: What is Lead Gen Software -->"
assert anchor in T
T = T.replace(anchor, SECTION + anchor, 1)
io.open(OUT, "w", encoding="utf-8-sig", newline="").write(T.replace("\n", nl))

# sitemap
sp = os.path.join(ROOT, "sitemap.xml")
S = io.open(sp, encoding="utf-8", newline="").read()
if URL not in S:
    e = "\r\n" if "\r\n" in S else "\n"
    blk = f"  <url>{e}    <loc>{URL}</loc>{e}    <lastmod>2026-10-29</lastmod>{e}    <priority>0.9</priority>{e}  </url>{e}"
    k = S.index("  <url>", S.index("lead-generation-software.html</loc>"))
    S = S[:k] + blk + S[k:]
    io.open(sp, "w", encoding="utf-8", newline="").write(S)
print("ok", len(cities), "cities")
