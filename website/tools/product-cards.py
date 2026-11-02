# (re)builds the products card section on every city page and places it right after "Industries We Serve"
import re, glob, os
P = {
 'attendance-management-software.html': ('NestHR Attendance & Payroll','attendace-payroll'),
 'school-management-software.html': ('School Management Software','school-manage'),
 'sports-management-software.html': ('Sports Academy Software','sports-manage'),
 'transport-management-software.html': ('Transport Management Software','transport-manage'),
 'hotel-management-software.html': ('Hotel Management Software','hotel-manage'),
 'library-management-software.html': ('Library Management Software','library-manage'),
 'kirana-store-billing-software.html': ('Kirana Store Billing Software','kirana-manage'),
 'fmcg-retail-software.html': ('FMCG, Retail & Wholesale Software','fmcg-manage'),
 'lead-management-software.html': ('Lead Management Software','lead-manage'),
}
GENERIC_LEAD = 'https://www.pixelatenest.com/products/lead-generation-software.html'
TRUST = '<ul class="pcard-trust"><li>Free live demo</li><li>Online setup &amp; support</li><li>Made in India</li></ul>'
OLD = re.compile(r'<section class="mzp-areas" aria-labelledby="mzp-products-h2".*?</section>[ \t]*\r?\n*', re.S)
IND = re.compile(r'<section\s+class="services-section".*?</section>', re.S)
n = 0
for f in glob.glob('states/*/*.html'):
    s = open(f, 'rb').read().decode('utf-8')
    st, city = f.replace(chr(92), '/').split('/')[1:3]; city = city[:-5]
    d = f'locations/{st}/{city}/products'
    if not os.path.isdir(d) or not IND.search(s): continue
    m = re.search(r'Software Products for\s+(.+?)\s+Businesses', s)
    name = m.group(1) if m else city.replace('-', ' ').title()
    cards = ''
    for k, (t, img) in P.items():
        if os.path.exists(f'{d}/{k}'): url = f'https://www.pixelatenest.com/locations/{st}/{city}/products/{k}'
        elif k.startswith('lead'): url = GENERIC_LEAD
        else: continue
        t = t.replace('&', '&amp;')
        cards += f'''
            <article class="pcard mzp-reveal">
              <img src="../../assets/images/products/{img}.webp" alt="{t}" loading="lazy" />
              <div class="pcard-body"><h3>{t}</h3>{TRUST}
              <a class="pcard-btn" href="{url}">View details</a></div>
            </article>'''
    sec = f'''<section class="mzp-areas" aria-labelledby="mzp-products-h2">
        <div class="container">
          <div class="head mzp-reveal">
            <span class="eyebrow">Our Products</span>
            <h2 id="mzp-products-h2" style="margin-bottom: 10px; font-size: clamp(2rem, 4vw, 5rem); color: var(--primary-900); line-height: 1.2;">Software Products for {name} Businesses</h2>
            <p class="lead">Ready-to-use software from Pixelate Nest, set up and supported online for {name}.</p>
          </div>
          <div class="pcard-list">{cards}
          </div>
        </div>
      </section>'''
    if '\r\n' in s: sec = sec.replace('\n', '\r\n')
    nl = '\r\n' if '\r\n' in s else '\n'
    s = OLD.sub('', s, 1)
    m = IND.search(s)
    s = s[:m.end()] + nl + nl + '      ' + sec + nl + s[m.end():]
    open(f, 'wb').write(s.encode('utf-8')); n += 1
print('done', n)
