// Check for selected plan on page load
window.addEventListener("DOMContentLoaded", () => {
  const selectedPlan = localStorage.getItem("selectedPlan");
  if (selectedPlan) {
    document.getElementById("selected-plan").value = selectedPlan;
    // Optional: Update subject field with plan name
    document.getElementById(
      "Enter-your-subject"
    ).value = `Inquiry for ${selectedPlan}`;
    localStorage.removeItem("selectedPlan"); // Clear after setting
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
  };

  try {
    // Resolve API base (dashboard) if provided
    const API_BASE = (window.DASHBOARD_API_BASE && window.DASHBOARD_API_BASE.trim()) ? window.DASHBOARD_API_BASE.replace(/\/$/, '') : '';
    // First, store the enquiry in the app backend so it appears in the dashboard
    const saveRes = await fetch((API_BASE || '') + '/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!saveRes.ok) throw new Error('Failed to save enquiry');

    // Also send the existing email notification (keep old behavior)
    try {
      // Call dashboard's send-email endpoint (if API_BASE not set, assumes same origin)
      await fetch((API_BASE || '') + '/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
    } catch (e) {
      // Non-fatal: email sending can fail but enquiry is saved
      console.warn('Dashboard email send failed', e);
    }

    // Show success message
    document.querySelector('.form-success-message').style.display = 'block';
    form.reset();
  } catch (error) {
    console.error('Error:', error);
    document.querySelector('.form-error-message').style.display = 'block';
  } finally {
    submitButton.value = 'Submit';
    submitButton.disabled = false;
  }

  return false;

  document.querySelector(".form-error-message").style.display = "block";
}
