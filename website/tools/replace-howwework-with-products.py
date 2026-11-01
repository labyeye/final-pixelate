import re, glob, os
P = {
 'attendance-management-software.html': ('NestHR Attendance & Payroll Software','fa-user-clock','Attendance, leave and payroll software'),
 'school-management-software.html': ('School Management Software','fa-school','Admissions, fees, attendance and parent updates'),
 'sports-management-software.html': ('Sports Academy Management Software','fa-futbol','Students, batches, fees and attendance'),
 'transport-management-software.html': ('Transport Management Software','fa-truck','Trips, vehicles, drivers and billing'),
 'hotel-management-software.html': ('Hotel Management Software','fa-hotel','Bookings, rooms, billing and housekeeping'),
 'library-management-software.html': ('Library Management Software','fa-book','Members, issue/return and fines'),
 'kirana-store-billing-software.html': ('Kirana Store Billing Software','fa-store','Fast billing, stock and GST'),
 'fmcg-retail-software.html': ('FMCG, Retail & Wholesale Software','fa-boxes-stacked','Billing, inventory and distribution'),
 'lead-management-software.html': ('Lead Management Software','fa-bullseye','Capture, follow up and convert leads'),
}
R = re.compile(r'<section class="mzp-longform".*?</section>\s*', re.S)
n = 0
for f in glob.glob('states/*/*.html'):
    s = open(f, 'rb').read().decode('utf-8')
    if 'class="mzp-longform"' not in s: continue
    st, city = f.replace(chr(92),'/').split('/')[1:3]; city = city[:-5]
    d = f'locations/{st}/{city}/products'
    nm = re.search(r'Website Development for (.+?) Businesses', s)
    if not nm or not os.path.isdir(d): print('skip', f); continue
    name = nm.group(1); nl = '\r\n' if '\r\n' in s else '\n'
    cards = ''.join(f'''
            <article class="area mzp-reveal" data-delay="{i%3+1}" role="listitem">
              <div class="area-head"><span class="area-ico" aria-hidden="true"><i class="fa-solid {P[k][1]}"></i></span><span class="area-cat">Product</span></div>
              <h3><a href="https://www.pixelatenest.com/locations/{st}/{city}/products/{k}">{P[k][0].replace("&","&amp;")} in {name}</a></h3>
              <p>{P[k][2]} for {name} businesses.</p>
            </article>''' for i,k in enumerate(k for k in P if os.path.exists(f'{d}/{k}')))
    new = f'''<section class="mzp-areas" aria-labelledby="mzp-products-h2">
        <div class="container">
          <div class="head mzp-reveal">
            <span class="eyebrow">Our Products</span>
            <h2 id="mzp-products-h2" style="margin-bottom: 10px; font-size: clamp(2rem, 4vw, 5rem); color: var(--primary-900); line-height: 1.2;">Software Products for {name} Businesses</h2>
            <p class="lead">Ready-to-use software from Pixelate Nest, set up and supported online for {name}.</p>
          </div>
          <div class="area-list" role="list">{cards}
          </div>
        </div>
      </section>

      '''.replace('\n', nl)
    s2, c = R.subn(lambda m: new, s, 1)
    if c: open(f, 'wb').write(s2.encode('utf-8')); n += 1
print('done', n)
