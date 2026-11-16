import json, re, glob, collections, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
from html.parser import HTMLParser
class P(HTMLParser):
    def __init__(s): super().__init__(); s.d = 0; s.sec = 0
    def handle_starttag(s, t, a): s.d += t == 'div'; s.sec += t == 'section'
    def handle_endtag(s, t): s.d -= t == 'div'; s.sec -= t == 'section'
c = collections.Counter(); tot = collections.Counter(); bad = []
for f in glob.glob('locations/*/*/products/attendance-management-software-in-*.html'):
    f = f.replace(chr(92), '/'); s = open(f, encoding='utf-8-sig').read(); st = f.split('/')[1]; tot[st] += 1
    hand = 'Offices, shops and factories in' not in s and '"FAQPage"' in s and 'id="buyers-guide"' in s
    p = P(); p.feed(s)
    try:
        for m in re.finditer(r'ld\+json[^>]*>([\s\S]*?)</script>', s): json.loads(m.group(1))
    except Exception: bad.append(f)
    if hand:
        c[st] += 1
        if p.d or p.sec or s.count('"FAQPage"') != 1: bad.append(f)
print('hand-written', sum(c.values()), 'of', sum(tot.values()), 'problems', bad[:5], len(bad))
print({k: f'{c[k]}/{tot[k]}' for k in sorted(tot) if c[k] < tot[k]})
