!(function () {
  "use strict";
  let e = {
    service_type: null,
    project_type: null,
    website_type: null,
    number_of_pages: null,
    domain_status: null,
    hosting_status: null,
    cms_required: null,
    addons_selected: [],
    budget_hint: null,
    timeline: null,
    conversationStep: 0,
    chatHistory: [],
    video_type: null,
    video_quantity: null,
    video_budget: null,
    duration: null,
    platform: null,
    user_count: null,
    features: null,
    negotiation_requested: !1,
    userName: null,
    userEmail: null,
    userPhone: null,
    isProcessing: !1,
  };
  const t = {
      static: { min: 15e3, max: 3e4 },
      dynamic: { min: 3e4, max: 6e4 },
      portfolio: { min: 2e4, max: 4e4 },
      ecommerce: { min: 6e4, max: 15e4 },
      webapp: { min: 8e4, max: 2e5 },
      desktop_app: { min: 1e5, max: 3e5 },
      saas: { min: 15e4, max: 5e5 },
      crm_erp: { min: 2e5, max: 8e5 },
      custom_software: "custom",
      simple_app: { min: 8e4, max: 15e4 },
      medium_app: { min: 15e4, max: 3e5 },
      complex_app: { min: 3e5, max: 8e5 },
      basic_video: { min: 5e3, max: 15e3 },
      professional_video: { min: 15e3, max: 4e4 },
      commercial_video: { min: 4e4, max: 1e5 },
      video_package: { min: 5e4, max: 2e5 },
    },
    n = { min: 3e3, max: 6e3 },
    i = { min: 5e3, max: 15e3 },
    o = { min: 3e3, max: 1e4 },
    s = 1e4;
  function a() {
    document.body.insertAdjacentHTML(
      "beforeend",
      '\n      <div id="pixy-chatbot-widget">\n        \x3c!-- Chat Button --\x3e\n        <button id="pixy-chat-button" class="pixy-chat-button" aria-label="Chat with Pixy">\n          <svg class="pixy-icon pixy-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>\n          </svg>\n          <svg class="pixy-icon pixy-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n            <line x1="18" y1="6" x2="6" y2="18"></line>\n            <line x1="6" y1="6" x2="18" y2="18"></line>\n          </svg>\n          <span class="pixy-notification-badge">1</span>\n        </button>\n\n        \x3c!-- Chat Modal --\x3e\n        <div id="pixy-chat-modal" class="pixy-chat-modal">\n          <div class="pixy-chat-header">\n            <div class="pixy-chat-header-info">\n              <div class="pixy-avatar">\n                <img src="./assets/images/logos/pixylogo.webp" alt="Pixy" />\n              </div>\n              <div>\n                <h3>Pixy</h3>\n                <p class="pixy-status"><span class="pixy-status-dot"></span>Online - Ready to help!</p>\n              </div>\n            </div>\n            <button id="pixy-close-modal" class="pixy-close-btn" aria-label="Close chat">\n              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                <line x1="18" y1="6" x2="6" y2="18"></line>\n                <line x1="6" y1="6" x2="18" y2="18"></line>\n              </svg>\n            </button>\n          </div>\n\n          <div id="pixy-chat-messages" class="pixy-chat-messages">\n            \x3c!-- Messages will be added here --\x3e\n          </div>\n\n          <div class="pixy-chat-input-container">\n            <input \n              type="text" \n              id="pixy-chat-input" \n              class="pixy-chat-input" \n              placeholder="Type your message..."\n              autocomplete="off"\n            />\n            <button id="pixy-send-btn" class="pixy-send-btn" aria-label="Send message">\n              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                <line x1="22" y1="2" x2="11" y2="13"></line>\n                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>\n              </svg>\n            </button>\n          </div>\n        </div>\n      </div>\n    ',
    );
    const e = document.getElementById("pixy-chat-button"),
      t =
        (document.getElementById("pixy-chat-modal"),
        document.getElementById("pixy-close-modal")),
      n = document.getElementById("pixy-chat-input"),
      i = document.getElementById("pixy-send-btn");
    (document.getElementById("pixy-chat-messages"),
      document.querySelector(".pixy-notification-badge"));
    (e.addEventListener("click", r),
      t.addEventListener("click", c),
      i.addEventListener("click", p),
      n.addEventListener("keypress", function (e) {
        "Enter" === e.key && p();
      }),
      setTimeout(() => {
        (l(
          "Hi, I'm Pixy 👋 I help you find the perfect solution for your business needs!",
        ),
          setTimeout(() => {
            (l("Which service are you interested in?"),
              u([
                "Web Development",
                "Software Development",
                "App Development",
                "Video Editing",
                "Not Sure",
              ]));
          }, 800));
      }, 500));
  }
  function r() {
    const e = document.getElementById("pixy-chat-modal"),
      t = document.getElementById("pixy-chat-button"),
      n = document.querySelector(".pixy-notification-badge");
    (t.classList.toggle("active"),
      e.classList.toggle("active"),
      e.classList.contains("active") &&
        (document.getElementById("pixy-chat-input").focus(),
        (n.style.display = "none")));
  }
  function c() {
    const e = document.getElementById("pixy-chat-modal");
    (document.getElementById("pixy-chat-button").classList.remove("active"),
      e.classList.remove("active"));
  }
  function l(t, n = !1) {
    const i = document.getElementById("pixy-chat-messages"),
      o = document.createElement("div");
    o.className = "pixy-message pixy-bot-message";
    const s = `\n      <div class="pixy-message-avatar">\n        <img src="./assets/images/logos/pixylogo.webp" alt="Pixy" />\n      </div>\n      <div class="pixy-message-content">\n        ${n ? t : `<p>${t}</p>`}\n      </div>\n    `;
    ((o.innerHTML = s),
      i.appendChild(o),
      f(),
      e.chatHistory.push({ role: "bot", message: t }));
  }
  function d(t) {
    const n = document.getElementById("pixy-chat-messages"),
      i = document.createElement("div");
    ((i.className = "pixy-message pixy-user-message"),
      (i.innerHTML = `\n      <div class="pixy-message-content">\n        <p>${t}</p>\n      </div>\n    `),
      n.appendChild(i),
      f(),
      e.chatHistory.push({ role: "user", message: t }));
  }
  function u(e) {
    const t = document.getElementById("pixy-chat-messages"),
      n = document.createElement("div");
    ((n.className = "pixy-quick-replies"),
      e.forEach((e) => {
        const t = document.createElement("button");
        ((t.className = "pixy-quick-reply-btn"),
          (t.textContent = e),
          (t.onclick = () =>
            (function (e) {
              (document
                .querySelectorAll(".pixy-quick-replies")
                .forEach((e) => e.remove()),
                d(e),
                m(e));
            })(e)),
          n.appendChild(t));
      }),
      t.appendChild(n),
      f());
  }
  async function p() {
    const t = document.getElementById("pixy-chat-input"),
      n = t.value.trim();
    n &&
      !e.isProcessing &&
      ((e.isProcessing = !0),
      (t.disabled = !0),
      d(n),
      (t.value = ""),
      document
        .querySelectorAll(".pixy-quick-replies")
        .forEach((e) => e.remove()),
      (function () {
        const e = document.getElementById("pixy-chat-messages"),
          t = document.createElement("div");
        ((t.className = "pixy-message pixy-bot-message pixy-typing"),
          (t.id = "pixy-typing-indicator"),
          (t.innerHTML =
            '\n      <div class="pixy-message-avatar">\n        <img src="./assets/images/logos/pixylogo.webp" alt="Pixy" />\n      </div>\n      <div class="pixy-message-content">\n        <div class="pixy-typing-dots">\n          <span></span>\n          <span></span>\n          <span></span>\n        </div>\n      </div>\n    '),
          e.appendChild(t),
          f());
      })(),
      setTimeout(() => {
        (!(function () {
          const e = document.getElementById("pixy-typing-indicator");
          e && e.remove();
        })(),
          m(n),
          (e.isProcessing = !1),
          (t.disabled = !1),
          t.focus());
      }, 800));
  }
  function m(n) {
    const i = n.toLowerCase();
    if ("restart" === i || "start over" === i || "reset" === i)
      return (
        (document.getElementById("pixy-chat-messages").innerHTML = ""),
        (e = {
          service_type: null,
          project_type: null,
          website_type: null,
          number_of_pages: null,
          domain_status: null,
          hosting_status: null,
          cms_required: null,
          addons_selected: [],
          budget_hint: null,
          timeline: null,
          conversationStep: 0,
          chatHistory: [],
          video_type: null,
          video_quantity: null,
          video_budget: null,
          duration: null,
          platform: null,
          user_count: null,
          features: null,
          negotiation_requested: !1,
          userName: null,
          userEmail: null,
          userPhone: null,
          isProcessing: !1,
        }),
        l("🔄 Let's start fresh!"),
        void setTimeout(() => {
          (l("Which service are you interested in?"),
            u([
              "Web Development",
              "Software Development",
              "App Development",
              "Video Editing",
            ]));
        }, 500)
      );
    if ("help" === i || "?" === i || "commands" === i)
      return (
        l("📚 Here's how I can help you:"),
        l("✅ I can provide quotes for:"),
        l("  • Web Development (websites, e-commerce, web apps)"),
        l("  • Software Development (desktop apps, SaaS, CRM/ERP)"),
        l("  • App Development (iOS, Android, cross-platform)"),
        l("  • Video Editing (short reels, professional edits)"),
        l(""),
        l("💬 Commands:"),
        l("  • Type 'restart' to start a new conversation"),
        l("  • Type 'help' to see this message again"),
        l(""),
        l("📞 Contact: +91-84069 12345"),
        l("📧 Email: support@pixelatenest.com"),
        l(""),
        void l("Let's continue! Where were we? 😊")
      );
    if (e.service_type) {
      if ("web-dev" === e.service_type) {
        if (!e.project_type)
          return (
            i.includes("information") || i.includes("informational")
              ? (e.project_type = "information")
              : i.includes("business")
                ? (e.project_type = "business")
                : i.includes("ecommerce") ||
                    i.includes("e-commerce") ||
                    i.includes("shop")
                  ? (e.project_type = "ecommerce")
                  : i.includes("portfolio")
                    ? (e.project_type = "portfolio")
                    : (i.includes("web app") || i.includes("application")) &&
                      (e.project_type = "webapp"),
            void (
              e.project_type &&
              (l(
                "Do you want a static website (content only) or a dynamic website (admin panel, forms, updates)?",
              ),
              u(["Static", "Dynamic", "Not sure"]))
            )
          );
        if (!e.website_type)
          return (
            i.includes("static") || i.includes("content only")
              ? ((e.website_type = "static"),
                l("✅ Static website selected - Great for simple, fast sites!"))
              : i.includes("dynamic") || i.includes("admin")
                ? ((e.website_type = "dynamic"),
                  l(
                    "✅ Dynamic website selected - Perfect for interactive features!",
                  ))
                : i.includes("not sure") &&
                  ((e.website_type =
                    "ecommerce" === e.project_type ? "dynamic" : "static"),
                  l(
                    `✅ I'd recommend a ${e.website_type} website for your needs.`,
                  )),
            void (
              e.website_type &&
              (l("Roughly how many pages do you need?"),
              u(["1-3 pages", "4-6 pages", "7-10 pages", "Not sure"]))
            )
          );
        if (!e.number_of_pages)
          return (
            i.includes("1-3") || i.match(/\b[1-3]\b/)
              ? (e.number_of_pages = "1-3")
              : i.includes("4-6") || i.match(/\b[4-6]\b/)
                ? (e.number_of_pages = "4-6")
                : i.includes("7-10") || i.match(/\b[7-9]\b|10/)
                  ? (e.number_of_pages = "7-10")
                  : i.includes("not sure") &&
                    ((e.number_of_pages = "4-6"),
                    l("I'd suggest 4-6 pages for most websites.")),
            void (
              e.number_of_pages &&
              (l("Do you already own a domain name?"), u(["Yes", "No"]))
            )
          );
        if (null === e.domain_status)
          return (
            (e.domain_status =
              i.includes("yes") || i.includes("have") ? "yes" : "no"),
            l("Do you need hosting included?"),
            void u(["Yes", "No"])
          );
        if (null === e.hosting_status)
          return (
            (e.hosting_status =
              i.includes("yes") || i.includes("need") ? "yes" : "no"),
            l("Do you want the ability to update content yourself later?"),
            void u(["Yes", "No"])
          );
        if (null === e.cms_required)
          return (
            (e.cms_required =
              i.includes("yes") || i.includes("want") ? "yes" : "no"),
            (e.conversationStep = 7),
            l("Would you like any of these add-ons?"),
            void u(["SEO setup", "Maintenance", "Content writing", "None"])
          );
        if (7 === e.conversationStep)
          return (
            i.includes("seo") && e.addons_selected.push("seo"),
            i.includes("maintenance") && e.addons_selected.push("maintenance"),
            i.includes("content") && e.addons_selected.push("content_writing"),
            (e.conversationStep = 8),
            l("When are you planning to launch?"),
            void u(["Urgent (2-3 weeks)", "Normal (1 month)", "Flexible"])
          );
      }
      if ("software-dev" === e.service_type) {
        if (!e.project_type)
          return (
            i.includes("desktop")
              ? (e.project_type = "desktop_app")
              : i.includes("saas") || i.includes("cloud")
                ? (e.project_type = "saas")
                : i.includes("crm") || i.includes("erp")
                  ? (e.project_type = "crm_erp")
                  : i.includes("custom") &&
                    (e.project_type = "custom_software"),
            void (
              e.project_type &&
              ((e.conversationStep = 2),
              l(
                "Great! Can you briefly describe the key features you need? (e.g., user management, reporting, inventory, etc.)",
              ))
            )
          );
        if (2 === e.conversationStep)
          return (
            (e.features = n),
            (e.conversationStep = 3),
            l("How many users will be using this software?"),
            void u([
              "1-5 users",
              "5-20 users",
              "20-50 users",
              "50+ users (Enterprise)",
            ])
          );
        if (!e.user_count)
          return (
            i.includes("5") || i.includes("small")
              ? (e.user_count = "1-5")
              : i.includes("20") || i.includes("medium")
                ? (e.user_count = "5-20")
                : i.includes("50") || i.includes("large")
                  ? (e.user_count = "20-50")
                  : (i.includes("enterprise") || i.includes("100")) &&
                    (e.user_count = "50+"),
            void (
              e.user_count &&
              (l("What's your expected timeline?"),
              u([
                "Urgent (1-2 months)",
                "Normal (3-4 months)",
                "Flexible (6+ months)",
              ]),
              (e.conversationStep = 0))
            )
          );
      }
      if ("app-dev" === e.service_type) {
        if (!e.project_type)
          return (
            i.includes("simple") || i.includes("basic")
              ? (e.project_type = "simple_app")
              : i.includes("medium") || i.includes("moderate")
                ? (e.project_type = "medium_app")
                : (i.includes("complex") || i.includes("advanced")) &&
                  (e.project_type = "complex_app"),
            void (
              e.project_type &&
              (l("Which platform(s) do you need?"),
              u(["iOS only", "Android only", "Both iOS & Android"]))
            )
          );
        if (!e.platform)
          return (
            i.includes("ios") && i.includes("android")
              ? (e.platform = "both")
              : i.includes("ios")
                ? (e.platform = "ios")
                : i.includes("android") && (e.platform = "android"),
            void (
              e.platform &&
              ((e.conversationStep = 3),
              l("What key features do you need?"),
              u([
                "User Authentication",
                "Payment Integration",
                "Push Notifications",
                "Maps/Location",
                "None of these",
              ]))
            )
          );
        if (3 === e.conversationStep)
          return (
            i.includes("auth") && e.addons_selected.push("authentication"),
            i.includes("payment") && e.addons_selected.push("payment"),
            i.includes("push") && e.addons_selected.push("notifications"),
            i.includes("map") && e.addons_selected.push("maps"),
            (e.conversationStep = 4),
            l("When do you want to launch?"),
            u(["Urgent (2-3 months)", "Normal (4-6 months)", "Flexible"]),
            void (e.conversationStep = 0)
          );
      }
      if ("video-editing" === e.service_type) {
        if (!e.video_quantity) {
          const t = n.match(/\d+/);
          return void (t
            ? ((e.video_quantity = t[0]),
              l(
                `Got it! ${e.video_quantity} videos. Now, what type of videos do you need?`,
              ),
              setTimeout(() => y(), 500))
            : i.includes("one") || i.includes("single")
              ? ((e.video_quantity = "1"),
                l(
                  "Perfect! One video. What type of video editing do you need?",
                ),
                setTimeout(() => y(), 500))
              : l(
                  "Please tell me how many videos you need. Just type a number (e.g., 5, 10, 30)",
                ));
        }
        if (!e.video_type)
          return (
            i.includes("basic") || i.includes("simple") || i.includes("1")
              ? ((e.video_type = "basic_video"),
                (e.project_type = "basic_video"))
              : i.includes("professional") ||
                  i.includes("pro") ||
                  i.includes("2")
                ? ((e.video_type = "professional_video"),
                  (e.project_type = "professional_video"))
                : (i.includes("commercial") ||
                    i.includes("ad") ||
                    i.includes("3") ||
                    i.includes("cinematic") ||
                    i.includes("premium") ||
                    i.includes("4")) &&
                  ((e.video_type = "commercial_video"),
                  (e.project_type = "commercial_video")),
            void (
              e.video_type &&
              (l("What's the typical duration of each video?"),
              u([
                "1 - 30 seconds",
                "2 - 1-2 minutes",
                "3 - 3-5 minutes",
                "4 - 5+ minutes",
              ]))
            )
          );
        if (!e.duration)
          return (
            i.includes("30") || i.includes("short") || i.includes("1")
              ? (e.duration = "30 seconds")
              : i.includes("60") || i.includes("1-2") || i.includes("2")
                ? (e.duration = "1-2 minutes")
                : i.includes("3-5") || i.includes("medium") || i.includes("3")
                  ? (e.duration = "3-5 minutes")
                  : (i.includes("5+") ||
                      i.includes("long") ||
                      i.includes("4")) &&
                    (e.duration = "5+ minutes"),
            void (
              e.duration &&
              (function () {
                const n = parseInt(e.video_quantity) || 1;
                if ("30 seconds" === e.duration) {
                  let e, t;
                  n <= 25
                    ? ((e = 1500),
                      (t = 1500 * n),
                      l(`Great! For ${n} short reels (30 seconds each):`),
                      l(
                        `💰 Price: ₹1,500 per video × ${n} = ₹${t.toLocaleString("en-IN")}`,
                      ))
                    : ((e = 1200),
                      (t = 1200 * n),
                      l(
                        `Awesome! For ${n} short reels (30 seconds each), you get bulk pricing:`,
                      ),
                      l(
                        `💰 Price: ₹1,200 per video × ${n} = ₹${t.toLocaleString("en-IN")}`,
                      ),
                      l(
                        `🎉 You saved ₹${(300 * n).toLocaleString("en-IN")} with bulk discount!`,
                      ));
                } else {
                  let i = t[e.video_type];
                  if ("object" == typeof i) {
                    const t = i.min * n,
                      o = i.max * n;
                    (l(
                      `Based on ${n} ${e.video_type.replace("_", " ")} video(s), the estimated range would be:`,
                    ),
                      l(
                        `💰 ₹${t.toLocaleString("en-IN")} - ₹${o.toLocaleString("en-IN")}`,
                      ));
                  }
                }
                l(
                  "What's your budget for this project? (Type amount in ₹ or say 'flexible')",
                );
              })()
            )
          );
        if (!e.video_budget) {
          const t = n.match(/[\d,]+/);
          if (t) e.video_budget = t[0].replace(/,/g, "");
          else {
            if (!i.includes("flexible") && !i.includes("not sure"))
              return void l(
                "Could you specify your budget? (e.g., 50000 or 'flexible')",
              );
            e.video_budget = "flexible";
          }
          return (
            l("What's your deadline?"),
            u([
              "1 - Urgent (within 1 week)",
              "2 - Normal (2-3 weeks)",
              "3 - Flexible (1 month+)",
            ]),
            void (e.conversationStep = 0)
          );
        }
        if (!e.timeline)
          return (
            i.includes("urgent") || i.includes("week") || i.includes("1")
              ? (e.timeline = "urgent")
              : i.includes("normal") || i.includes("2-3") || i.includes("2")
                ? (e.timeline = "normal")
                : (i.includes("flexible") ||
                    i.includes("month") ||
                    i.includes("3")) &&
                  (e.timeline = "flexible"),
            void (e.timeline && v())
          );
      }
      if (!e.timeline && "video-editing" !== e.service_type)
        return (
          i.includes("urgent") || i.includes("week")
            ? (e.timeline = "urgent")
            : i.includes("normal") || i.includes("month")
              ? (e.timeline = "normal")
              : i.includes("flexible") && (e.timeline = "flexible"),
          void (e.timeline && v())
        );
      e.conversationStep >= 10 && e.conversationStep <= 13
        ? (function (t) {
            const n = t.toLowerCase();
            if (12 === e.conversationStep)
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)
                ? ((e.userEmail = t),
                  l("✅ Email saved!"),
                  l(
                    "And your phone number? (Optional - type 'skip' if you don't want to share)",
                  ),
                  void (e.conversationStep = 13))
                : (l("⚠️ That doesn't look like a valid email address."),
                  void l(
                    "Please enter a valid email (e.g., name@example.com):",
                  ));
            if (13 === e.conversationStep) {
              if ("skip" === n)
                ((e.userPhone = ""),
                  l("📝 No problem, we'll proceed without your phone number."));
              else {
                if (
                  !/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(
                    t.replace(/\s/g, ""),
                  )
                )
                  return (
                    l("⚠️ That doesn't look like a valid phone number."),
                    void l(
                      "Please enter a valid Indian phone number (10 digits) or type 'skip':",
                    )
                  );
                ((e.userPhone = t), l("✅ Phone number saved!"));
              }
              return void (async function () {
                l("Submitting your details... ⏳");
                try {
                  const t = {
                      name: e.userName,
                      email: e.userEmail,
                      phone: e.userPhone,
                      service_type: e.service_type,
                      project_type: e.project_type,
                      website_type: e.website_type,
                      number_of_pages: e.number_of_pages,
                      video_quantity: e.video_quantity,
                      video_type: e.video_type,
                      video_budget: e.video_budget,
                      duration: e.duration,
                      platform: e.platform,
                      user_count: e.user_count,
                      addons: e.addons_selected,
                      timeline: e.timeline,
                      negotiation_requested: e.negotiation_requested,
                      conversation_history: e.chatHistory,
                      timestamp: new Date().toISOString(),
                    },
                    n = "https://backend.pixelatenest.com/api/pixy-lead",
                    i = await fetch(n, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      mode: "cors",
                      body: JSON.stringify(t),
                    });
                  if (i.ok)
                    (l(
                      "Perfect! ✅ Your contact form has been automatically submitted!",
                    ),
                      l(
                        "Our team will reach out to you within 24 hours to discuss your project in detail. 🚀",
                      ),
                      l(
                        "For urgent queries, feel free to call us at: 📞 <strong>+91-84069 12345</strong>",
                      ),
                      l("Thank you for choosing Pixelate Nest! 💼"));
                  else {
                    await i.text();
                    (l(
                      "⚠️ We encountered an issue submitting your form. But don't worry!",
                    ),
                      l("We've saved your details: " + e.userEmail),
                      l(
                        "Our team will reach out soon. You can also contact us directly:",
                      ),
                      l("📧 support@pixelatenest.com"),
                      l("📞 +91-84069 12345"));
                  }
                } catch (t) {
                  try {
                    const e = JSON.parse(
                      localStorage.getItem("pixy_backup_leads") || "[]",
                    );
                    (e.push(leadData),
                      localStorage.setItem(
                        "pixy_backup_leads",
                        JSON.stringify(e),
                      ));
                  } catch (e) {}
                  (l("⚠️ Connection issue detected!"),
                    l(""),
                    l("Don't worry! We've saved your information:"),
                    l("👤 Name: " + e.userName),
                    l("📧 Email: " + e.userEmail),
                    e.userPhone && l("📞 Phone: " + e.userPhone),
                    l(""),
                    l("🔧 This might be because:"),
                    l("  • You're viewing from a local file (file://)"),
                    l("  • Network connectivity issue"),
                    l(""),
                    l("📞 Please contact us directly:"),
                    l("📧 support@pixelatenest.com"),
                    l("📞 +91-84069 12345"),
                    l(""),
                    l(
                      "💡 Send us an email and we'll respond within 24 hours!",
                    ));
                }
              })();
            }
            if (11 === e.conversationStep)
              return t.length < 2
                ? void l("⚠️ Please enter your full name.")
                : ((e.userName = t),
                  l(`Nice to meet you, ${t}! 😊 What's your email address?`),
                  void (e.conversationStep = 12));
            if (n.includes("negotiate") || n.includes("negotiation"))
              return (
                (e.negotiation_requested = !0),
                l("I understand you'd like to discuss pricing. 💰"),
                l(
                  "For price negotiations and custom packages, please contact our team directly:",
                ),
                l("📞 <strong>+91-84069 12345</strong>"),
                l("📧 <strong>support@pixelatenest.com</strong>"),
                l(""),
                l(
                  "Would you still like to fill the contact form so we can reach out to you?",
                ),
                u(["Yes, fill form", "No, I'll call directly"]),
                void (e.conversationStep = 11)
              );
            n.includes("yes") ||
            n.includes("connect") ||
            n.includes("consultation") ||
            n.includes("proposal") ||
            n.includes("email") ||
            n.includes("fill form")
              ? (l("Perfect! Let me collect your details:"),
                l("What's your name?"),
                (e.conversationStep = 11))
              : (n.includes("no") ||
                  n.includes("not interested") ||
                  n.includes("later") ||
                  n.includes("call directly")) &&
                l(
                  "No problem! Feel free to reach out anytime. Have a great day! 😊",
                );
          })(n)
        : (l("I didn't quite catch that. Could you please clarify?"),
          l("💡 Tip: Type 'help' for assistance or 'restart' to start over."));
    } else
      i.includes("web dev") || i.includes("website")
        ? ((e.service_type = "web-dev"),
          l("Great choice! Let's build your website. 🌐"),
          setTimeout(
            () => (
              l("What type of website do you need?"),
              void u([
                "Information website",
                "Business website",
                "E-commerce website",
                "Portfolio",
                "Web application",
              ])
            ),
            500,
          ))
        : i.includes("software") || i.includes("desktop")
          ? ((e.service_type = "software-dev"),
            l("Perfect! Let's discuss your software needs. 💻"),
            setTimeout(
              () => (
                l("What type of software are you looking for?"),
                void u([
                  "Desktop Application",
                  "SaaS Platform",
                  "CRM/ERP System",
                  "Custom Software",
                ])
              ),
              500,
            ))
          : i.includes("app") || i.includes("mobile")
            ? ((e.service_type = "app-dev"),
              l("Awesome! Let's create your app. 📱"),
              setTimeout(
                () => (
                  l("What type of app do you want to build?"),
                  void u([
                    "Simple App (few screens)",
                    "Medium App (moderate features)",
                    "Complex App (advanced features)",
                  ])
                ),
                500,
              ))
            : i.includes("video") || i.includes("editing")
              ? ((e.service_type = "video-editing"),
                l("Exciting! Let's bring your videos to life. 🎬"),
                setTimeout(() => {
                  l(
                    "First, how many videos do you need? (Just type a number like 1, 5, 10, 30)",
                  );
                }, 500))
              : i.includes("not sure")
                ? (l(
                    "No worries! Can you tell me what you're trying to achieve? For example:",
                  ),
                  l("- Need an online presence? → Web Development"),
                  l("- Building business software? → Software Development"),
                  l("- Mobile app for users? → App Development"),
                  l("- Content creation? → Video Editing"))
                : (l("Which service are you interested in?"),
                  u([
                    "Web Development",
                    "Software Development",
                    "App Development",
                    "Video Editing",
                  ]));
  }
  function y() {
    (l("What type of video editing do you need?"),
      l(
        "1️⃣ Basic Editing - Cuts, transitions, simple effects (₹5K-15K per video)",
      ),
      l(
        "2️⃣ Professional - Color grading, advanced effects, motion graphics (₹15K-40K per video)",
      ),
      l(
        "3️⃣ Commercial/Ads - High-end production, brand videos (₹40K-1L per video)",
      ),
      l(
        "4️⃣ Cinematic/Premium - Top-tier quality, storytelling (₹1L+ per video)",
      ),
      u(["1 - Basic", "2 - Professional", "3 - Commercial", "4 - Cinematic"]));
  }
  function v() {
    let a = { min: 0, max: 0 },
      r = "";
    if ("web-dev" === e.service_type)
      ((a =
        "ecommerce" === e.project_type
          ? t.ecommerce
          : "portfolio" === e.project_type
            ? t.portfolio
            : "webapp" === e.project_type
              ? t.webapp
              : "static" === e.website_type
                ? t.static
                : t.dynamic),
        (r = `\n        <p><strong>Service:</strong> Web Development</p>\n        <p><strong>Project Type:</strong> ${g(e.project_type)}</p>\n        <p><strong>Website Type:</strong> ${g(e.website_type)}</p>\n        <p><strong>Pages:</strong> ${e.number_of_pages}</p>\n      `));
    else if ("software-dev" === e.service_type)
      ((a = t[e.project_type] || { min: 1e5, max: 5e5 }),
        (r = `\n        <p><strong>Service:</strong> Software Development</p>\n        <p><strong>Project Type:</strong> ${g(e.project_type.replace("_", " "))}</p>\n        <p><strong>User Count:</strong> ${e.user_count || "TBD"}</p>\n      `));
    else if ("app-dev" === e.service_type)
      ((a = t[e.project_type] || { min: 8e4, max: 3e5 }),
        "both" === e.platform && (a = { min: 1.5 * a.min, max: 1.8 * a.max }),
        (r = `\n        <p><strong>Service:</strong> App Development</p>\n        <p><strong>App Type:</strong> ${g(e.project_type.replace("_", " "))}</p>\n        <p><strong>Platform:</strong> ${g(e.platform)}</p>\n      `));
    else if ("video-editing" === e.service_type) {
      const n = parseInt(e.video_quantity) || 1;
      if ("30 seconds" === e.duration) {
        let e;
        e = n <= 25 ? 1500 : 1200;
        const t = e * n;
        a = { min: t, max: t };
      } else {
        a = t[e.video_type] || { min: 5e3, max: 4e4 };
        a = { min: a.min * n, max: a.max * n };
      }
      r = `\n        <p><strong>Service:</strong> Video Editing 🎬</p>\n        <p><strong>Video Type:</strong> ${g(e.video_type.replace("_", " "))}</p>\n        <p><strong>Quantity:</strong> ${e.video_quantity} video(s)</p>\n        <p><strong>Duration per video:</strong> ${e.duration || "TBD"}</p>\n        <p><strong>Your Budget:</strong> ₹${"flexible" === e.video_budget ? "Flexible" : parseInt(e.video_budget).toLocaleString("en-IN")}</p>\n        <p><strong>Delivery Timeline:</strong> ${g(e.timeline)}</p>\n      `;
    }
    let c = { min: 0, max: 0 };
    "web-dev" === e.service_type &&
      (("no" !== e.domain_status && "yes" !== e.hosting_status) ||
        ((c.min += n.min), (c.max += n.max)),
      e.addons_selected.forEach((e) => {
        "seo" === e
          ? ((c.min += i.min), (c.max += i.max))
          : "content_writing" === e
            ? ((c.min += o.min), (c.max += o.max))
            : "custom_ui" === e && ((c.min += s), (c.max += s));
      }));
    let d = "";
    if ("string" == typeof a)
      d = "<p><strong>Estimated Price:</strong> Custom Quote Required</p>";
    else {
      const t = Math.round(a.min + c.min),
        n = Math.round(a.max + c.max);
      d = `\n        <p><strong>💰 Estimated Price Range:</strong></p>\n        <p style="font-size: 1.2em; color: #ff640d; font-weight: bold;">\n          ₹${t.toLocaleString("en-IN")} - ₹${n.toLocaleString("en-IN")}\n        </p>\n        ${"video-editing" === e.service_type ? `\n          <p style="font-size: 0.9em; color: #555;">\n            📊 Per video cost: ₹${Math.round(t / parseInt(e.video_quantity)).toLocaleString("en-IN")} - \n            ₹${Math.round(n / parseInt(e.video_quantity)).toLocaleString("en-IN")}\n          </p>\n        ` : ""}\n      `;
    }
    const p = `\n      <div class="pixy-summary">\n        <h4>📋 Complete Project Summary</h4>\n        ${r}\n        ${e.addons_selected.length > 0 ? `<p><strong>Add-ons:</strong> ${e.addons_selected.join(", ")}</p>` : ""}\n        <hr>\n        ${d}\n        <p style="font-size: 0.85em; color: #666; margin-top: 10px;">\n          <em>💡 This is a tentative estimate based on standard market rates. Final pricing depends on specific requirements and scope.</em>\n        </p>\n      </div>\n    `;
    setTimeout(() => {
      (l(p, !0),
        setTimeout(() => {
          (l("Would you like to proceed? Choose an option:"),
            u([
              "✅ Yes, connect me!",
              "💬 I want to negotiate",
              "📧 Send me details by email",
              "❌ Not interested now",
            ]),
            (e.conversationStep = 10));
        }, 1e3));
    }, 500);
  }
  function g(e) {
    return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
  }
  function f() {
    const e = document.getElementById("pixy-chat-messages");
    e.scrollTop = e.scrollHeight;
  }
  "loading" === document.readyState
    ? document.addEventListener("DOMContentLoaded", a)
    : a();
})();
