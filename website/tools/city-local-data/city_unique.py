import re, os, glob, html, collections
SC = r'C:/Users/labhb/AppData/Local/Temp/claude/95451ab311fd5c79/d1a57714-2cd2-4370-9c22-e21d2cb9d5fd/scratchpad/'
os.chdir(r'd:/projects/Pixelate Nest/final-pixelate/website')
DATA = {}
for fn in ('cities1.txt', 'cities2.txt', 'cities3.txt'):
    for line in open(SC + fn, encoding='utf-8').read().splitlines():
        if line.strip():
            k, b, s = line.split('|'); DATA[k] = (b, s.split(','))
# sector -> (card title, text with {C})
SEC = {
 'tex': ('Textile, garment and powerloom units', 'Shift-wise biometric or face punches for weavers, tailors and helpers in {C}, overtime tracked automatically during export or festival rush, and salary worked out from attendance.'),
 'jew': ('Jewellery and showroom staff', 'Showroom and karigar attendance in {C} with branch-wise punches, late marks by shift, and payroll that matches the days actually worked.'),
 'cer': ('Ceramic and factory floors', 'Large rotating shifts in {C} need quick punch-in at the gate. NestHR records every shift, calculates overtime and keeps contract and permanent staff in one register.'),
 'agro': ('Agro-processing, mandis and farm-linked work', 'Seasonal staff in {C} join and leave with the harvest. Add them quickly, mark attendance by phone, and close payroll without chasing paper registers.'),
 'tea': ('Tea gardens and plantation offices', 'Plantation and estate offices near {C} can record attendance for office staff, supervisors and field teams and keep wage calculations in one system.'),
 'tour': ('Hotels, resorts and tourism operators', 'Hotels and tour operators in {C} run split shifts and seasonal peaks. Roster staff by shift, track overtime, and handle leave without WhatsApp back-and-forth.'),
 'edu': ('Schools, coaching institutes and colleges', 'Teachers and support staff in {C} can mark attendance by face or GPS, apply for leave in the app, and get salary and payslips on time.'),
 'health': ('Clinics, hospitals and labs', 'Doctors, nurses and technicians in {C} work in rotating shifts. NestHR tracks shift attendance, on-call overtime and leave in one place.'),
 'retail': ('Shops, showrooms and wholesale counters', 'Multi-counter and multi-branch retail in {C} gets one dashboard for who is in, who is late and what each branch owes in salary.'),
 'it': ('IT, BPO and corporate offices', 'Office teams in {C} can use app or web check-in with a geo-fence, track work-from-office days, and send clean attendance data to payroll.'),
 'steel': ('Steel, mining and heavy-industry contractors', 'Contract labour and plant staff around {C} change by project. Track attendance by gate punch or face, and keep contractor and permanent payroll separate.'),
 'power': ('Power, oil and energy contractors', 'Site crews and contractors near {C} work in shifts across locations. Geo-fenced check-in and shift rules keep attendance accurate for payroll.'),
 'pharma': ('Pharma and chemical plants', 'Production shifts in {C} need strict attendance records. NestHR keeps shift punches, overtime and compliance reports ready for audits.'),
 'logi': ('Transport, warehousing and logistics', 'Drivers, loaders and warehouse staff in {C} can check in by GPS or app, and supervisors see attendance across depots in one view.'),
 'build': ('Construction and real-estate sites', 'Site engineers and labour in {C} move between projects. Geo-fenced site attendance and daily records make wage calculation straightforward.'),
 'msme': ('Small factories and MSME units', 'Small workshops in {C} usually run on paper registers. NestHR replaces them with simple mobile or biometric attendance and automatic salary calculation.'),
 'port': ('Ports, shipping and cargo handling', 'Shift crews and cargo teams near {C} need exact in and out times. NestHR records shifts, overtime and leave and feeds them into payroll.'),
 'auto': ('Auto-parts and engineering units', 'Machine-shop and assembly shifts in {C} are timing-sensitive. Biometric or face attendance with automatic overtime keeps the shop floor and payroll aligned.'),
 'food': ('Food processing, dairy and sweet makers', 'Early-morning and rotating shifts in {C} are easier to manage when attendance is captured at the door and overtime is calculated by rule.'),
 'govt': ('Government contractors and project offices', 'Contractor teams and project offices in {C} can keep attendance records, leave and salary reports organised for client or audit review.'),
 'secur': ('Security, facility and manpower agencies', 'Guards and facility staff in {C} are posted at many sites. GPS or selfie attendance shows who reported where, and roster and payroll follow from it.'),
 'border': ('Border-trade and transit businesses', 'Trading and transit firms in {C} run long and irregular hours. Mobile attendance with location records makes staff hours and pay clear.'),
 'mfg': ('Manufacturing and industrial units', 'Factories in {C} can run gate or face attendance, shift rules and overtime in one system, and send accurate days-worked data to payroll.'),
 'hand': ('Handicraft and handloom workshops', 'Artisan workshops in {C} can record daily attendance on a phone, track advances and leave, and calculate monthly pay without a separate notebook.'),
 'fish': ('Fishing, aquaculture and seafood units', 'Processing and packing teams in {C} work to tide and season. Flexible shifts and quick mobile attendance keep records usable for payroll.'),
}
# city name map from titles
names = {}
files = {}
for f in glob.glob('locations/**/attendance-management-software-in-*.html', recursive=True):
    f = f.replace(chr(92), '/')
    parts = f.split('/'); st, ci = parts[1], parts[2]
    s = open(f, encoding='utf-8-sig').read()
    m = re.search(r'<title>Attendance Management Software in (.*?) \| NestHR</title>', s)
    names[f'{st}/{ci}'] = html.unescape(m.group(1)) if m else ci.title()
    files[f'{st}/{ci}'] = f
bystate = collections.defaultdict(list)
for k in sorted(files): bystate[k.split('/')[0]].append(k)
miss = [k for k in files if k not in DATA]; extra = [k for k in DATA if k not in files]
print('missing data', miss, 'extra', extra)
C = collections.Counter()
e = html.escape
for k, f in files.items():
    if k not in DATA: continue
    st = k.split('/')[0]; blurb, secs = DATA[k]; city = names[k].split(',')[0].strip()
    s = open(f, encoding='utf-8-sig', newline='').read()
    s = re.sub(r'\s*<section class="lc" id="local-use-cases">[\s\S]*?</section>', '', s)
    cards = ''.join(f'<div class="lc-card"><h3>{e(SEC[x][0])}</h3><p>{e(SEC[x][1].format(C=city))}</p></div>' for x in secs)
    lst = bystate[st]; i = lst.index(k)
    near = [lst[j] for j in range(max(0, i - 2), min(len(lst), i + 3)) if j != i][:4]
    links = ''.join(f'<li><a href="../../{n.split("/")[1]}/products/attendance-management-software-in-{n.split("/")[1]}.html">{e(names[n].split(",")[0].strip())}</a></li>' for n in near)
    near_card = f'<div class="lc-card"><h3>Also in {e(st.replace("-", " ").title())}</h3><p>We also set up NestHR attendance for businesses in nearby cities:</p><ul class="lc-chips">{links}</ul></div>' if links else ''
    sec = (f'<section class="lc" id="local-use-cases"><div class="lc-in"><span class="lc-eyebrow">{e(city)} businesses</span>'
           f'<h2>How {e(city)} businesses use attendance software</h2>'
           f'<p>{e(city)} is {e(blurb)}. Each of these needs a different attendance setup, and NestHR lets you run all of them from one account.</p>'
           f'<div class="lc-grid">{cards}{near_card}</div></div></section>')
    m = re.search(r'<section class="lc" id="local-context">[\s\S]*?</section>', s)
    if not m: C['no_lc'] += 1; continue
    s = s[:m.end()] + '\n      ' + sec + s[m.end():]
    open(f, 'w', encoding='utf-8-sig', newline='').write(s); C['ok'] += 1
print(C)
