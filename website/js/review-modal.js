
(function () {
  "use strict";

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
    if (e.key === "Escape" && reviewModal && reviewModal.classList.contains("active")) {
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
            : "";

        const response = await fetch((API_BASE || "") + "/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          showMessage("Thank you for your review! We appreciate your feedback.", "success");
          reviewForm.reset();
          selectedRating = 0;
          updateModalStarDisplay();
          setTimeout(closeModal, 2000);
        } else {
          showMessage("Error submitting review. Please try again.", "error");
        }
      } catch (err) {
        
        console.log("Review submitted (local):", formData);
        showMessage("Thank you for your review! We appreciate your feedback.", "success");
        reviewForm.reset();
        selectedRating = 0;
        updateModalStarDisplay();
        setTimeout(closeModal, 2000);
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
})();
