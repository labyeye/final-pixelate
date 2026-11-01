import re, glob, os
n = 0
for f in glob.glob('states/*/*.html'):
    s = open(f, 'rb').read().decode('utf-8'); o = s
    st, city = f.replace(chr(92),'/').split('/')[1:3]; city = city[:-5]
    if not os.path.isdir(f'locations/{st}/{city}/services'): continue
    # carousel links -> city service pages
    a = s.find('class="svc-carousel-section"'); b = s.find('</section>', a)
    if a > 0:
        blk = re.sub(r'https://www\.pixelatenest\.com/services/([\w-]+\.html)',
            lambda m: f'https://www.pixelatenest.com/locations/{st}/{city}/services/{m.group(1)}'
            if os.path.exists(f'locations/{st}/{city}/services/{m.group(1)}') else m.group(0), s[a:b])
        s = s[:a] + blk + s[b:]
    # generic hero wording
    s = re.sub(r'Website Development Agency in(\s*<i)', r'Websites, Software &amp; Marketing in\1', s, 1)
    s = re.sub(r'A website development agency serving', 'Pixelate Nest serves', s, 1)
    if s != o: open(f,'wb').write(s.encode('utf-8')); n += 1
print('done', n)
