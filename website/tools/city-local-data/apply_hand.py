import re, os, sys, json, html, importlib.util
import os; SC = os.path.dirname(os.path.abspath(__file__)) + '/'
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
e = html.escape
for mod in sys.argv[1:]:
    spec = importlib.util.spec_from_file_location(mod, SC + mod + '.py'); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    for key, p in m.PAGES.items():
        st, ci = key.split('/')
        f = f'locations/{st}/{ci}/products/attendance-management-software-in-{ci}.html'
        s = open(f, encoding='utf-8-sig', newline='').read()
        i = s.find('<section class="vg"')
        if i < 0:
            city0 = re.search(r'<title>Attendance Management Software in (.*?) \| NestHR', s).group(1).split(',')[0]
            cards0 = ''.join('<div class="vg-card"><h3>%s</h3><ul>%s</ul></div>' % (e(t), ''.join('<li>%s</li>' % e(b) for b in bl)) for t, bl in p['cards'])
            faq0 = ''.join('<details><summary>%s</summary><p>%s</p></details>' % (e(q), e(a)) for q, a in p['faq'])
            new = ('<section class="vg" id="buyers-guide" aria-labelledby="vg-h2"><div class="vg-in"><h2 id="vg-h2">Attendance &amp; HR Management Software in %s: A Buyer\'s Guide</h2>'
                   '<p class="lead">%s</p><div class="vg-grid">%s</div><div class="vg-faq vg-sub"><h3>Questions %s customers ask</h3>%s</div></div></section>\n      ') % (e(city0), e(p['lead']), cards0, e(city0), faq0)
            k = s.find('<section class="nh-cta-banner">')
            assert k > 0, key
            s = s[:k] + new + s[k:]
            ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p['faq']]}
            tag = '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script>'
            s = re.sub(r'<script type="application/ld\+json">\{"@context": "https://schema.org", "@type": "FAQPage".*?</script>', lambda x: '', s, count=1, flags=re.S)
            s = s.replace('</head>', '    ' + tag + '\n  </head>', 1)
            open(f, 'w', encoding='utf-8-sig', newline='').write(s); print(key, 'new-vg'); continue
        j = s.find('</section>', i)
        sec = s[i:j]
        sec, n1 = re.subn(r'(<p class="lead">)[\s\S]*?(</p>)', lambda x: x.group(1) + e(p['lead']) + x.group(2), sec, count=1)
        cards = ''.join('<div class="vg-card"><h3>%s</h3><ul>%s</ul></div>' % (e(t), ''.join('<li>%s</li>' % e(b) for b in bl)) for t, bl in p['cards'])
        sec, n2 = re.subn(r'<div class="vg-grid">[\s\S]*?</div>\s*</div>\s*(?=<p class="vg-sub">)', lambda x: '<div class="vg-grid">' + cards + '</div>\n          ', sec, count=1)
        city = re.search(r'<title>Attendance Management Software in (.*?) \| NestHR', s).group(1).split(',')[0]
        faq = ''.join('<details><summary>%s</summary><p>%s</p></details>' % (e(q), e(a)) for q, a in p['faq'])
        sec, n3 = re.subn(r'(<div class="vg-faq vg-sub">)[\s\S]*?(</div>)(?=\s*<div class="vg-sub">)', lambda x: x.group(1) + '<h3>Questions %s customers ask</h3>' % e(city) + faq + x.group(2), sec, count=1)
        print(key, n1, n2, n3)
        assert n1 == n2 == n3 == 1, key
        s = s[:i] + sec + s[j:]
        ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p['faq']]}
        tag = '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script>'
        s, n4 = re.subn(r'<script type="application/ld\+json">\{"@context": "https://schema.org", "@type": "FAQPage".*?</script>', lambda x: tag, s, count=1, flags=re.S)
        if not n4: s = s.replace('</head>', '    ' + tag + '\n  </head>', 1)
        open(f, 'w', encoding='utf-8-sig', newline='').write(s)
