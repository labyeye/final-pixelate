import zlib, re, os
SC = os.path.dirname(os.path.abspath(__file__))
COST = [["Worker count, shifts and number of sites", "Gate devices or app-only attendance", "Payroll and statutory report needs"],
        ["How many people work each shift", "Face, biometric or app check-in", "PF, ESI and payslips in the same system"],
        ["Total headcount including contract labour", "Number of locations and gates", "Reports your clients or auditors ask for"],
        ["Size of permanent and temporary teams", "Hardware you already have installed", "How much of payroll you want automated"]]
def load(fn):
    P = {}
    for line in open(os.path.join(SC, fn), encoding='utf-8').read().splitlines():
        line = line.strip()
        if not line or line.startswith('#'): continue
        key, lead, who, exp, mis, f1, f2 = line.split('|')
        city = key.split('/')[1].replace('-', ' ').title()
        name = city.replace(' Da ', ' da ')
        faq = [tuple(x.split('#', 1)) for x in (f1, f2)]
        faq.append((f"Is support available in {name}?", "Yes. Setup and training run over call, WhatsApp and screen-sharing, with on-site help for larger teams."))
        v = zlib.crc32(key.encode()) % 4
        P[key] = dict(lead=lead, cards=[
            (f"Who needs this in {name}", who.split(';')), (f"What {name} employers should expect", exp.split(';')),
            ("Cost factors", COST[v]), ("Mistakes to avoid", mis.split(';'))], faq=faq)
    return P
