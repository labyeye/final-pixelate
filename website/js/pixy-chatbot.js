/**
 * Pixy - AI Website Consultant Chatbot
 * Embedded widget for website consultation
 */

(function () {
  "use strict";

  // Session state
  let sessionState = {
    service_type: null, // web-dev, software-dev, app-dev, video-editing
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
    negotiation_requested: false,
    userName: null,
    userEmail: null,
    userPhone: null,
    isProcessing: false,
  };

  // Pricing logic
  const pricingRanges = {
    // Web Development
    static: { min: 15000, max: 30000 },
    dynamic: { min: 30000, max: 60000 },
    portfolio: { min: 20000, max: 40000 },
    ecommerce: { min: 60000, max: 150000 },
    webapp: { min: 80000, max: 200000 },

    // Software Development
    desktop_app: { min: 100000, max: 300000 },
    saas: { min: 150000, max: 500000 },
    crm_erp: { min: 200000, max: 800000 },
    custom_software: "custom",

    // App Development
    simple_app: { min: 80000, max: 150000 },
    medium_app: { min: 150000, max: 300000 },
    complex_app: { min: 300000, max: 800000 },

    // Video Editing
    basic_video: { min: 5000, max: 15000 },
    professional_video: { min: 15000, max: 40000 },
    commercial_video: { min: 40000, max: 100000 },
    video_package: { min: 50000, max: 200000 },
  };

  const addOnPricing = {
    domain_hosting: { min: 3000, max: 6000 },
    seo: { min: 5000, max: 15000 },
    maintenance: 2000,
    content_writing: { min: 3000, max: 10000 },
    custom_ui: 10000,
  };

  // Initialize chatbot
  function initPixyChatbot() {
    // Create chatbot HTML structure
    const chatbotHTML = `
      <div id="pixy-chatbot-widget">
        <!-- Chat Button -->
        <button id="pixy-chat-button" class="pixy-chat-button" aria-label="Chat with Pixy">
          <svg class="pixy-icon pixy-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <svg class="pixy-icon pixy-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span class="pixy-notification-badge">1</span>
        </button>

        <!-- Chat Modal -->
        <div id="pixy-chat-modal" class="pixy-chat-modal">
          <div class="pixy-chat-header">
            <div class="pixy-chat-header-info">
              <div class="pixy-avatar">
                <img src="assets/pixylogo.webp" alt="Pixy" />
              </div>
              <div>
                <h3>Pixy</h3>
                <p class="pixy-status"><span class="pixy-status-dot"></span>Online - Ready to help!</p>
              </div>
            </div>
            <button id="pixy-close-modal" class="pixy-close-btn" aria-label="Close chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div id="pixy-chat-messages" class="pixy-chat-messages">
            <!-- Messages will be added here -->
          </div>

          <div class="pixy-chat-input-container">
            <input 
              type="text" 
              id="pixy-chat-input" 
              class="pixy-chat-input" 
              placeholder="Type your message..."
              autocomplete="off"
            />
            <button id="pixy-send-btn" class="pixy-send-btn" aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    // Inject chatbot into page
    document.body.insertAdjacentHTML("beforeend", chatbotHTML);

    // Get elements
    const chatButton = document.getElementById("pixy-chat-button");
    const chatModal = document.getElementById("pixy-chat-modal");
    const closeModal = document.getElementById("pixy-close-modal");
    const chatInput = document.getElementById("pixy-chat-input");
    const sendBtn = document.getElementById("pixy-send-btn");
    const messagesContainer = document.getElementById("pixy-chat-messages");
    const notificationBadge = document.querySelector(
      ".pixy-notification-badge"
    );

    // Event listeners
    chatButton.addEventListener("click", toggleChat);
    closeModal.addEventListener("click", closeChat);
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendMessage();
    });

    // Initialize with greeting
    setTimeout(() => {
      addBotMessage(
        "Hi, I'm Pixy 👋 I help you find the perfect solution for your business needs!"
      );
      setTimeout(() => {
        addBotMessage("Which service are you interested in?");
        showQuickReplies([
          "Web Development",
          "Software Development",
          "App Development",
          "Video Editing",
          "Not Sure",
        ]);
      }, 800);
    }, 500);
  }

  function toggleChat() {
    const chatModal = document.getElementById("pixy-chat-modal");
    const chatButton = document.getElementById("pixy-chat-button");
    const notificationBadge = document.querySelector(
      ".pixy-notification-badge"
    );

    chatButton.classList.toggle("active");
    chatModal.classList.toggle("active");

    if (chatModal.classList.contains("active")) {
      document.getElementById("pixy-chat-input").focus();
      notificationBadge.style.display = "none";
    }
  }

  function closeChat() {
    const chatModal = document.getElementById("pixy-chat-modal");
    const chatButton = document.getElementById("pixy-chat-button");

    chatButton.classList.remove("active");
    chatModal.classList.remove("active");
  }

  function addBotMessage(message, isHtml = false) {
    const messagesContainer = document.getElementById("pixy-chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = "pixy-message pixy-bot-message";

    const content = `
      <div class="pixy-message-avatar">
        <img src="assets/pixylogo.webp" alt="Pixy" />
      </div>
      <div class="pixy-message-content">
        ${isHtml ? message : `<p>${message}</p>`}
      </div>
    `;

    messageDiv.innerHTML = content;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();

    sessionState.chatHistory.push({ role: "bot", message });
  }

  function addUserMessage(message) {
    const messagesContainer = document.getElementById("pixy-chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = "pixy-message pixy-user-message";

    messageDiv.innerHTML = `
      <div class="pixy-message-content">
        <p>${message}</p>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    scrollToBottom();

    sessionState.chatHistory.push({ role: "user", message });
  }

  function showQuickReplies(options) {
    const messagesContainer = document.getElementById("pixy-chat-messages");
    const quickRepliesDiv = document.createElement("div");
    quickRepliesDiv.className = "pixy-quick-replies";

    options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "pixy-quick-reply-btn";
      button.textContent = option;
      button.onclick = () => handleQuickReply(option);
      quickRepliesDiv.appendChild(button);
    });

    messagesContainer.appendChild(quickRepliesDiv);
    scrollToBottom();
  }

  function handleQuickReply(option) {
    // Remove all quick reply buttons
    document
      .querySelectorAll(".pixy-quick-replies")
      .forEach((el) => el.remove());

    // Add user message
    addUserMessage(option);

    // Process response
    processUserInput(option);
  }

  async function sendMessage() {
    const chatInput = document.getElementById("pixy-chat-input");
    const message = chatInput.value.trim();

    if (!message || sessionState.isProcessing) return;

    // Prevent multiple messages while processing
    sessionState.isProcessing = true;
    chatInput.disabled = true;

    addUserMessage(message);
    chatInput.value = "";

    // Remove any existing quick replies
    document
      .querySelectorAll(".pixy-quick-replies")
      .forEach((el) => el.remove());

    // Show typing indicator
    showTypingIndicator();

    // Process user input
    setTimeout(() => {
      hideTypingIndicator();
      processUserInput(message);
      sessionState.isProcessing = false;
      chatInput.disabled = false;
      chatInput.focus();
    }, 800);
  }

  function showTypingIndicator() {
    const messagesContainer = document.getElementById("pixy-chat-messages");
    const typingDiv = document.createElement("div");
    typingDiv.className = "pixy-message pixy-bot-message pixy-typing";
    typingDiv.id = "pixy-typing-indicator";

    typingDiv.innerHTML = `
      <div class="pixy-message-avatar">
        <img src="assets/pixylogo.webp" alt="Pixy" />
      </div>
      <div class="pixy-message-content">
        <div class="pixy-typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;

    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    const typingIndicator = document.getElementById("pixy-typing-indicator");
    if (typingIndicator) typingIndicator.remove();
  }

  function processUserInput(input) {
    const lowerInput = input.toLowerCase();

    // Handle special commands
    if (
      lowerInput === "restart" ||
      lowerInput === "start over" ||
      lowerInput === "reset"
    ) {
      resetConversation();
      return;
    }

    if (
      lowerInput === "help" ||
      lowerInput === "?" ||
      lowerInput === "commands"
    ) {
      showHelp();
      return;
    }

    // Step 0: Service Selection
    if (!sessionState.service_type) {
      if (lowerInput.includes("web dev") || lowerInput.includes("website")) {
        sessionState.service_type = "web-dev";
        addBotMessage("Great choice! Let's build your website. 🌐");
        setTimeout(() => askWebProjectType(), 500);
      } else if (
        lowerInput.includes("software") ||
        lowerInput.includes("desktop")
      ) {
        sessionState.service_type = "software-dev";
        addBotMessage("Perfect! Let's discuss your software needs. 💻");
        setTimeout(() => askSoftwareProjectType(), 500);
      } else if (lowerInput.includes("app") || lowerInput.includes("mobile")) {
        sessionState.service_type = "app-dev";
        addBotMessage("Awesome! Let's create your app. 📱");
        setTimeout(() => askAppProjectType(), 500);
      } else if (
        lowerInput.includes("video") ||
        lowerInput.includes("editing")
      ) {
        sessionState.service_type = "video-editing";
        addBotMessage("Exciting! Let's bring your videos to life. 🎬");
        setTimeout(() => askVideoProjectType(), 500);
      } else if (lowerInput.includes("not sure")) {
        addBotMessage(
          "No worries! Can you tell me what you're trying to achieve? For example:"
        );
        addBotMessage("- Need an online presence? → Web Development");
        addBotMessage("- Building business software? → Software Development");
        addBotMessage("- Mobile app for users? → App Development");
        addBotMessage("- Content creation? → Video Editing");
      } else {
        addBotMessage("Which service are you interested in?");
        showQuickReplies([
          "Web Development",
          "Software Development",
          "App Development",
          "Video Editing",
        ]);
      }
      return;
    }

    // === WEB DEVELOPMENT FLOW ===
    if (sessionState.service_type === "web-dev") {
      // Step 1: Web Project type
      if (!sessionState.project_type) {
        if (
          lowerInput.includes("information") ||
          lowerInput.includes("informational")
        ) {
          sessionState.project_type = "information";
        } else if (lowerInput.includes("business")) {
          sessionState.project_type = "business";
        } else if (
          lowerInput.includes("ecommerce") ||
          lowerInput.includes("e-commerce") ||
          lowerInput.includes("shop")
        ) {
          sessionState.project_type = "ecommerce";
        } else if (lowerInput.includes("portfolio")) {
          sessionState.project_type = "portfolio";
        } else if (
          lowerInput.includes("web app") ||
          lowerInput.includes("application")
        ) {
          sessionState.project_type = "webapp";
        }

        if (sessionState.project_type) {
          askWebsiteType();
        }
        return;
      }

      // Step 2: Website type
      if (!sessionState.website_type) {
        if (
          lowerInput.includes("static") ||
          lowerInput.includes("content only")
        ) {
          sessionState.website_type = "static";
          addBotMessage(
            "✅ Static website selected - Great for simple, fast sites!"
          );
        } else if (
          lowerInput.includes("dynamic") ||
          lowerInput.includes("admin")
        ) {
          sessionState.website_type = "dynamic";
          addBotMessage(
            "✅ Dynamic website selected - Perfect for interactive features!"
          );
        } else if (lowerInput.includes("not sure")) {
          sessionState.website_type =
            sessionState.project_type === "ecommerce" ? "dynamic" : "static";
          addBotMessage(
            `✅ I'd recommend a ${sessionState.website_type} website for your needs.`
          );
        }

        if (sessionState.website_type) {
          askNumberOfPages();
        }
        return;
      }

      // Step 3: Number of pages
      if (!sessionState.number_of_pages) {
        if (lowerInput.includes("1-3") || lowerInput.match(/\b[1-3]\b/)) {
          sessionState.number_of_pages = "1-3";
        } else if (
          lowerInput.includes("4-6") ||
          lowerInput.match(/\b[4-6]\b/)
        ) {
          sessionState.number_of_pages = "4-6";
        } else if (
          lowerInput.includes("7-10") ||
          lowerInput.match(/\b[7-9]\b|10/)
        ) {
          sessionState.number_of_pages = "7-10";
        } else if (lowerInput.includes("not sure")) {
          sessionState.number_of_pages = "4-6";
          addBotMessage("I'd suggest 4-6 pages for most websites.");
        }

        if (sessionState.number_of_pages) {
          askDomainStatus();
        }
        return;
      }

      // Step 4: Domain
      if (sessionState.domain_status === null) {
        sessionState.domain_status =
          lowerInput.includes("yes") || lowerInput.includes("have")
            ? "yes"
            : "no";
        askHostingStatus();
        return;
      }

      // Step 5: Hosting
      if (sessionState.hosting_status === null) {
        sessionState.hosting_status =
          lowerInput.includes("yes") || lowerInput.includes("need")
            ? "yes"
            : "no";
        askCMSRequirement();
        return;
      }

      // Step 6: CMS
      if (sessionState.cms_required === null) {
        sessionState.cms_required =
          lowerInput.includes("yes") || lowerInput.includes("want")
            ? "yes"
            : "no";
        askAddOns();
        return;
      }

      // Step 7: Add-ons
      if (sessionState.conversationStep === 7) {
        if (lowerInput.includes("seo"))
          sessionState.addons_selected.push("seo");
        if (lowerInput.includes("maintenance"))
          sessionState.addons_selected.push("maintenance");
        if (lowerInput.includes("content"))
          sessionState.addons_selected.push("content_writing");

        sessionState.conversationStep = 8;
        askTimeline();
        return;
      }
    }

    // === SOFTWARE DEVELOPMENT FLOW ===
    if (sessionState.service_type === "software-dev") {
      // Step 1: Software type
      if (!sessionState.project_type) {
        if (lowerInput.includes("desktop")) {
          sessionState.project_type = "desktop_app";
        } else if (
          lowerInput.includes("saas") ||
          lowerInput.includes("cloud")
        ) {
          sessionState.project_type = "saas";
        } else if (lowerInput.includes("crm") || lowerInput.includes("erp")) {
          sessionState.project_type = "crm_erp";
        } else if (lowerInput.includes("custom")) {
          sessionState.project_type = "custom_software";
        }

        if (sessionState.project_type) {
          askSoftwareFeatures();
        }
        return;
      }

      // Step 2: Features
      if (sessionState.conversationStep === 2) {
        // Capture features description
        sessionState.features = input;
        sessionState.conversationStep = 3;
        askUserCount();
        return;
      }

      // Step 3: User count
      if (!sessionState.user_count) {
        if (lowerInput.includes("5") || lowerInput.includes("small")) {
          sessionState.user_count = "1-5";
        } else if (lowerInput.includes("20") || lowerInput.includes("medium")) {
          sessionState.user_count = "5-20";
        } else if (lowerInput.includes("50") || lowerInput.includes("large")) {
          sessionState.user_count = "20-50";
        } else if (
          lowerInput.includes("enterprise") ||
          lowerInput.includes("100")
        ) {
          sessionState.user_count = "50+";
        }

        if (sessionState.user_count) {
          askSoftwareTimeline();
        }
        return;
      }
    }

    // === APP DEVELOPMENT FLOW ===
    if (sessionState.service_type === "app-dev") {
      // Step 1: App type
      if (!sessionState.project_type) {
        if (lowerInput.includes("simple") || lowerInput.includes("basic")) {
          sessionState.project_type = "simple_app";
        } else if (
          lowerInput.includes("medium") ||
          lowerInput.includes("moderate")
        ) {
          sessionState.project_type = "medium_app";
        } else if (
          lowerInput.includes("complex") ||
          lowerInput.includes("advanced")
        ) {
          sessionState.project_type = "complex_app";
        }

        if (sessionState.project_type) {
          askAppPlatform();
        }
        return;
      }

      // Step 2: Platform
      if (!sessionState.platform) {
        if (lowerInput.includes("ios") && lowerInput.includes("android")) {
          sessionState.platform = "both";
        } else if (lowerInput.includes("ios")) {
          sessionState.platform = "ios";
        } else if (lowerInput.includes("android")) {
          sessionState.platform = "android";
        }

        if (sessionState.platform) {
          askAppFeatures();
        }
        return;
      }

      // Step 3: Features
      if (sessionState.conversationStep === 3) {
        if (lowerInput.includes("auth"))
          sessionState.addons_selected.push("authentication");
        if (lowerInput.includes("payment"))
          sessionState.addons_selected.push("payment");
        if (lowerInput.includes("push"))
          sessionState.addons_selected.push("notifications");
        if (lowerInput.includes("map"))
          sessionState.addons_selected.push("maps");

        sessionState.conversationStep = 4;
        askAppTimeline();
        return;
      }
    }

    // === VIDEO EDITING FLOW ===
    if (sessionState.service_type === "video-editing") {
      // Step 1: Quantity first
      if (!sessionState.video_quantity) {
        // Extract number from input
        const numMatch = input.match(/\d+/);
        if (numMatch) {
          sessionState.video_quantity = numMatch[0];
          addBotMessage(
            `Got it! ${sessionState.video_quantity} videos. Now, what type of videos do you need?`
          );
          setTimeout(() => askVideoType(), 500);
        } else if (
          lowerInput.includes("one") ||
          lowerInput.includes("single")
        ) {
          sessionState.video_quantity = "1";
          addBotMessage(
            "Perfect! One video. What type of video editing do you need?"
          );
          setTimeout(() => askVideoType(), 500);
        } else {
          addBotMessage(
            "Please tell me how many videos you need. Just type a number (e.g., 5, 10, 30)"
          );
        }
        return;
      }

      // Step 2: Video type
      if (!sessionState.video_type) {
        if (
          lowerInput.includes("basic") ||
          lowerInput.includes("simple") ||
          lowerInput.includes("1")
        ) {
          sessionState.video_type = "basic_video";
          sessionState.project_type = "basic_video";
        } else if (
          lowerInput.includes("professional") ||
          lowerInput.includes("pro") ||
          lowerInput.includes("2")
        ) {
          sessionState.video_type = "professional_video";
          sessionState.project_type = "professional_video";
        } else if (
          lowerInput.includes("commercial") ||
          lowerInput.includes("ad") ||
          lowerInput.includes("3")
        ) {
          sessionState.video_type = "commercial_video";
          sessionState.project_type = "commercial_video";
        } else if (
          lowerInput.includes("cinematic") ||
          lowerInput.includes("premium") ||
          lowerInput.includes("4")
        ) {
          sessionState.video_type = "commercial_video";
          sessionState.project_type = "commercial_video";
        }

        if (sessionState.video_type) {
          askVideoDuration();
        }
        return;
      }

      // Step 3: Duration
      if (!sessionState.duration) {
        if (
          lowerInput.includes("30") ||
          lowerInput.includes("short") ||
          lowerInput.includes("1")
        ) {
          sessionState.duration = "30 seconds";
        } else if (
          lowerInput.includes("60") ||
          lowerInput.includes("1-2") ||
          lowerInput.includes("2")
        ) {
          sessionState.duration = "1-2 minutes";
        } else if (
          lowerInput.includes("3-5") ||
          lowerInput.includes("medium") ||
          lowerInput.includes("3")
        ) {
          sessionState.duration = "3-5 minutes";
        } else if (
          lowerInput.includes("5+") ||
          lowerInput.includes("long") ||
          lowerInput.includes("4")
        ) {
          sessionState.duration = "5+ minutes";
        }

        if (sessionState.duration) {
          askVideoBudget();
        }
        return;
      }

      // Step 4: Budget
      if (!sessionState.video_budget) {
        const budgetMatch = input.match(/[\d,]+/);
        if (budgetMatch) {
          sessionState.video_budget = budgetMatch[0].replace(/,/g, "");
        } else if (
          lowerInput.includes("flexible") ||
          lowerInput.includes("not sure")
        ) {
          sessionState.video_budget = "flexible";
        } else {
          addBotMessage(
            "Could you specify your budget? (e.g., 50000 or 'flexible')"
          );
          return;
        }

        askVideoTimeline();
        return;
      }

      // Step 5: Timeline
      if (!sessionState.timeline) {
        if (
          lowerInput.includes("urgent") ||
          lowerInput.includes("week") ||
          lowerInput.includes("1")
        ) {
          sessionState.timeline = "urgent";
        } else if (
          lowerInput.includes("normal") ||
          lowerInput.includes("2-3") ||
          lowerInput.includes("2")
        ) {
          sessionState.timeline = "normal";
        } else if (
          lowerInput.includes("flexible") ||
          lowerInput.includes("month") ||
          lowerInput.includes("3")
        ) {
          sessionState.timeline = "flexible";
        }

        if (sessionState.timeline) {
          generateSummary();
        }
        return;
      }
    }

    // === OTHER SERVICES TIMELINE ===
    if (
      !sessionState.timeline &&
      sessionState.service_type !== "video-editing"
    ) {
      if (lowerInput.includes("urgent") || lowerInput.includes("week")) {
        sessionState.timeline = "urgent";
      } else if (
        lowerInput.includes("normal") ||
        lowerInput.includes("month")
      ) {
        sessionState.timeline = "normal";
      } else if (lowerInput.includes("flexible")) {
        sessionState.timeline = "flexible";
      }

      if (sessionState.timeline) {
        generateSummary();
      }
      return;
    }

    // Handle lead capture (steps 10, 11, 12, 13)
    if (
      sessionState.conversationStep >= 10 &&
      sessionState.conversationStep <= 13
    ) {
      captureLeadInfo(input);
      return;
    }

    addBotMessage("I didn't quite catch that. Could you please clarify?");
    addBotMessage(
      "💡 Tip: Type 'help' for assistance or 'restart' to start over."
    );
  }

  // === HELPER FUNCTIONS ===
  function resetConversation() {
    // Clear all messages except welcome
    const messagesContainer = document.getElementById("pixy-chat-messages");
    messagesContainer.innerHTML = "";

    // Reset session state
    sessionState = {
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
      negotiation_requested: false,
      userName: null,
      userEmail: null,
      userPhone: null,
      isProcessing: false,
    };

    // Restart conversation
    addBotMessage("🔄 Let's start fresh!");
    setTimeout(() => {
      addBotMessage("Which service are you interested in?");
      showQuickReplies([
        "Web Development",
        "Software Development",
        "App Development",
        "Video Editing",
      ]);
    }, 500);
  }

  function showHelp() {
    addBotMessage("📚 Here's how I can help you:");
    addBotMessage("✅ I can provide quotes for:");
    addBotMessage("  • Web Development (websites, e-commerce, web apps)");
    addBotMessage("  • Software Development (desktop apps, SaaS, CRM/ERP)");
    addBotMessage("  • App Development (iOS, Android, cross-platform)");
    addBotMessage("  • Video Editing (short reels, professional edits)");
    addBotMessage("");
    addBotMessage("💬 Commands:");
    addBotMessage("  • Type 'restart' to start a new conversation");
    addBotMessage("  • Type 'help' to see this message again");
    addBotMessage("");
    addBotMessage("📞 Contact: +91-9234112345");
    addBotMessage("📧 Email: support@pixelatenest.com");
    addBotMessage("");
    addBotMessage("Let's continue! Where were we? 😊");
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    // Accept Indian phone numbers with or without +91
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }

  // === WEB DEVELOPMENT HELPERS ===
  function askWebProjectType() {
    addBotMessage("What type of website do you need?");
    showQuickReplies([
      "Information website",
      "Business website",
      "E-commerce website",
      "Portfolio",
      "Web application",
    ]);
  }

  function askWebsiteType() {
    addBotMessage(
      "Do you want a static website (content only) or a dynamic website (admin panel, forms, updates)?"
    );
    showQuickReplies(["Static", "Dynamic", "Not sure"]);
  }

  function askNumberOfPages() {
    addBotMessage("Roughly how many pages do you need?");
    showQuickReplies(["1-3 pages", "4-6 pages", "7-10 pages", "Not sure"]);
  }

  function askDomainStatus() {
    addBotMessage("Do you already own a domain name?");
    showQuickReplies(["Yes", "No"]);
  }

  function askHostingStatus() {
    addBotMessage("Do you need hosting included?");
    showQuickReplies(["Yes", "No"]);
  }

  function askCMSRequirement() {
    addBotMessage("Do you want the ability to update content yourself later?");
    showQuickReplies(["Yes", "No"]);
  }

  function askAddOns() {
    sessionState.conversationStep = 7;
    addBotMessage("Would you like any of these add-ons?");
    showQuickReplies(["SEO setup", "Maintenance", "Content writing", "None"]);
  }

  // === SOFTWARE DEVELOPMENT HELPERS ===
  function askSoftwareProjectType() {
    addBotMessage("What type of software are you looking for?");
    showQuickReplies([
      "Desktop Application",
      "SaaS Platform",
      "CRM/ERP System",
      "Custom Software",
    ]);
  }

  function askSoftwareFeatures() {
    sessionState.conversationStep = 2;
    addBotMessage(
      "Great! Can you briefly describe the key features you need? (e.g., user management, reporting, inventory, etc.)"
    );
  }

  function askUserCount() {
    addBotMessage("How many users will be using this software?");
    showQuickReplies([
      "1-5 users",
      "5-20 users",
      "20-50 users",
      "50+ users (Enterprise)",
    ]);
  }

  function askSoftwareTimeline() {
    addBotMessage("What's your expected timeline?");
    showQuickReplies([
      "Urgent (1-2 months)",
      "Normal (3-4 months)",
      "Flexible (6+ months)",
    ]);
    sessionState.conversationStep = 0; // Reset for timeline detection
  }

  // === APP DEVELOPMENT HELPERS ===
  function askAppProjectType() {
    addBotMessage("What type of app do you want to build?");
    showQuickReplies([
      "Simple App (few screens)",
      "Medium App (moderate features)",
      "Complex App (advanced features)",
    ]);
  }

  function askAppPlatform() {
    addBotMessage("Which platform(s) do you need?");
    showQuickReplies(["iOS only", "Android only", "Both iOS & Android"]);
  }

  function askAppFeatures() {
    sessionState.conversationStep = 3;
    addBotMessage("What key features do you need?");
    showQuickReplies([
      "User Authentication",
      "Payment Integration",
      "Push Notifications",
      "Maps/Location",
      "None of these",
    ]);
  }

  function askAppTimeline() {
    addBotMessage("When do you want to launch?");
    showQuickReplies([
      "Urgent (2-3 months)",
      "Normal (4-6 months)",
      "Flexible",
    ]);
    sessionState.conversationStep = 0; // Reset for timeline detection
  }

  // === VIDEO EDITING HELPERS ===
  function askVideoProjectType() {
    addBotMessage(
      "First, how many videos do you need? (Just type a number like 1, 5, 10, 30)"
    );
  }

  function askVideoType() {
    addBotMessage("What type of video editing do you need?");
    addBotMessage(
      "1️⃣ Basic Editing - Cuts, transitions, simple effects (₹5K-15K per video)"
    );
    addBotMessage(
      "2️⃣ Professional - Color grading, advanced effects, motion graphics (₹15K-40K per video)"
    );
    addBotMessage(
      "3️⃣ Commercial/Ads - High-end production, brand videos (₹40K-1L per video)"
    );
    addBotMessage(
      "4️⃣ Cinematic/Premium - Top-tier quality, storytelling (₹1L+ per video)"
    );
    showQuickReplies([
      "1 - Basic",
      "2 - Professional",
      "3 - Commercial",
      "4 - Cinematic",
    ]);
  }

  function askVideoDuration() {
    addBotMessage("What's the typical duration of each video?");
    showQuickReplies([
      "1 - 30 seconds",
      "2 - 1-2 minutes",
      "3 - 3-5 minutes",
      "4 - 5+ minutes",
    ]);
  }

  function askVideoBudget() {
    const quantity = parseInt(sessionState.video_quantity) || 1;

    // Special pricing for 30-second reels
    if (sessionState.duration === "30 seconds") {
      let pricePerVideo;
      let totalPrice;

      if (quantity <= 25) {
        pricePerVideo = 1500;
        totalPrice = 1500 * quantity;
        addBotMessage(`Great! For ${quantity} short reels (30 seconds each):`);
        addBotMessage(
          `💰 Price: ₹1,500 per video × ${quantity} = ₹${totalPrice.toLocaleString(
            "en-IN"
          )}`
        );
      } else {
        pricePerVideo = 1200;
        totalPrice = 1200 * quantity;
        addBotMessage(
          `Awesome! For ${quantity} short reels (30 seconds each), you get bulk pricing:`
        );
        addBotMessage(
          `💰 Price: ₹1,200 per video × ${quantity} = ₹${totalPrice.toLocaleString(
            "en-IN"
          )}`
        );
        addBotMessage(
          `🎉 You saved ₹${((1500 - 1200) * quantity).toLocaleString(
            "en-IN"
          )} with bulk discount!`
        );
      }
    } else {
      // Regular pricing for other durations
      let priceRange = pricingRanges[sessionState.video_type];

      if (typeof priceRange === "object") {
        const totalMin = priceRange.min * quantity;
        const totalMax = priceRange.max * quantity;

        addBotMessage(
          `Based on ${quantity} ${sessionState.video_type.replace(
            "_",
            " "
          )} video(s), the estimated range would be:`
        );
        addBotMessage(
          `💰 ₹${totalMin.toLocaleString("en-IN")} - ₹${totalMax.toLocaleString(
            "en-IN"
          )}`
        );
      }
    }

    addBotMessage(
      "What's your budget for this project? (Type amount in ₹ or say 'flexible')"
    );
  }

  function askVideoQuantity() {
    addBotMessage(
      "How many videos do you need per month? (Just type a number or 'one-time project')"
    );
  }

  function askVideoTimeline() {
    addBotMessage("What's your deadline?");
    showQuickReplies([
      "1 - Urgent (within 1 week)",
      "2 - Normal (2-3 weeks)",
      "3 - Flexible (1 month+)",
    ]);
    sessionState.conversationStep = 0; // Reset for timeline detection
  }

  function askTimeline() {
    addBotMessage("When are you planning to launch?");
    showQuickReplies(["Urgent (2-3 weeks)", "Normal (1 month)", "Flexible"]);
  }

  function generateSummary() {
    // Calculate pricing based on service type
    let basePrice = { min: 0, max: 0 };
    let serviceDetails = "";

    // Determine base price
    if (sessionState.service_type === "web-dev") {
      if (sessionState.project_type === "ecommerce") {
        basePrice = pricingRanges.ecommerce;
      } else if (sessionState.project_type === "portfolio") {
        basePrice = pricingRanges.portfolio;
      } else if (sessionState.project_type === "webapp") {
        basePrice = pricingRanges.webapp;
      } else {
        basePrice =
          sessionState.website_type === "static"
            ? pricingRanges.static
            : pricingRanges.dynamic;
      }

      serviceDetails = `
        <p><strong>Service:</strong> Web Development</p>
        <p><strong>Project Type:</strong> ${capitalize(
          sessionState.project_type
        )}</p>
        <p><strong>Website Type:</strong> ${capitalize(
          sessionState.website_type
        )}</p>
        <p><strong>Pages:</strong> ${sessionState.number_of_pages}</p>
      `;
    } else if (sessionState.service_type === "software-dev") {
      basePrice = pricingRanges[sessionState.project_type] || {
        min: 100000,
        max: 500000,
      };

      serviceDetails = `
        <p><strong>Service:</strong> Software Development</p>
        <p><strong>Project Type:</strong> ${capitalize(
          sessionState.project_type.replace("_", " ")
        )}</p>
        <p><strong>User Count:</strong> ${sessionState.user_count || "TBD"}</p>
      `;
    } else if (sessionState.service_type === "app-dev") {
      basePrice = pricingRanges[sessionState.project_type] || {
        min: 80000,
        max: 300000,
      };

      // Adjust for platform
      if (sessionState.platform === "both") {
        basePrice = { min: basePrice.min * 1.5, max: basePrice.max * 1.8 };
      }

      serviceDetails = `
        <p><strong>Service:</strong> App Development</p>
        <p><strong>App Type:</strong> ${capitalize(
          sessionState.project_type.replace("_", " ")
        )}</p>
        <p><strong>Platform:</strong> ${capitalize(sessionState.platform)}</p>
      `;
    } else if (sessionState.service_type === "video-editing") {
      const quantity = parseInt(sessionState.video_quantity) || 1;

      // Special pricing logic for 30-second reels
      if (sessionState.duration === "30 seconds") {
        let pricePerVideo;
        if (quantity <= 25) {
          pricePerVideo = 1500;
        } else {
          pricePerVideo = 1200;
        }

        const totalPrice = pricePerVideo * quantity;
        basePrice = { min: totalPrice, max: totalPrice };
      } else {
        // Regular pricing for other durations
        basePrice = pricingRanges[sessionState.video_type] || {
          min: 5000,
          max: 40000,
        };

        // Calculate total for multiple videos
        const totalMin = basePrice.min * quantity;
        const totalMax = basePrice.max * quantity;
        basePrice = { min: totalMin, max: totalMax };
      }

      serviceDetails = `
        <p><strong>Service:</strong> Video Editing 🎬</p>
        <p><strong>Video Type:</strong> ${capitalize(
          sessionState.video_type.replace("_", " ")
        )}</p>
        <p><strong>Quantity:</strong> ${
          sessionState.video_quantity
        } video(s)</p>
        <p><strong>Duration per video:</strong> ${
          sessionState.duration || "TBD"
        }</p>
        <p><strong>Your Budget:</strong> ₹${
          sessionState.video_budget === "flexible"
            ? "Flexible"
            : parseInt(sessionState.video_budget).toLocaleString("en-IN")
        }</p>
        <p><strong>Delivery Timeline:</strong> ${capitalize(
          sessionState.timeline
        )}</p>
      `;
    }

    let addOnCost = { min: 0, max: 0 };

    // Add-on calculations (for web dev)
    if (sessionState.service_type === "web-dev") {
      if (
        sessionState.domain_status === "no" ||
        sessionState.hosting_status === "yes"
      ) {
        addOnCost.min += addOnPricing.domain_hosting.min;
        addOnCost.max += addOnPricing.domain_hosting.max;
      }

      sessionState.addons_selected.forEach((addon) => {
        if (addon === "seo") {
          addOnCost.min += addOnPricing.seo.min;
          addOnCost.max += addOnPricing.seo.max;
        } else if (addon === "content_writing") {
          addOnCost.min += addOnPricing.content_writing.min;
          addOnCost.max += addOnPricing.content_writing.max;
        } else if (addon === "custom_ui") {
          addOnCost.min += addOnPricing.custom_ui;
          addOnCost.max += addOnPricing.custom_ui;
        }
      });
    }

    // Generate summary message with detailed breakdown
    let pricingSection = "";

    if (typeof basePrice === "string") {
      pricingSection =
        "<p><strong>Estimated Price:</strong> Custom Quote Required</p>";
    } else {
      const totalMin = Math.round(basePrice.min + addOnCost.min);
      const totalMax = Math.round(basePrice.max + addOnCost.max);

      pricingSection = `
        <p><strong>💰 Estimated Price Range:</strong></p>
        <p style="font-size: 1.2em; color: #ff640d; font-weight: bold;">
          ₹${totalMin.toLocaleString("en-IN")} - ₹${totalMax.toLocaleString(
        "en-IN"
      )}
        </p>
        ${
          sessionState.service_type === "video-editing"
            ? `
          <p style="font-size: 0.9em; color: #555;">
            📊 Per video cost: ₹${Math.round(
              totalMin / parseInt(sessionState.video_quantity)
            ).toLocaleString("en-IN")} - 
            ₹${Math.round(
              totalMax / parseInt(sessionState.video_quantity)
            ).toLocaleString("en-IN")}
          </p>
        `
            : ""
        }
      `;
    }

    const summaryHTML = `
      <div class="pixy-summary">
        <h4>📋 Complete Project Summary</h4>
        ${serviceDetails}
        ${
          sessionState.addons_selected.length > 0
            ? `<p><strong>Add-ons:</strong> ${sessionState.addons_selected.join(
                ", "
              )}</p>`
            : ""
        }
        <hr>
        ${pricingSection}
        <p style="font-size: 0.85em; color: #666; margin-top: 10px;">
          <em>💡 This is a tentative estimate based on standard market rates. Final pricing depends on specific requirements and scope.</em>
        </p>
      </div>
    `;

    setTimeout(() => {
      addBotMessage(summaryHTML, true);
      setTimeout(() => {
        showCallToAction();
      }, 1000);
    }, 500);
  }

  function showCallToAction() {
    addBotMessage("Would you like to proceed? Choose an option:");
    showQuickReplies([
      "✅ Yes, connect me!",
      "💬 I want to negotiate",
      "📧 Send me details by email",
      "❌ Not interested now",
    ]);
    sessionState.conversationStep = 10;
  }

  function captureLeadInfo(response) {
    const lowerResponse = response.toLowerCase();

    // Handle form filling steps (check these FIRST)
    if (sessionState.conversationStep === 12) {
      // Collecting email with validation
      if (!validateEmail(response)) {
        addBotMessage("⚠️ That doesn't look like a valid email address.");
        addBotMessage("Please enter a valid email (e.g., name@example.com):");
        return;
      }
      sessionState.userEmail = response;
      addBotMessage("✅ Email saved!");
      addBotMessage(
        "And your phone number? (Optional - type 'skip' if you don't want to share)"
      );
      sessionState.conversationStep = 13;
      return;
    } else if (sessionState.conversationStep === 13) {
      // Collecting phone with validation
      if (lowerResponse === "skip") {
        sessionState.userPhone = "";
        addBotMessage(
          "📝 No problem, we'll proceed without your phone number."
        );
      } else {
        if (!validatePhone(response)) {
          addBotMessage("⚠️ That doesn't look like a valid phone number.");
          addBotMessage(
            "Please enter a valid Indian phone number (10 digits) or type 'skip':"
          );
          return;
        }
        sessionState.userPhone = response;
        addBotMessage("✅ Phone number saved!");
      }
      submitLead();
      return;
    } else if (sessionState.conversationStep === 11) {
      // Collecting name
      if (response.length < 2) {
        addBotMessage("⚠️ Please enter your full name.");
        return;
      }
      sessionState.userName = response;
      addBotMessage(
        `Nice to meet you, ${response}! 😊 What's your email address?`
      );
      sessionState.conversationStep = 12;
      return;
    }

    // Handle negotiation request
    if (
      lowerResponse.includes("negotiate") ||
      lowerResponse.includes("negotiation")
    ) {
      sessionState.negotiation_requested = true;
      addBotMessage("I understand you'd like to discuss pricing. 💰");
      addBotMessage(
        "For price negotiations and custom packages, please contact our team directly:"
      );
      addBotMessage("📞 <strong>+91-9234112345</strong>");
      addBotMessage("📧 <strong>support@pixelatenest.com</strong>");
      addBotMessage("");
      addBotMessage(
        "Would you still like to fill the contact form so we can reach out to you?"
      );
      showQuickReplies(["Yes, fill form", "No, I'll call directly"]);
      sessionState.conversationStep = 11;
      return;
    }

    // Initial prompt to fill form
    if (
      lowerResponse.includes("yes") ||
      lowerResponse.includes("connect") ||
      lowerResponse.includes("consultation") ||
      lowerResponse.includes("proposal") ||
      lowerResponse.includes("email") ||
      lowerResponse.includes("fill form")
    ) {
      addBotMessage("Perfect! Let me collect your details:");
      addBotMessage("What's your name?");
      sessionState.conversationStep = 11;
    } else if (
      lowerResponse.includes("no") ||
      lowerResponse.includes("not interested") ||
      lowerResponse.includes("later") ||
      lowerResponse.includes("call directly")
    ) {
      addBotMessage(
        "No problem! Feel free to reach out anytime. Have a great day! 😊"
      );
    }
  }

  async function submitLead() {
    // Show loading message
    addBotMessage("Submitting your details... ⏳");

    try {
      const leadData = {
        name: sessionState.userName,
        email: sessionState.userEmail,
        phone: sessionState.userPhone,
        service_type: sessionState.service_type,
        project_type: sessionState.project_type,
        website_type: sessionState.website_type,
        number_of_pages: sessionState.number_of_pages,
        video_quantity: sessionState.video_quantity,
        video_type: sessionState.video_type,
        video_budget: sessionState.video_budget,
        duration: sessionState.duration,
        platform: sessionState.platform,
        user_count: sessionState.user_count,
        addons: sessionState.addons_selected,
        timeline: sessionState.timeline,
        negotiation_requested: sessionState.negotiation_requested,
        conversation_history: sessionState.chatHistory,
        timestamp: new Date().toISOString(),
      };

      // Send to backend API
      const apiUrl = "https://backend.pixelatenest.com/api/pixy-lead";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        addBotMessage(
          "Perfect! ✅ Your contact form has been automatically submitted!"
        );
        addBotMessage(
          "Our team will reach out to you within 24 hours to discuss your project in detail. 🚀"
        );
        addBotMessage(
          "For urgent queries, feel free to call us at: 📞 <strong>+91-9234112345</strong>"
        );
        addBotMessage("Thank you for choosing Pixelate Nest! 💼");
      } else {
        const errorMsg = await response.text();
        addBotMessage(
          "⚠️ We encountered an issue submitting your form. But don't worry!"
        );
        addBotMessage("We've saved your details: " + sessionState.userEmail);
        addBotMessage(
          "Our team will reach out soon. You can also contact us directly:"
        );
        addBotMessage("📧 support@pixelatenest.com");
        addBotMessage("📞 +91-9234112345");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      
      // Save to localStorage as backup
      try {
        const backupLeads = JSON.parse(localStorage.getItem('pixy_backup_leads') || '[]');
        backupLeads.push(leadData);
        localStorage.setItem('pixy_backup_leads', JSON.stringify(backupLeads));
        console.log('Lead saved to localStorage backup');
      } catch (storageError) {
        console.error('Could not save to localStorage:', storageError);
      }
      
      addBotMessage("⚠️ Connection issue detected!");
      addBotMessage("");
      addBotMessage("Don't worry! We've saved your information:");
      addBotMessage("👤 Name: " + sessionState.userName);
      addBotMessage("📧 Email: " + sessionState.userEmail);
      if (sessionState.userPhone) {
        addBotMessage("📞 Phone: " + sessionState.userPhone);
      }
      addBotMessage("");
      addBotMessage("🔧 This might be because:");
      addBotMessage("  • You're viewing from a local file (file://)");
      addBotMessage("  • Network connectivity issue");
      addBotMessage("");
      addBotMessage("📞 Please contact us directly:");
      addBotMessage("📧 support@pixelatenest.com");
      addBotMessage("📞 +91-9234112345");
      addBotMessage("");
      addBotMessage(
        "💡 Send us an email and we'll respond within 24 hours!"
      );
    }
  }

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function scrollToBottom() {
    const messagesContainer = document.getElementById("pixy-chat-messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPixyChatbot);
  } else {
    initPixyChatbot();
  }
})();
