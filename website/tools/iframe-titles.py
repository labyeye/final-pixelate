import re, subprocess
files = subprocess.run(['grep','-rl','<iframe','states','locations','--include=*.html'],capture_output=True,text=True).stdout.split()
def fix(m):
    t = m.group(0)
    if re.search(r'\btitle=', t): return t
    ttl = 'Pixelate Nest office location on Google Maps' if 'google.com/maps' in t else 'Product demo video'
    return t.replace('<iframe', f'<iframe title="{ttl}"', 1)
n = 0
for f in files:
    s = open(f,'rb').read().decode('utf-8')
    s2 = re.sub(r'<iframe[^>]*>', fix, s)
    if s2 != s: open(f,'wb').write(s2.encode('utf-8')); n += 1
print('done', n, len(files))
