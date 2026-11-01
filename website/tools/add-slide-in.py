import os
TAG = '<script src="https://www.pixelatenest.com/js/slide-in.js" defer></script>'
n = 0
for r, d, fs in os.walk('.'):
    if r.startswith(('./purge-output', './tools', './assets', './js', './css')): continue
    for f in fs:
        if not f.endswith('.html') or f in ('404.html',) or f.startswith('dashboard'): continue
        p = os.path.join(r, f); s = open(p, 'rb').read().decode('utf-8', 'ignore')
        if 'slide-in.js' in s or '/js/main.js' not in s or '</body>' not in s: continue
        open(p, 'wb').write(s.replace('</body>', TAG + '</body>', 1).encode('utf-8')); n += 1
print('added', n)
