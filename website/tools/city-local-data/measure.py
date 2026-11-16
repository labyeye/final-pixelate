import re, html, glob, os, random, statistics
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
fs = [f for f in glob.glob('locations/**/attendance-management-software-in-*.html', recursive=True)]
def sh(f):
    s = open(f, encoding='utf-8-sig').read()
    m = re.search(r'<title>Attendance Management Software in (.*?) \| NestHR', s); c = html.unescape(m.group(1)) if m else ''
    s = s[s.index('<body'):]
    s = re.sub(r'<(script|style|nav|footer)[\s\S]*?</\1>', '', s)
    t = re.sub(r'\s+', ' ', html.unescape(re.sub('<[^>]+>', ' ', s))).lower()
    for x in {c.lower(), c.split(',')[0].lower()}:
        if x: t = t.replace(x, 'CITY')
    w = t.split()
    return {' '.join(w[i:i + 5]) for i in range(len(w) - 4)}, len(w)
random.seed(1); smp = random.sample(fs, 40)
S = {f: sh(f) for f in smp}
vals = []
for i in range(0, 40, 2):
    a, b = S[smp[i]][0], S[smp[i + 1]][0]
    vals.append(len(a & b) / len(a | b))
print('avg shingle overlap between random city pairs: %.2f' % statistics.mean(vals), 'avg words', int(statistics.mean(v[1] for v in S.values())))
