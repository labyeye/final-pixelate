import re, glob, sys
from collections import Counter

BEN_ICONS = ['fa-clock', 'fa-magnifying-glass-chart', 'fa-bullseye', 'fa-pen-to-square']
STEPS = [
 ('fa-lightbulb', 'Discovery &amp; Strategy', 'We study your business, audience, and goals to map out the right structure and features.'),
 ('fa-pen-ruler', 'UI / UX Design', 'Wireframes and visual designs that balance brand identity with usability.'),
 ('fa-code', 'Development', 'Clean, scalable code built on modern frameworks for speed and reliability.'),
 ('fa-shield-halved', 'Testing &amp; QA', 'Cross-browser and cross-device testing to catch issues before launch.'),
 ('fa-rocket', 'Launch', 'Smooth go-live with DNS setup, deployment, and monitoring from day one.'),
 ('fa-headset', 'Support &amp; Maintenance', 'Ongoing updates, backups, and dedicated support so you can focus on growth.'),
]


def span(s, heading):
    i = s.index(heading)
    return s.rindex('<section', 0, i), s.index('</section>', i) + len('</section>')


def ind_grid(arts, cols, icons=None):
    out = []
    for n, (ic, h, p) in enumerate(arts, 1):
        ic = ic or 'fa-solid ' + icons[(n - 1) % len(icons)]
        out.append(f'''            <div class="ind-card">
              <div class="ind-card-top">
                <span class="ind-num">{n:02d}</span>
                <span class="ind-arrow"><i class="{ic}"></i></span>
              </div>
              <h3 class="ind-title">{h}</h3>
              <p class="ind-desc">{p}</p>
            </div>''')
    return f'<div class="ind-grid ind-cols-{cols}">\n' + '\n'.join(out) + '\n          </div>'


def cards_section(s, heading, cols, icons=None):
    a, b = span(s, heading)
    sec = s[a:b]
    arts = re.findall(r'<article class="crm-card crm-[\w-]+">\s*(?:<div class="crm-icon">\s*<i class="(fa-(?:solid|brands) [\w-]+)"></i>\s*</div>\s*)?<h3>(.*?)</h3>\s*<p>\s*(.*?)\s*</p>\s*</article>', sec, re.S)
    arts = [(i, h, re.sub(r'\s+', ' ', p)) for i, h, p in arts]
    assert arts, heading
    head = re.search(r'<div style="text-align: center[^>]*>.*?</div>', sec, re.S).group(0)
    new = f'''<section class="crm-section">
        <div class="container">
          {head}
          {ind_grid(arts, cols, icons)}
        </div>
      </section>'''
    return s[:a] + new + s[b:]


def snake():
    rows = []
    for r in range(2):
        cls = 'pn-ltr' if r == 0 else 'pn-rtl'
        st = ''
        for k in range(3 * r, 3 * r + 3):
            ic, h, p = STEPS[k]
            st += f'''
              <div class="pn-step" data-index="{k}">
                <div class="pn-num">{k + 1:02d}</div>
                <div class="pn-circle"><i class="fa-solid {ic}"></i></div>
                <h3 class="pn-label">{h}</h3>
                <p class="pn-desc">{p}</p>
              </div>'''
        rows.append(f'            <div class="pn-row {cls}">{st}\n            </div>')
    return '''<section class="pn-section" id="pn-section">
        <div class="pn-container">
          <div class="pn-header">
            <span class="pn-eyebrow">OUR PROCESS</span>
            <h2 class="pn-headline">How We Build Your Website</h2>
            <p class="pn-subtext">A clear, structured process from first call to final delivery.</p>
          </div>
          <div class="pn-snake" id="pn-snake">
            <svg id="pn-svg" class="pn-svg" aria-hidden="true">
              <path id="pn-path-bg" fill="none" stroke="#e5e7eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path id="pn-path-fg" fill="none" stroke="#f97316" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
''' + '\n\n'.join(rows) + '''
          </div>
        </div>
      </section>'''


def process(f):
    s = open(f, newline='', encoding='utf-8').read()
    crlf = '\r\n' in s
    s = s.replace('\r\n', '\n')
    if 'pn-snake' in s:
        return 'skip'
    s = cards_section(s, '<h2 class="crm-heading">Core Web Development Capabilities</h2>', 3)
    s = cards_section(s, '<h2 class="crm-heading">Business Benefits of Web Development</h2>', 4, BEN_ICONS)
    a, b = span(s, '<h2 class="crm-heading">Our Process</h2>')
    s = s[:a] + snake() + s[b:]
    # masonry: move the web-dev portfolio section (+ its script) into the UI Preview slot
    pa = s.index('<section class="portfolio-works">')
    pb = s.index('</section>', pa) + len('</section>')
    sc = s.index('</script>', s.index('<script data-service="web-development">', pb)) + len('</script>')
    mas = s[pa:sc]
    s = s[:pa] + s[sc:]
    a, b = span(s, '<h2 class="crm-heading">UI Preview</h2>')
    s = s[:a] + mas + s[b:]
    m = re.search(r'<link rel="stylesheet" href="((?:\.\./)+)css/pages/service-locations\.css" />', s)
    s = s.replace(m.group(0), m.group(0) + f'\n    <script src="{m.group(1)}js/location-webdev.js" defer></script>', 1)
    if crlf:
        s = s.replace('\n', '\r\n')
    open(f, 'w', newline='', encoding='utf-8').write(s)
    return 'ok'


if __name__ == '__main__':
    files = sys.argv[1:] or glob.glob('locations/**/website-development-in-*.html', recursive=True)
    c = Counter()
    for f in files:
        try:
            c[process(f)] += 1
        except Exception as e:
            c['ERR'] += 1
            print(f, repr(e))
    print(c)
