(function () {
  "use strict";

  // Pages that only carry the footer stars (no modal markup) get the modal injected,
  // and every page gets black text in the form fields (global.css makes them white).
  const CSS = `
.review-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99999;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}
.review-modal.active{display:flex}
.review-modal-content{background:#fff;border-radius:12px;padding:32px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.3);color:#111}
.review-modal .modal-close{position:absolute;top:16px;right:16px;background:none;border:none;font-size:28px;cursor:pointer;color:#999;width:32px;height:32px;line-height:1}
.review-modal .modal-title{margin:0 0 8px;font-size:28px;font-weight:600;color:#111}
.review-modal .modal-subtitle{margin:0 0 24px;color:#666;font-size:14px}
.review-modal .review-form{display:flex;flex-direction:column;gap:16px}
.review-modal .form-row{display:flex;gap:16px}
.review-modal .form-row .form-group{flex:1;min-width:0}
.review-modal .form-group{display:flex;flex-direction:column;gap:6px}
.review-modal .form-group label{font-weight:500;font-size:14px;color:#333}
.review-modal .form-group input,.review-modal .form-group select,.review-modal .form-group textarea{padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;font-family:inherit;color:#111 !important;background:#fff !important;width:100%}
.review-modal .form-group input::placeholder,.review-modal .form-group textarea::placeholder{color:#888}
.review-modal .form-group input:focus,.review-modal .form-group select:focus,.review-modal .form-group textarea:focus{outline:none;border-color:#0f4ea8;box-shadow:0 0 0 3px rgba(15,78,168,.1)}
.review-modal .form-group textarea{resize:vertical;min-height:100px}
.review-modal .modal-stars{display:flex;gap:6px}
.review-modal .modal-star{cursor:pointer;transition:transform .15s}
.review-modal .form-actions{display:flex;gap:12px;justify-content:flex-end}
.review-modal .btn-primary,.review-modal .btn-secondary{padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;border:1px solid transparent}
.review-modal .btn-primary{background:#0f4ea8;color:#fff}
.review-modal .btn-secondary{background:#fff;color:#333;border-color:#ddd}
.review-modal .form-message{display:none;padding:10px 12px;border-radius:6px;font-size:14px}
.review-modal .form-message.success{background:#dcfce7;color:#166534}
.review-modal .form-message.error{background:#fee2e2;color:#991b1b}
@media (max-width:640px){.review-modal .form-row{flex-direction:column}.review-modal-content{padding:20px}}`;

  const STAR =
    '<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
  const stars = [1, 2, 3, 4, 5]
    .map(
      (n) =>
        '<svg class="modal-star" data-rating="' + n + '" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' + STAR + "</svg>",
    )
    .join("");

  const HTML =
    '<div class="review-modal" id="reviewModal" aria-hidden="true"><div class="review-modal-content">' +
    '<button type="button" class="modal-close" id="closeModal" aria-label="Close modal">&times;</button>' +
    '<h2 class="modal-title">Share Your Experience</h2>' +
    '<p class="modal-subtitle">We\'d love to hear about your experience working with us</p>' +
    '<form id="reviewForm" class="review-form">' +
    '<div class="form-row"><div class="form-group"><label for="reviewName">Your Name *</label><input type="text" id="reviewName" name="name" required placeholder="John Doe" /></div>' +
    '<div class="form-group"><label for="reviewEmail">Email Address *</label><input type="email" id="reviewEmail" name="email" required placeholder="john@example.com" /></div></div>' +
    '<div class="form-row"><div class="form-group"><label for="reviewBrand">Your Brand/Company *</label><input type="text" id="reviewBrand" name="brand" required placeholder="Company Name" /></div>' +
    '<div class="form-group"><label for="reviewWorkDone">What Service Did We Provide? *</label><select id="reviewWorkDone" name="workDone" required><option value="">Select a service...</option>' +
    "<option>Video Editing</option><option>Web Development</option><option>App Development</option><option>Software Development</option><option>Digital Marketing</option><option value=\"UI/UX Design\">UI/UX Design</option><option>Other</option></select></div></div>" +
    '<div class="form-group"><label>Your Rating *</label><div class="modal-stars" id="modalStars">' + stars + '</div><input type="hidden" id="reviewRating" name="rating" /></div>' +
    '<div class="form-group"><label for="reviewMessage">Your Testimonial *</label><textarea id="reviewMessage" name="message" required rows="5" placeholder="Tell us about your experience working with Pixelate Nest..."></textarea></div>' +
    '<div class="form-actions"><button type="button" class="btn-secondary" id="cancelReview">Cancel</button><button type="submit" class="btn-primary" id="submitReview">Submit Review</button></div>' +
    '<div class="form-message" id="formMessage"></div></form></div></div>';

  function ensureModal() {
    if (!document.getElementById("footer-review-stars")) return;
    if (!document.getElementById("pn-review-style")) {
      const st = document.createElement("style");
      st.id = "pn-review-style";
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    if (!document.getElementById("reviewModal")) {
      document.body.insertAdjacentHTML("beforeend", HTML);
    }
  }

  function boot() {
    ensureModal();

  const reviewModal = document.getElementById("reviewModal");
  const closeModalBtn = document.getElementById("closeModal");
  const cancelReviewBtn = document.getElementById("cancelReview");
  const reviewForm = document.getElementById("reviewForm");
  const footerStars = document.getElementById("footer-review-stars");
  const modalStars = document.querySelectorAll(".modal-star");
  const reviewRatingInput = document.getElementById("reviewRating");
  const formMessage = document.getElementById("formMessage");

  if (!reviewModal || !footerStars) return;

  let selectedRating = 0;

  if (footerStars) {
    footerStars.addEventListener("click", (e) => {
      if (e.target.classList.contains("star")) {
        openModal();
      }
    });

    const footerStarElements = footerStars.querySelectorAll(".star");
    footerStarElements.forEach((star) => {
      star.addEventListener("mouseenter", function () {
        const hoverValue = this.getAttribute("data-value");
        updateFooterStarDisplay(hoverValue);
      });

      star.addEventListener("click", function () {
        openModal();
      });
    });

    footerStars.addEventListener("mouseleave", () => {
      updateFooterStarDisplay(0);
    });
  }

  if (modalStars.length) {
    modalStars.forEach((star) => {
      star.addEventListener("click", function () {
        selectedRating = parseInt(this.getAttribute("data-rating"), 10);
        reviewRatingInput.value = selectedRating;
        updateModalStarDisplay();
      });

      star.addEventListener("mouseenter", function () {
        const hoverValue = parseInt(this.getAttribute("data-rating"), 10);
        updateModalStarPreview(hoverValue);
      });
    });

    document.getElementById("modalStars").addEventListener("mouseleave", () => {
      updateModalStarDisplay();
    });
  }

  function openModal() {
    if (reviewModal) {
      reviewModal.classList.add("active");
      reviewModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      const firstInput = reviewForm.querySelector("input");
      if (firstInput) firstInput.focus();
    }
  }

  function closeModal() {
    if (reviewModal) {
      reviewModal.classList.remove("active");
      reviewModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  function updateFooterStarDisplay(rating) {
    const stars = footerStars.querySelectorAll(".star");
    stars.forEach((star) => {
      const value = parseInt(star.getAttribute("data-value"), 10);
      star.style.color = value <= rating ? "#fbbf24" : "#d1d5db";
    });
  }

  function updateModalStarDisplay() {
    if (!modalStars.length) return;
    modalStars.forEach((star) => {
      const rating = parseInt(star.getAttribute("data-rating"), 10);
      if (rating <= selectedRating) {
        star.style.fill = "#FFD700";
        star.style.stroke = "#FFD700";
      } else {
        star.style.fill = "none";
        star.style.stroke = "#FFD700";
      }
    });
  }

  function updateModalStarPreview(hoverValue) {
    if (!modalStars.length) return;
    modalStars.forEach((star) => {
      const rating = parseInt(star.getAttribute("data-rating"), 10);
      if (rating <= hoverValue) {
        star.style.fill = "#FFD700";
        star.style.stroke = "#FFD700";
        star.style.opacity = "1";
      } else {
        star.style.fill = "none";
        star.style.stroke = "#FFD700";
        star.style.opacity = "0.5";
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (cancelReviewBtn) {
    cancelReviewBtn.addEventListener("click", closeModal);
  }

  if (reviewModal) {
    reviewModal.addEventListener("click", (e) => {
      if (e.target === reviewModal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      reviewModal &&
      reviewModal.classList.contains("active")
    ) {
      closeModal();
    }
  });

  if (reviewForm) {
    reviewForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!selectedRating) {
        alert("Please select a rating");
        return;
      }

      const formData = {
        name: document.getElementById("reviewName").value,
        email: document.getElementById("reviewEmail").value,
        brand: document.getElementById("reviewBrand").value,
        workDone: document.getElementById("reviewWorkDone").value,
        rating: selectedRating,
        message: document.getElementById("reviewMessage").value,
        timestamp: new Date().toISOString(),
      };

      try {
        const API_BASE =
          window.DASHBOARD_API_BASE && window.DASHBOARD_API_BASE.trim()
            ? window.DASHBOARD_API_BASE.replace(/\/$/, "")
            : "https://backend.pixelatenest.com";

        const response = await fetch((API_BASE || "") + "/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          showMessage(
            "Thank you for your review! We appreciate your feedback.",
            "success",
          );
          reviewForm.reset();
          selectedRating = 0;
          updateModalStarDisplay();
          setTimeout(closeModal, 2000);
        } else {
          showMessage("Error submitting review. Please try again.", "error");
        }
      } catch (err) {
        showMessage(
          "Could not reach the server. Please check your connection and try again.",
          "error",
        );
      }
    });
  }

  function showMessage(message, type) {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.className = "form-message " + type;
      formMessage.style.display = "block";
    }
  }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
