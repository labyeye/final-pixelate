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
      window.DASHBOARD_API_BASE && window.DASHBOARD_API_BASE.trim()
        ? window.DASHBOARD_API_BASE.replace(/\/$/, "")
        : "";
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
  const e = localStorage.getItem("selectedPlan");
  e &&
    ((document.getElementById("selected-plan").value = e),
    (document.getElementById("Enter-your-subject").value = `Inquiry for ${e}`),
    localStorage.removeItem("selectedPlan"));
});
