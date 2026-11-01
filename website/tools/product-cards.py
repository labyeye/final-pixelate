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
R = re.compile(r'(<div class="area-list" role="list">).*?(\s*</div>\s*</div>\s*</section>)', re.S)
n = 0
for f in glob.glob('states/*/*.html'):
    s = open(f, 'rb').read().decode('utf-8')
    if 'mzp-products-h2' not in s: continue
    st, city = f.replace(chr(92),'/').split('/')[1:3]; city = city[:-5]
    d = f'locations/{st}/{city}/products'
    cards = ''.join(f'''
            <article class="pcard mzp-reveal">
              <img src="../../assets/images/products/{P[k][1]}.webp" alt="{P[k][0].replace("&","&amp;")}" loading="lazy" />
              <div class="pcard-body"><h3>{P[k][0].replace("&","&amp;")}</h3>
              <a class="pcard-btn" href="https://www.pixelatenest.com/locations/{st}/{city}/products/{k}">View details</a></div>
            </article>''' for k in P if os.path.exists(f'{d}/{k}'))
    # only the products section: split at its marker
    i = s.index('mzp-products-h2'); head, tail = s[:i], s[i:]
    tail, c = R.subn(lambda m: '<div class="pcard-list">' + cards + m.group(2), tail.replace('<div class="area-list" role="list">','<div class="area-list" role="list">',1), 1)
    if c: open(f,'wb').write((head+tail).encode('utf-8')); n += 1
print('done', n)
