!(function () {
  "use strict";

  function initializeContactButtons() {
    if (document.querySelector(".quick-contact-stack")) return;

    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .quick-contact-stack {
        position: fixed;
        right: 20px;
        bottom: 95px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 9998;
      }

      .quick-contact-btn {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #fff;
        font-size: 24px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.22);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        flex-shrink: 0;
      }

      .quick-contact-btn:hover {
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 10px 22px rgba(0, 0, 0, 0.28);
      }

      .quick-contact-whatsapp {
        background: #22c55e;
      }

      .quick-contact-call {
        background: #0f4ea8;
      }

      .quick-contact-upi {
        background: #f97316;
      }

      @media (max-width: 480px) {
        .quick-contact-stack {
          right: 15px;
          bottom: 80px;
          gap: 8px;
        }

        .quick-contact-btn {
          width: 56px;
          height: 56px;
          font-size: 22px;
        }
      }
    `;
    document.head.appendChild(styleEl);

    const container = document.createElement("div");
    container.className = "quick-contact-stack";
    container.setAttribute("aria-label", "Quick Contact Buttons");
    container.innerHTML = `
      <a
        class="quick-contact-btn quick-contact-whatsapp"
        href="https://wa.me/918406912345"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
      </a>
      <a
        class="quick-contact-btn quick-contact-call"
        href="tel:+918406912345"
        aria-label="Call Us"
        title="Call"
      >
        <i class="fas fa-phone-alt" aria-hidden="true"></i>
      </a>
      
    `;

    document.body.appendChild(container);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeContactButtons);
  } else {
    initializeContactButtons();
  }

  setTimeout(initializeContactButtons, 500);
})();
