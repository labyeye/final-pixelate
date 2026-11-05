"""App / software / UI-UX / hosting / digital-marketing location pages: same restyle as web dev + video. Run from website/."""
import re, glob, sys, importlib.util
from collections import Counter

spec = importlib.util.spec_from_file_location('wd', 'tools/restyle-webdev-locations.py')
wd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(wd)

POOL = ['fa-clock', 'fa-magnifying-glass-chart', 'fa-bullseye', 'fa-pen-to-square']

SVC = {
 'app-development': dict(
  caps=['Core App Development Capabilities'], bens=['Business Benefits of App Development'], masonry='move',
  head='How We Build Your App',
  steps=[('fa-lightbulb', 'Discovery &amp; Strategy', 'We map your users, goals, and platform needs into a clear app brief.'),
         ('fa-pen-ruler', 'UI / UX Design', 'Wireframes and prototypes that make every screen simple to use.'),
         ('fa-mobile-screen', 'App Development', 'Clean, scalable Android and iOS code built in agile sprints.'),
         ('fa-shield-halved', 'Testing &amp; QA', 'Device, performance, and security testing before anything ships.'),
         ('fa-rocket', 'Store Launch', 'Play Store and App Store submission handled end to end.'),
         ('fa-headset', 'Support &amp; Updates', 'Ongoing fixes, OS updates, and new features as you grow.')]),
 'software-development': dict(
  caps=['Core Software Development Capabilities'], bens=['Business Benefits of Software Development'], masonry='move',
  head='How We Build Your Software',
  steps=[('fa-lightbulb', 'Requirements Analysis', 'We study your workflows and pain points to define what to build.'),
         ('fa-sitemap', 'Architecture &amp; Design', 'A scalable architecture and clear interface plan before coding starts.'),
         ('fa-code', 'Agile Development', 'Working builds every sprint, so you see progress early and often.'),
         ('fa-shield-halved', 'Testing &amp; QA', 'Automated and manual testing to catch issues before release.'),
         ('fa-rocket', 'Deployment', 'Smooth rollout with data migration, training, and monitoring.'),
         ('fa-headset', 'Support &amp; Maintenance', 'Updates, security patches, and dedicated support after go-live.')]),
 'ui-ux-design': dict(
  caps=['Core UI/UX &amp; Branding Capabilities', 'Core UI/UX & Branding Capabilities'],
  bens=['Business Benefits of UI/UX &amp; Branding', 'Business Benefits of UI/UX & Branding'], masonry=None,
  head='How We Design Your Brand',
  steps=[('fa-lightbulb', 'Discovery &amp; Research', 'We study your brand, users, and competitors to find the right direction.'),
         ('fa-sitemap', 'Wireframing', 'Structure and flows mapped out before any visual design begins.'),
         ('fa-palette', 'Visual Design', 'Colour, type, and layouts that express your brand with clarity.'),
         ('fa-mobile-screen', 'Prototype &amp; Feedback', 'Clickable prototypes tested and refined with your feedback.'),
         ('fa-swatchbook', 'Brand &amp; Handoff', 'Brand guidelines and developer-ready assets delivered together.'),
         ('fa-headset', 'Ongoing Support', 'Design updates and new assets whenever your brand evolves.')]),
 'website-hosting-maintenance': dict(
  caps=['Core Hosting &amp; Maintenance Capabilities', 'Core Hosting & Maintenance Capabilities'],
  bens=['Business Benefits of Hosting &amp; Maintenance', 'Business Benefits of Hosting & Maintenance'], masonry=None,
  head='How We Keep Your Site Running',
  steps=[('fa-lightbulb', 'Audit &amp; Planning', 'We review your site, traffic, and risks to plan the right setup.'),
         ('fa-cloud', 'Setup &amp; Migration', 'Fast, secure hosting with zero-downtime migration.'),
         ('fa-shield-halved', 'Security Hardening', 'SSL, firewalls, and malware protection configured from day one.'),
         ('fa-database', 'Monitoring &amp; Backups', 'Uptime monitoring and regular backups you can restore from.'),
         ('fa-clock', 'Updates &amp; Optimization', 'Regular updates and speed tuning to keep performance sharp.'),
         ('fa-headset', 'Priority Support', 'A real team to call when something needs fixing fast.')]),
 'digital-marketing': dict(
  caps=['Every Channel, One Accountable Team'], bens=[r'Business Benefits for [^<]+?', 'What You Get When You Work With Us'], extra=[r'Who We Help Grow in [^<]+?', 'What You Get When You Work With Us', r'Our Digital Marketing Services in [^<]+?', r'Industries We Market in [^<]+?'], masonry=None, opt=True, proc=['Our Process', 'How We Work', r'How a [^<]+? Campaign Runs'],
  head='How We Grow Your Business',
  steps=[('fa-lightbulb', 'Audit &amp; Research', 'We study your current presence, competitors, and what your buyers search for.'),
         ('fa-sitemap', 'Strategy &amp; Planning', 'A channel mix, budget split, and content calendar built around your goals.'),
         ('fa-bullhorn', 'Campaign Execution', 'Ads, content, and SEO go live with daily monitoring.'),
         ('fa-clock', 'Optimization', 'Weekly tuning of targeting, creatives, and bids to cut cost per lead.'),
         ('fa-chart-column', 'Reporting', 'Monthly reports that show exactly what worked and why.'),
         ('fa-rocket', 'Scaling', 'We put more budget behind what works and grow your results.')]),
}


def heading_re(texts):
    return re.compile(r'<h2 class="crm-heading">\s*(?:' + '|'.join(texts) + r')\s*</h2>')


def pick_cols(s, hm):
    a, b = wd.span(s, hm)
    n = len(re.findall(r'<article class="crm-card', s[a:b]))
    return n if n in (2, 3, 4) else (4 if n and n % 4 == 0 else 3)


def convert(s, texts, icons=None):
    m = heading_re(texts).search(s)
    assert m, texts
    h = m.group(0)
    return wd.cards_section(s, h, pick_cols(s, h), icons)


def process(f, svc, cfg):
    s = open(f, newline='', encoding='utf-8').read()
    crlf = '\r\n' in s
    s = s.replace('\r\n', '\n')
    if 'pn-snake' in s:
        return 'skip'
    def conv(texts, icons=None):
        nonlocal s
        try:
            s = convert(s, texts, icons)
        except (AssertionError, ValueError):
            if not cfg.get('opt'):
                raise
    conv(cfg['caps'])
    for t in cfg.get('extra', []):
        conv([t], POOL)
    conv(cfg['bens'], POOL)
    s = s.replace('fa-solid fa-android', 'fa-brands fa-android').replace('fa-solid fa-apple"', 'fa-brands fa-apple"')
    s = s.replace('<i class="fa-solid fa-bolt"></i></span>', '<i class="fa-solid fa-clock"></i></span>')
    wd.STEPS = cfg['steps']
    pm = heading_re(cfg.get('proc', ['Our Process'])).search(s)
    a, b = wd.span(s, pm.group(0))
    s = s[:a] + wd.snake().replace('How We Build Your Website', cfg['head']) + s[b:]
    if cfg['masonry'] == 'move':
        pa = s.index('<section class="portfolio-works">')
        pb = s.index('</section>', pa) + len('</section>')
        sc = s.index('</script>', s.index(f'<script data-service="{svc}">', pb)) + len('</script>')
        mas = s[pa:sc]
        s = s[:pa] + s[sc:]
        a, b = wd.span(s, '<h2 class="crm-heading">UI Preview</h2>')
        s = s[:a] + mas + s[b:]
    m = re.search(r'<link rel="stylesheet" href="((?:\.\./)+)css/pages/service-locations\.css" />', s)
    s = s.replace(m.group(0), m.group(0) + f'\n    <script src="{m.group(1)}js/location-webdev.js" defer></script>', 1)
    if crlf:
        s = s.replace('\n', '\r\n')
    open(f, 'w', newline='', encoding='utf-8').write(s)
    return 'ok'


if __name__ == '__main__':
    only = sys.argv[1:] or list(SVC)
    c = Counter()
    for svc in only:
        for f in glob.glob(f'locations/**/{svc}-in-*.html', recursive=True):
            try:
                c[svc, process(f, svc, SVC[svc])] += 1
            except Exception as e:
                c[svc, 'ERR'] += 1
                if c[svc, 'ERR'] < 3:
                    print(f, repr(e))
    print(c)
