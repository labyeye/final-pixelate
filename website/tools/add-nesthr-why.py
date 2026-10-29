"""Insert the plain-language "Why NestHR" story (problem -> fix -> steps -> who it helps -> quick answers) into
  products/attendance-payroll-software.html            (the main NestHR product page)
  locations/<state>/<city>/products/attendance-management-software.html   (NestHR in every city)

Run from anywhere:  python tools/add-nesthr-why.py
Idempotent: an existing block between the nesthr-why markers is replaced.
Run it AFTER tools/build-city-pages.py (which regenerates the city pages) and before/after add-value-guides.py, either order works.
To remove everything: strip text between <!-- nesthr-why:start --> and <!-- nesthr-why:end -->.
"""
import html, importlib.util, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

def nice(slug):
    return " ".join(w if w == "and" else w.capitalize() for w in slug.split("-"))

START, END = "<!-- nesthr-why:start -->", "<!-- nesthr-why:end -->"
CONTACT = "https://www.pixelatenest.com/pages/contact.html"
ANCHOR = re.compile(r"^[ \t]*<!-- SECTION: What is NestHR -->", re.M)

CSS = """<style>
.nhw{padding:64px 20px;background:#f7f9fd}.nhw *{box-sizing:border-box}
.nhw-in{max-width:1100px;margin:0 auto}
.nhw-tag{display:inline-block;font-size:.8rem;font-weight:700;letter-spacing:.08em;color:#fa731c;margin-bottom:10px}
.nhw h2{font-size:clamp(1.7rem,3.2vw,2.5rem);line-height:1.2;color:var(--primary-900,#054bab);margin:0 0 14px}
.nhw h3{font-size:1.3rem;line-height:1.3;color:var(--primary-900,#054bab);margin:0 0 10px}
.nhw h4{font-size:1.05rem;color:#111;margin:0 0 6px}
.nhw p,.nhw li{font-size:1rem;line-height:1.7;color:#333;margin:0}
.nhw .lead{font-size:1.15rem;max-width:860px;margin-bottom:8px}
.nhw .where{color:#555;margin-bottom:28px}
.nhw-blk{margin-top:52px}
.nhw-flow{display:flex;align-items:stretch;gap:12px;flex-wrap:wrap;margin:6px 0 10px}
.nhw-step{flex:1 1 200px;background:#fff;border:2px solid #054bab;border-radius:14px;padding:18px;text-align:center}
.nhw-step .nhw-ic{display:block;font-size:1.6rem;color:#054bab;margin-bottom:8px}
.nhw-step b{display:block;color:#111;margin-bottom:2px}
.nhw-arrow{display:flex;align-items:center;color:#fa731c;font-size:1.3rem}
.nhw-note{font-size:.95rem;color:#555}
.nhw-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:20px}
.nhw-card{background:#fff;border:1px solid rgba(5,75,171,.16);border-radius:14px;padding:20px}
.nhw-card .nhw-ic{width:42px;height:42px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:rgba(250,115,28,.12);color:#fa731c;font-size:1.1rem;margin-bottom:10px}
.nhw-card.good i{background:rgba(0,168,120,.12);color:#00a878}
.nhw-card p{font-size:.95rem}
.nhw-ba{margin-top:20px;border:2px solid #054bab;border-radius:14px;overflow:hidden;background:#fff}
.nhw-ba-row{display:grid;grid-template-columns:150px 1fr 1fr}
.nhw-ba-row>div{padding:14px 16px;font-size:.95rem;line-height:1.55;border-top:1px solid rgba(5,75,171,.14)}
.nhw-ba-row:first-child>div{border-top:0;background:#054bab;color:#fff;font-weight:700}
.nhw-ba-row>div:first-child{font-weight:700;color:#054bab}
.nhw-ba-row:first-child>div:first-child{color:#fff}
.nhw-ba-row>div:nth-child(2){color:#9a3412;background:#fff7ed}
.nhw-ba-row>div:nth-child(3){color:#065f46;background:#ecfdf5}
.nhw-ba-row:first-child>div:nth-child(2),.nhw-ba-row:first-child>div:nth-child(3){color:#fff}
.nhw-ba-row:first-child>div:nth-child(2){background:#c2410c}.nhw-ba-row:first-child>div:nth-child(3){background:#059669}
.nhw-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:20px}
.nhw-num{width:38px;height:38px;border-radius:50%;background:#054bab;color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;margin-bottom:10px}
.nhw-who{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:20px}
.nhw-who ul{margin:0;padding-left:20px}.nhw-who li{margin-bottom:8px;font-size:.95rem}
.nhw-easy{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:20px}
.nhw-faq details{border:1px solid rgba(5,75,171,.16);border-radius:12px;padding:14px 18px;margin-bottom:10px;background:#fff}
.nhw-faq summary{cursor:pointer;font-weight:600;color:var(--primary-900,#054bab)}
.nhw-faq details p{margin-top:10px}
.nhw-cta{margin-top:40px;text-align:center}
.nhw-cta a{display:inline-block;background:#fa731c;color:#fff;font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none}
.nhw-cta a:hover{background:#e0620f}
@media(max-width:860px){.nhw{padding:44px 16px}.nhw-grid,.nhw-steps,.nhw-who,.nhw-easy{grid-template-columns:1fr}
.nhw-ba-row{grid-template-columns:1fr}.nhw-ba-row:first-child{display:none}
.nhw-ba-row>div:nth-child(2):before{content:"Before: ";font-weight:700}.nhw-ba-row>div:nth-child(3):before{content:"With NestHR: ";font-weight:700}
.nhw-arrow{display:none}}
</style>"""

PROBLEMS = [
    ("📒", "Registers and Excel sheets", "Names get missed, dates go wrong, and nobody fully trusts the numbers."),
    ("🗓️", "Month-end salary rush", "Counting late marks, leave and overtime by hand takes days. One mistake means an argument."),
    ("💬", "Leave requests on WhatsApp", "Messages get buried in chats. Nobody knows who is on leave or how many leaves are left."),
    ("👥", "Proxy attendance", "A friend marks you present and there is no proof either way."),
    ("❓", "The same questions every month", "\u201cHow many leaves do I have?\u201d \u201cWhere is my payslip?\u201d All of it lands on you."),
    ("📄", "PF and ESI paperwork", "Reports for compliance are made in a hurry, at the last minute."),
]

BEFORE_AFTER = [
    ("Attendance", "Paper register or a signature sheet", "Staff check in by face, GPS, biometric or the mobile app. Time and place are saved."),
    ("Late marks", "You count them yourself", "Late and half-day are marked by the rules you set."),
    ("Leave", "A WhatsApp message, then you reply", "Staff apply in the app, you approve in one tap, and the balance updates by itself."),
    ("Salary", "Calculator, Excel and two days of work", "Salary is worked out from attendance, leave, overtime and deductions."),
    ("Payslip", "Typed or printed one by one", "Payslips are generated for you, and staff can see them in the app or on WhatsApp."),
    ("Reports", "Made in a rush at month-end", "PF, ESI and attendance reports are ready whenever you need them."),
]

HOW = [
    ("Add your team", "Add your employees, shifts and branches once. After that, you only change what changes."),
    ("Your team marks attendance", "Face, GPS, biometric or the mobile app. Time and place are saved automatically, which makes proxy attendance hard."),
    ("Approve and pay", "Leave requests reach you on your phone. At month-end salary is calculated from attendance, leave and overtime, and payslips go out, even on WhatsApp."),
]

WHO = [
    ("Owners and managers", ["See who is present, late or absent right now, from your phone", "Stop salary arguments with clear records", "Run more than one branch from one account"]),
    ("HR and accounts", ["Payroll in a few clicks instead of days", "PF, ESI and TDS reports ready to file", "Fewer mistakes and fewer corrections"]),
    ("Employees", ["Mark attendance and apply for leave from the phone", "See your own attendance, leave balance and payslip without asking HR", "Get HR updates on WhatsApp"]),
]

EASY = [
    ("👆", "Plain screens, plain words", "Big buttons and simple labels. If your team can use WhatsApp, they can use NestHR."),
    ("🔗", "Everything connected", "Attendance, leave and payroll are in one place, so you never type the same thing twice."),
    ("📱", "Same on phone and computer", "Use the mobile app or the website. You see the same data on both."),
    ("🎧", "A real team to help", "Ask us for a demo and we will walk you through it, in simple steps, on a call."),
]

FAQ = [
    ("What is NestHR in one line?", "It is attendance, leave and payroll software that works together, so you stop doing the same work in registers, Excel and WhatsApp."),
    ("Do I need to buy special machines?", "No. Employees can mark attendance on their phones with GPS or face recognition. If you already have biometric devices, NestHR can sync with them."),
    ("Does it work for more than one branch?", "Yes. NestHR supports multiple branches and departments from one account."),
    ("Is it only for big companies?", "No. It is made for growing businesses too. Pricing depends on the size of your team."),
    ("How do I start?", "Tell us a little about your team. We show you NestHR and help you get started."),
]


def block(city=None, state=None):
    e = lambda s: html.escape(s, quote=False)
    if city:
        C, S = nice(city), nice(state)
        where = f"Made for teams in {e(C)}, {e(S)}: shops, schools, factories, clinics, offices and agencies."
    else:
        where = "Made for Indian businesses: shops, schools, factories, clinics, offices and agencies."
    problems = "".join(
        f'<div class="nhw-card"><div class="nhw-ic" aria-hidden="true">{ic}</div><h4>{e(t)}</h4><p>{e(d)}</p></div>' for ic, t, d in PROBLEMS
    )
    rows = '<div class="nhw-ba-row"><div></div><div>Before</div><div>With NestHR</div></div>' + "".join(
        f"<div class=\"nhw-ba-row\"><div>{e(a)}</div><div>{e(b)}</div><div>{e(c)}</div></div>" for a, b, c in BEFORE_AFTER
    )
    steps = "".join(
        f'<div class="nhw-card"><div class="nhw-num">{i}</div><h4>{e(t)}</h4><p>{e(d)}</p></div>' for i, (t, d) in enumerate(HOW, 1)
    )
    who = "".join(
        f'<div class="nhw-card"><h4>{e(t)}</h4><ul>{"".join(f"<li>{e(x)}</li>" for x in items)}</ul></div>' for t, items in WHO
    )
    easy = "".join(
        f'<div class="nhw-card good"><div class="nhw-ic" aria-hidden="true">{ic}</div><h4>{e(t)}</h4><p>{e(d)}</p></div>' for ic, t, d in EASY
    )
    faq = "".join(f"<details><summary>{e(q)}</summary><p>{e(a)}</p></details>" for q, a in FAQ)
    return f"""{START}
{CSS}
<section class="nhw" id="why-nesthr" aria-labelledby="nhw-h2">
  <div class="nhw-in">
    <span class="nhw-tag">WHY NESTHR</span>
    <h2 id="nhw-h2">Why NestHR? Because managing your team should not take all week</h2>
    <p class="lead">NestHR is one simple app that records who came to work, handles leave, and calculates salary. You enter things once, and everything else follows.</p>
    <p class="where">{where}</p>

    <div class="nhw-flow" aria-label="How NestHR connects attendance, leave and salary">
      <div class="nhw-step"><div class="nhw-ic" aria-hidden="true">✅</div><b>Attendance</b><span>Who came, when, and where</span></div>
      <div class="nhw-arrow" aria-hidden="true">→</div>
      <div class="nhw-step"><div class="nhw-ic" aria-hidden="true">🌴</div><b>Leave</b><span>Requests, approvals, balance</span></div>
      <div class="nhw-arrow" aria-hidden="true">→</div>
      <div class="nhw-step"><div class="nhw-ic" aria-hidden="true">₹</div><b>Salary and payslip</b><span>Worked out for you</span></div>
    </div>
    <p class="nhw-note">Attendance feeds leave and payroll, so nothing is typed twice.</p>

    <div class="nhw-blk">
      <h3>The problem: HR work still runs on registers, Excel and WhatsApp</h3>
      <p>In most small and growing businesses the same things go wrong every month. You may have seen them too.</p>
      <div class="nhw-grid">{problems}</div>
    </div>

    <div class="nhw-blk">
      <h3>The fix: one place where everything connects</h3>
      <p>Here is what changes in your day-to-day work.</p>
      <div class="nhw-ba">{rows}</div>
    </div>

    <div class="nhw-blk">
      <h3>How it works: three simple steps</h3>
      <div class="nhw-steps">{steps}</div>
    </div>

    <div class="nhw-blk">
      <h3>Who it helps</h3>
      <div class="nhw-who">{who}</div>
    </div>

    <div class="nhw-blk">
      <h3>Why it is easy to understand and use</h3>
      <div class="nhw-easy">{easy}</div>
    </div>

    <div class="nhw-blk nhw-faq">
      <h3>Quick answers</h3>
      {faq}
    </div>

    <div class="nhw-cta"><a href="{CONTACT}">See NestHR in action</a></div>
  </div>
</section>
{END}
"""


def patch(path, **kw):
    s = open(path, encoding="utf-8", newline="").read()
    nl = "\r\n" if "\r\n" in s else "\n"
    s = re.sub(re.escape(START) + r".*?" + re.escape(END) + r"\r?\n?", "", s, flags=re.S)
    m = ANCHOR.search(s)
    if not m:
        return False
    b = block(**kw).replace("\n", nl)
    s = s[: m.start()] + b + s[m.start():]
    open(path, "w", encoding="utf-8", newline="").write(s)
    return True


def main():
    main_page = os.path.join(ROOT, "products", "attendance-payroll-software.html")
    ok = patch(main_page)
    print("main product page:", "updated" if ok else "ANCHOR NOT FOUND")
    n = missing = 0
    loc = os.path.join(ROOT, "locations")
    for state in sorted(os.listdir(loc)):
        sd = os.path.join(loc, state)
        if not os.path.isdir(sd):
            continue
        for city in sorted(os.listdir(sd)):
            p = os.path.join(sd, city, "products", "attendance-management-software.html")
            if not os.path.isfile(p):
                continue
            if patch(p, city=city, state=state):
                n += 1
            else:
                missing += 1
                print("anchor not found:", p)
    print(n, "city pages updated;", missing, "without anchor")


if __name__ == "__main__":
    main()
