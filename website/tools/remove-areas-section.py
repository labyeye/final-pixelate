import re, glob
R = re.compile(r'<section class="mzp-areas" aria-labelledby="mzp-areas-h2".*?</section>[ \t]*(\r?\n)+', re.S)
n = 0
for f in glob.glob('states/*/*.html'):
    s = open(f, 'rb').read().decode('utf-8')
    s2, c = R.subn('', s, 1)
    if c: open(f, 'wb').write(s2.encode('utf-8')); n += 1
print('done', n)
