!(function () {
  "use strict";
  if (document.querySelector(".quick-contact-stack")) return;
  const n = document.createElement("style");
  ((n.textContent =
    "\n    .quick-contact-stack {\n      position: fixed;\n      right: 20px;\n      bottom: 95px;\n      display: flex;\n      flex-direction: column;\n      gap: 10px;\n      z-index: 9998;\n    }\n\n    .quick-contact-btn {\n      width: 60px;\n      height: 60px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      text-decoration: none;\n      color: #fff;\n      font-size: 24px;\n      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.22);\n      transition: transform 0.2s ease, box-shadow 0.2s ease;\n    }\n\n    .quick-contact-btn:hover {\n      transform: translateY(-2px) scale(1.04);\n      box-shadow: 0 10px 22px rgba(0, 0, 0, 0.28);\n    }\n\n    .quick-contact-whatsapp {\n      background: #22c55e;\n    }\n\n    .quick-contact-call {\n      background: #0f4ea8;\n    }\n\n    @media (max-width: 480px) {\n      .quick-contact-stack {\n        right: 15px;\n        bottom: 80px;\n        gap: 8px;\n      }\n\n      .quick-contact-btn {\n        width: 56px;\n        height: 56px;\n        font-size: 22px;\n      }\n    }\n  "),
    document.head.appendChild(n));
  const t = document.createElement("div");
  ((t.className = "quick-contact-stack"),
    t.setAttribute("aria-label", "Quick Contact Buttons"),
    (t.innerHTML =
      '\n    <a\n      class="quick-contact-btn quick-contact-whatsapp"\n      href="https://wa.me/918406912345"\n      target="_blank"\n      rel="noopener noreferrer"\n      aria-label="Chat on WhatsApp"\n      title="WhatsApp"\n    >\n      <i class="fab fa-whatsapp" aria-hidden="true"></i>\n    </a>\n    <a\n      class="quick-contact-btn quick-contact-call"\n      href="tel:+918406912345"\n      aria-label="Call Us"\n      title="Call"\n    >\n      <i class="fas fa-phone-alt" aria-hidden="true"></i>\n    </a>\n  '),
    document.body.appendChild(t));
})();
