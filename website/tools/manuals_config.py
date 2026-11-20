"""Shared config for the user-manual flip books. Add a product here, then run the three scripts with its key."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://www.pixelatenest.com"
MANUALS = {
    "hr": dict(
        name="NestHR", pdf="NestHR_Web_User_Manual.pdf", sub="", viewer="nesthr-user-manual.html",
        back="/products/attendance-payroll-software.html",
        blurb="A step by step guide to attendance, leave, payroll and reports.",
        desc="The complete NestHR user manual as a flip book. Read it online or download the PDF: attendance, leave, payroll and reports explained step by step.",
        pages=["products/attendance-payroll-software.html", "locations/*/*/products/attendance-management-software-in-*.html"],
        after="<!-- nesthr-why:end -->", fallback="<!-- SECTION: Why Choose NestHR -->",
    ),
    "leads": dict(
        name="Nest Leads", pdf="NestLeads_Web_User_Manual.pdf", sub="leads/", viewer="nestleads-user-manual.html",
        back="/products/lead-generation-software.html",
        blurb="A step by step guide to capturing leads, follow-ups, WhatsApp and reports.",
        desc="The complete Nest Leads user manual as a flip book. Read it online or download the PDF: lead capture, follow-ups, WhatsApp and reports explained step by step.",
        pages=["products/lead-generation-software.html", "locations/*/*/products/lead-management-software-in-*.html"],
        after=None, fallback="<!-- SECTION: Why Choose -->",
    ),
}
def d(m): return os.path.join(ROOT, "assets/docs/user-manual", m["sub"].rstrip("/"))
