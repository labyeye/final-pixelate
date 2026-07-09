// NestLeads lead-capture integration
const NESTLEADS_URL = "https://leads-backend.pixelatenest.com/api/public/leads";
const NESTLEADS_API_KEY =
  "nlk_live_b8b13ecdbff388b870f47ecc1b2ba45c04cfa397854337cf149c1c96817b52a9";

function sendToNestLeads(data) {
  try {
    fetch(NESTLEADS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": NESTLEADS_API_KEY,
      },
      body: JSON.stringify(data),
    }).catch(() => {});
  } catch (_) {}
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const t = e.target,
    n = t.querySelector('input[type="submit"]');
  ((n.value = "Sending..."), (n.disabled = !0));
  const a = new FormData(t),
    o = {
      name: a.get("name"),
      email: a.get("Email-Address"),
      phone: a.get("Phone"),
      subject: a.get("Enter-your-subject"),
      projectType: a.get("field"),
      message: a.get("Message"),
      selectedPlan: a.get("selected-plan"),
      budget: a.get("budget"),
    };
  try {
    const e = "https://backend.pixelatenest.com";
    if (
      !(
        await fetch((e || "") + "/api/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(o),
        })
      ).ok
    )
      throw new Error("Failed to save enquiry");
    try {
      await fetch((e || "") + "/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(o),
      });
    } catch (e) {}
    ((document.querySelector(".form-success-message").style.display = "block"),
      t.reset());
    if (typeof fbq === "function") {
      fbq("track", "Lead");
    }
  } catch (e) {
    document.querySelector(".form-error-message").style.display = "block";
  } finally {
    ((n.value = "Submit"), (n.disabled = !1));
  }
  return !1;
}

window.addEventListener("DOMContentLoaded", () => {
  // Pre-fill selected plan from localStorage (for modal/landing form)
  const plan = localStorage.getItem("selectedPlan");
  if (plan) {
    const planInput = document.getElementById("selected-plan");
    const subjectInput = document.getElementById("Enter-your-subject");
    if (planInput) planInput.value = plan;
    if (subjectInput) subjectInput.value = `Inquiry for ${plan}`;
    localStorage.removeItem("selectedPlan");
  }

  // Wire up the contact page's #contactForm (uses different field names)
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  // Show/hide the Product dropdown when "Products" is picked as the service
  const serviceSelect = contactForm.querySelector("#service");
  const productField = contactForm.querySelector("#product-field");
  const productSelect = contactForm.querySelector("#product");
  if (serviceSelect && productField) {
    const toggleProductField = () => {
      const isProducts = serviceSelect.value === "products";
      productField.style.display = isProducts ? "" : "none";
      if (productSelect) productSelect.required = isProducts;
      if (!isProducts && productSelect) productSelect.value = "";
    };
    serviceSelect.addEventListener("change", toggleProductField);
    toggleProductField();
  }

  const submitBtn = contactForm.querySelector(
    'button[type="submit"], input[type="submit"]',
  );
  const successEl = contactForm.querySelector(
    ".form-success-message, .w-form-done",
  );
  const errorEl = contactForm.querySelector(
    ".form-error-message, .w-form-fail",
  );

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (submitBtn) {
      if (submitBtn.tagName === "INPUT") submitBtn.value = "Sending...";
      else submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
    }
    if (successEl) successEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";

    const fd = new FormData(contactForm);
    const data = {
      name: fd.get("name"),
      email: fd.get("email") || fd.get("Email-Address"),
      phone: fd.get("phone") || fd.get("Phone"),
      subject: fd.get("subject") || fd.get("Enter-your-subject"),
      projectType: fd.get("service") || fd.get("field"),
      product: fd.get("product") || null,
      state: fd.get("state") || null,
      message: fd.get("message") || fd.get("Message"),
      budget: fd.get("budget") || null,
      selectedPlan: fd.get("selected-plan") || null,
      source: "contact-page",
    };

    // Whatever the user picked — a service (e.g. "Web Development") or,
    // when "Products" is selected, the specific product (e.g. "NestHR") —
    // send that as the "product" field to NestLeads.
    const isProducts = serviceSelect && serviceSelect.value === "products";
    const nestLeadsProduct =
      isProducts && productSelect && productSelect.selectedOptions[0]
        ? productSelect.selectedOptions[0].text
        : serviceSelect && serviceSelect.selectedOptions[0]
          ? serviceSelect.selectedOptions[0].text
          : null;

    sendToNestLeads({
      name: data.name,
      phone: data.phone,
      location: data.state,
      product: nestLeadsProduct,
    });

    try {
      const API_BASE =
        window.DASHBOARD_API_BASE && window.DASHBOARD_API_BASE.trim()
          ? window.DASHBOARD_API_BASE.replace(/\/$/, "")
          : "";

      const res = await fetch(API_BASE + "/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");

      try {
        await fetch(API_BASE + "/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });
      } catch (_) {}

      contactForm.reset();
      if (successEl) successEl.style.display = "block";
      if (typeof fbq === "function") {
        fbq("track", "Lead");
      }
    } catch (_) {
      if (errorEl) errorEl.style.display = "block";
    } finally {
      if (submitBtn) {
        if (submitBtn.tagName === "INPUT") submitBtn.value = "Send Message";
        else submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
      }
    }
  });
});
