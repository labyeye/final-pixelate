"""Video-editing location pages: same restyle as web dev (cards, snake, masonry). Run from website/."""
import re, glob, importlib.util
from collections import Counter

spec = importlib.util.spec_from_file_location('wd', 'tools/restyle-webdev-locations.py')
wd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(wd)

wd.STEPS = [
 ('fa-lightbulb', 'Brief &amp; Concept', 'We understand your goals, audience, and platform to shape the right concept.'),
 ('fa-film', 'Footage Review', 'Raw footage is organized and the strongest moments are selected.'),
 ('fa-wand-magic-sparkles', 'Editing &amp; Motion', 'Pacing, transitions, captions, and graphics are layered in for maximum impact.'),
 ('fa-music', 'Color &amp; Sound', 'Color grading and audio mixing give the video a polished, professional finish.'),
 ('fa-eye', 'Review &amp; Revisions', 'Revisions based on your feedback until every frame feels right.'),
 ('fa-paper-plane', 'Final Delivery', 'Final export in all the formats and aspect ratios your platforms need.'),
]
BEN_ICONS = ['fa-eye', 'fa-palette', 'fa-clock', 'fa-photo-film']

tpl = open('locations/delhi/rohini/services/website-development-in-rohini.html', newline='', encoding='utf-8').read().replace('\r\n', '\n')
sa = tpl.index('<!-- portfolio-masonry -->')
sb = tpl.index('</style>', sa) + len('</style>')
pa = tpl.index('<section class="portfolio-works">')
pb = tpl.index('</section>', pa)
pe = tpl.index('</script>', tpl.index('<script data-service="web-development">', pb)) + len('</script>')
MAS = (tpl[sa:sb] + '\n' + tpl[pa:pe]).replace('data-service="web-development"', 'data-service="video-editing"')
assert 'Rohini' in MAS


def process(f):
    s = open(f, newline='', encoding='utf-8').read()
    crlf = '\r\n' in s
    s = s.replace('\r\n', '\n')
    if 'pn-snake' in s:
        return 'skip'
    city = re.search(r'every size\s+in\s+([^.<]+?)\.', s).group(1).strip()
    s = wd.cards_section(s, '<h2 class="crm-heading">Core Video Editing Capabilities</h2>', 3)
    s = wd.cards_section(s, '<h2 class="crm-heading">Business Benefits of Video Editing</h2>', 4, BEN_ICONS)
    s = s.replace('fa-solid fa-bolt"', 'fa-solid fa-clock"')
    a, b = wd.span(s, '<h2 class="crm-heading">Our Process</h2>')
    s = s[:a] + wd.snake().replace('How We Build Your Website', 'How We Create Your Videos') + s[b:]
    a, b = wd.span(s, '<h2 class="crm-heading">UI Preview</h2>')
    s = s[:a] + MAS.replace('Rohini', city) + s[b:]
    m = re.search(r'<link rel="stylesheet" href="((?:\.\./)+)css/pages/service-locations\.css" />', s)
    s = s.replace(m.group(0), m.group(0) + f'\n    <script src="{m.group(1)}js/location-webdev.js" defer></script>', 1)
    if crlf:
        s = s.replace('\n', '\r\n')
    open(f, 'w', newline='', encoding='utf-8').write(s)
    return 'ok'


if __name__ == '__main__':
    c = Counter()
    for f in glob.glob('locations/**/video-editing-in-*.html', recursive=True):
        try:
            c[process(f)] += 1
        except Exception as e:
            c['ERR'] += 1
            print(f, repr(e))
    print(c)
