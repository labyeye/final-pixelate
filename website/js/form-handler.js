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
    const e =
      "https://backend.pixelatenest.com";
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

  const submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
  const successEl = contactForm.querySelector(".form-success-message, .w-form-done");
  const errorEl = contactForm.querySelector(".form-error-message, .w-form-fail");

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
      message: fd.get("message") || fd.get("Message"),
      budget: fd.get("budget") || null,
      selectedPlan: fd.get("selected-plan") || null,
      source: "contact-page",
    };

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
