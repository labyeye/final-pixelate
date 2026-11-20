"""Insert a "NestHR user manual" band (cover, read-as-flipbook, download PDF) right after the nesthr-why block in
  products/attendance-payroll-software.html and every locations/<state>/<city>/products/attendance-management-software-in-<city>.html
Idempotent (markers). Run after build-city-pages.py and add-nesthr-why.py. Remove: strip between the nesthr-manual markers."""
import glob, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
START, END = "<!-- nesthr-manual:start -->", "<!-- nesthr-manual:end -->"
AFTER = "<!-- nesthr-why:end -->"
FALLBACK = "<!-- SECTION: Why Choose NestHR -->"
BLOCK = START + """
<section class="nhm" id="nesthr-manual" aria-labelledby="nhm-h2">
<style>
.nhm{padding:48px 16px;background:#f4f7fb}.nhm-in{max-width:980px;margin:0 auto;display:flex;gap:32px;align-items:center;flex-wrap:wrap;justify-content:center}
.nhm img{width:190px;height:auto;border:2px solid #000;box-shadow:6px 6px 0 #000;background:#fff}
.nhm-t{flex:1;min-width:260px}.nhm h2{margin:0 0 10px;font-size:1.6rem;color:#0b1220}.nhm p{margin:0 0 18px;color:#334155;line-height:1.55}
.nhm a.b{display:inline-block;margin:0 10px 10px 0;padding:11px 20px;border:2px solid #000;font-weight:700;text-decoration:none;box-shadow:3px 3px 0 #000;background:#024BAB;color:#fff}
.nhm a.b.alt{background:#fff;color:#000}
</style>
<div class="nhm-in">
<a href="https://www.pixelatenest.com/pages/nesthr-user-manual.html"><img src="https://www.pixelatenest.com/assets/docs/user-manual/cover.webp" alt="NestHR user manual cover" width="190" height="269" loading="lazy"></a>
<div class="nhm-t"><h2 id="nhm-h2">NestHR user manual</h2>
<p>A step by step guide to attendance, leave, payroll and reports. Read it online like a book, or download the PDF and share it with your team.</p>
<a class="b" href="https://www.pixelatenest.com/pages/nesthr-user-manual.html">Read as flip book</a>
<a class="b alt" href="https://www.pixelatenest.com/assets/docs/user-manual/NestHR_Web_User_Manual.pdf" download>Download PDF</a></div>
</div></section>
""" + END
files = [os.path.join(ROOT, "products/attendance-payroll-software.html")] + glob.glob(
    os.path.join(ROOT, "locations/*/*/products/attendance-management-software-in-*.html"))
pat = re.compile(re.escape(START) + r".*?" + re.escape(END), re.S)
n = skipped = 0
for f in files:
    raw = open(f, encoding="utf-8", newline="").read()
    nl = "\r\n" if "\r\n" in raw else "\n"
    s = raw.replace("\r\n", "\n")
    if START in s:
        s = pat.sub(lambda m: BLOCK, s)
    elif AFTER in s:
        s = s.replace(AFTER, AFTER + "\n" + BLOCK, 1)
    elif FALLBACK in s:  # city pages that have no nesthr-why block
        s = s.replace(FALLBACK, BLOCK + chr(10) + FALLBACK, 1)
    else:
        skipped += 1; print("no anchor:", f); continue
    open(f, "w", encoding="utf-8", newline="").write(s.replace("\n", nl)); n += 1
print("updated", n, "skipped", skipped)
