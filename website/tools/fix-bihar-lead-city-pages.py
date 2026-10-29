"""Makes each Bihar city NestLeads page rank for "lead management software in <city>":
self-canonical, keyword title/H1/meta, breadcrumb name, og/twitter. Re-runnable."""
import glob, io, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://www.pixelatenest.com/"
OLD = BASE + "products/lead-generation-software.html"
nice = lambda s: " ".join(w.capitalize() for w in s.split("-"))
urls = []

for f in sorted(glob.glob(os.path.join(ROOT, "locations", "bihar", "*", "products", "lead-management-software.html"))):
    f = f.replace("\\", "/")
    slug = f.split("/locations/bihar/")[1].split("/")[0]
    C = nice(slug)
    rel = f"locations/bihar/{slug}/products/lead-management-software.html"
    url = BASE + rel
    urls.append(url)
    T = io.open(f, encoding="utf-8-sig", newline="").read()
    TITLE = f"Lead Management Software in {C}, Bihar | NestLeads CRM"
    DESC = (f"NestLeads is lead management software and CRM for businesses in {C}, Bihar. Capture leads, assign them to your team, "
            f"follow up on WhatsApp and track every deal. Book a free demo.")

    def setm(attr, val):
        global T
        T, c = re.subn(r'(%s\s+content=")[^"]*(")' % attr, lambda m: m.group(1) + val + m.group(2), T, count=1)
        assert c == 1, (slug, attr)

    T, c = re.subn(r"<title>.*?</title>", lambda m: f"<title>{TITLE}</title>", T, count=1, flags=re.S)
    assert c == 1
    for a in ('name="description"', 'property="og:description"', 'name="twitter:description"'):
        setm(a, DESC)
    for a in ('property="og:title"', 'name="twitter:title"'):
        setm(a, TITLE)
    setm('property="og:url"', url)
    T, c = re.subn(r'(rel="canonical"\s+href=")[^"]*(")', lambda m: m.group(1) + url + m.group(2), T, count=1)
    assert c == 1
    T = T.replace(f"NestLeads – Lead Generation Software in {C}\"", f"Lead Management Software in {C}, Bihar\"")
    # SoftwareApplication url
    T = T.replace(f'"url": "{OLD}"', f'"url": "{url}"')
    # keywords meta
    T, _ = re.subn(r'(name="keywords"\s+content=")[^"]*(")',
                   lambda m: m.group(1) + f"lead management software in {C}, lead management software Bihar, CRM software {C}, lead tracking software {C}, NestLeads {C}" + m.group(2),
                   T, count=1)
    # H1
    T, c = re.subn(r"(<h1[^>]*>)(.*?)(</h1>)",
                   lambda m: f"{m.group(1)}\n                Lead Management Software<br />\n                in {C}, Bihar – NestLeads\n              {m.group(3)}",
                   T, count=1, flags=re.S)
    assert c == 1
    io.open(f, "w", encoding="utf-8-sig", newline="").write(T)

sp = os.path.join(ROOT, "sitemap.xml")
S = io.open(sp, encoding="utf-8", newline="").read()
e = "\r\n" if "\r\n" in S else "\n"
add = "".join(f"  <url>{e}    <loc>{u}</loc>{e}    <lastmod>2026-10-29</lastmod>{e}    <priority>0.7</priority>{e}  </url>{e}"
              for u in urls if u not in S)
if add:
    k = S.rindex("</urlset>")
    S = S[:k] + add + S[k:]
    io.open(sp, "w", encoding="utf-8", newline="").write(S)
print(len(urls), "pages fixed;", add.count("<url>"), "added to sitemap")
