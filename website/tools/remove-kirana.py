import os, re
A = re.compile(r'<a\s[^>]*?kirana[^>]*?>.*?</a\s*>', re.S | re.I)
LI = re.compile(r'<li[^>]*>\s*(?:<a\s[^>]*?kirana[^>]*?>.*?</a\s*>)\s*</li>\s*', re.S | re.I)
n = 0
for r, d, fs in os.walk('.'):
    if r.startswith(('./purge-output', './tools', './assets', './node_modules')): continue
    for f in fs:
        if not f.endswith(('.html', '.xml', '.txt', '.js')): continue
        p = os.path.join(r, f)
        try: s = open(p, 'rb').read().decode('utf-8')
        except Exception: continue
        if 'irana' not in s: continue
        s2 = A.sub('', LI.sub('', s))
        if s2 != s: open(p, 'wb').write(s2.encode('utf-8')); n += 1
print('changed', n)
