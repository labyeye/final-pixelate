window.addEventListener("DOMContentLoaded", () => {
  const selectedPlan = localStorage.getItem("selectedPlan");
  if (selectedPlan) {
    document.getElementById("selected-plan").value = selectedPlan;

    document.getElementById("Enter-your-subject").value =
      `Inquiry for ${selectedPlan}`;
    localStorage.removeItem("selectedPlan");
  }
});

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('input[type="submit"]');
  submitButton.value = "Sending...";
  submitButton.disabled = true;

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    email: formData.get("Email-Address"),
    phone: formData.get("Phone"),
    subject: formData.get("Enter-your-subject"),
    projectType: formData.get("field"),
    message: formData.get("Message"),
    selectedPlan: formData.get("selected-plan"),
    budget: formData.get("budget"),
  };

  try {
    const API_BASE =
      window.DASHBOARD_API_BASE && window.DASHBOARD_API_BASE.trim()
        ? window.DASHBOARD_API_BASE.replace(/\/$/, "")
        : "";

    const saveRes = await fetch((API_BASE || "") + "/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!saveRes.ok) throw new Error("Failed to save enquiry");

    try {
      await fetch((API_BASE || "") + "/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
    } catch (e) {}

    document.querySelector(".form-success-message").style.display = "block";
    form.reset();
  } catch (error) {
    document.querySelector(".form-error-message").style.display = "block";
  } finally {
    submitButton.value = "Submit";
    submitButton.disabled = false;
  }

  return false;

  document.querySelector(".form-error-message").style.display = "block";
}
