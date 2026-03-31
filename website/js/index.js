(function () {
  var href =
    "https://fonts.googleapis.com/css?family=Great+Vibes:400|Instrument+Sans:400,500,600,700&display=swap";
  try {
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  } catch (e) {}
})();

!(function (o, c) {
  var n = c.documentElement,
    t = " w-mod-";
  ((n.className += t + "js"),
    ("ontouchstart" in o || (o.DocumentTouch && c instanceof DocumentTouch)) &&
      (n.className += t + "touch"));
})(window, document);

window.__WEBFLOW_CURRENCY_SETTINGS = {
  currencyCode: "USD",
  symbol: "$",
  decimal: ".",
  fractionDigits: 2,
  group: ",",
  template:
    '{{wf {"path":"symbol","type":"PlainText"} }} {{wf {"path":"amount","type":"CommercePrice"} }} {{wf {"path":"currencyCode","type":"PlainText"} }}',
  hideDecimalForWholeNumbers: false,
};

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-T64KPYDX6P");

!(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(
  window,
  document,
  "script",
  "https://connect.facebook.net/en_US/fbevents.js",
);
fbq("init", "1529543734863040");
fbq("track", "PageView");

(async function loadAnnouncement() {
  try {
    const res = await fetch(
      "https://backend.pixelatenest.com/api/announcement",
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      const data = await res.json();
      if (data.text && data.enabled) {
        const container = document.getElementById("announcement-content");

        for (let i = 0; i < 20; i++) {
          const span = document.createElement("span");
          span.textContent = data.text;
          container.appendChild(span);
        }
        document.getElementById("announcement-bar").style.display = "block";
      } else if (!data.enabled) {
        document.getElementById("announcement-bar").style.display = "none";
      }
    }
  } catch (e) {
    console.log("Could not load announcement:", e);

    const bar = document.getElementById("announcement-bar");
    if (bar) bar.style.display = "none";
  }
})();

(function () {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const phrases = JSON.parse(el.getAttribute("data-phrases") || "[]");
  if (!phrases.length) return;
  el.innerHTML = "";
  const inner = document.createElement("span");
  inner.className = "tw-text";
  el.appendChild(inner);

  const cursorEl = document.querySelector(".typewriter-cursor");
  if (cursorEl) {
    el.appendChild(cursorEl);

    cursorEl.style.marginLeft = "0";
  }

  let index = 0;
  const CHAR_MS = 80;
  const PAUSE_AFTER = 1400;

  function revealCurrent() {
    const phrase = phrases[index] || "";

    inner.textContent = phrase;

    el.style.transition = "none";
    el.style.width = "0ch";

    el.offsetWidth;

    const revealDuration = Math.max(300, phrase.length * CHAR_MS);
    el.style.transition = `width ${revealDuration}ms linear`;
    el.style.width = `${phrase.length}ch`;

    setTimeout(() => {
      setTimeout(() => {
        const collapseDuration = Math.max(
          180,
          Math.floor((phrase.length * CHAR_MS) / 2),
        );
        el.style.transition = `width ${collapseDuration}ms linear`;
        el.style.width = `0ch`;

        setTimeout(() => {
          index = (index + 1) % phrases.length;
          revealCurrent();
        }, collapseDuration + 30);
      }, PAUSE_AFTER);
    }, revealDuration + 20);
  }

  setTimeout(revealCurrent, 300);
})();

(function () {
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  const DURATION = 1600;

  function animate(el, target) {
    const start = performance.now();

    el.style.willChange = "transform, opacity";
    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = easeOutExpo(progress);

      const value = Math.round(eased * target);
      if (el.textContent !== String(value)) el.textContent = value;

      const translateY = Math.round((1 - eased) * 18);
      el.style.transform = `translateY(${translateY}px)`;
      el.style.opacity = String(eased);

      if (progress < 1) requestAnimationFrame(frame);
      else {
        el.textContent = target;
        el.style.transform = "";
        el.style.opacity = "";
        el.style.willChange = "";
      }
    }
    requestAnimationFrame(frame);
  }

  function runCounters() {
    const counters = Array.from(document.querySelectorAll(".counter-number"));
    if (!counters.length) return;

    counters.forEach((el) => {
      const target = parseInt(el.textContent.replace(/[^0-9]/g, ""), 10) || 0;
      el.dataset.target = String(target);
      el.textContent = "0";
    });

    counters.forEach((el, i) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      setTimeout(() => animate(el, target), i * 180);
    });
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounters();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.2 },
  );

  const targetNode =
    document.querySelector(".success-rate-bottom") ||
    document.querySelector(".success-rate-wrap") ||
    document.body;
  if (targetNode) observer.observe(targetNode);
  else if (document.readyState !== "loading") runCounters();
  else document.addEventListener("DOMContentLoaded", runCounters);
})();

document.addEventListener("DOMContentLoaded", () => {
  const scrollers = document.querySelectorAll(".logo-scroller");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);
      const scrollerInner = scroller.querySelector(".logo-scroller-inner");
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
});

(function () {
  try {
    document
      .querySelectorAll("img.testimonials-01-client")
      .forEach(function (img) {
        if (
          img &&
          (!img.getAttribute("alt") || img.getAttribute("alt").trim() === "")
        ) {
          var wrap =
            img.parentElement &&
            img.parentElement.querySelector(".client-name-wrap");
          if (
            !wrap &&
            img.nextElementSibling &&
            img.nextElementSibling.classList &&
            img.nextElementSibling.classList.contains("client-name-wrap")
          ) {
            wrap = img.nextElementSibling;
          }
          if (wrap) {
            var nameEl = wrap.querySelector("div");
            var name = nameEl ? nameEl.textContent.trim() : "";
            if (name) img.setAttribute("alt", name + " — client photo");
          }
        }
      });
    document.querySelectorAll("img.star-image").forEach(function (img) {
      if (
        img &&
        (!img.getAttribute("alt") || img.getAttribute("alt").trim() === "")
      ) {
        img.setAttribute("alt", "rating star");
      }
    });
  } catch (e) {
    console.error("Alt-helper error", e);
  }
})();

(function () {
  const API_URL = "https://backend.pixelatenest.com/api/reviews";
  let currentIndex = 0;
  let testimonials = [];
  let selectedRating = 0;
  let autoScrollInterval;

  async function loadTestimonials() {
    try {
      const response = await fetch(`${API_URL}?approved=true&limit=50`);
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      const data = await response.json();
      testimonials = data.filter((review) => review.approved === true);

      if (testimonials.length === 0) {
        showNoReviewsMessage();
      } else {
        renderTestimonials();
        updateCarouselIndicators();
        startAutoScroll();
      }
    } catch (error) {
      console.error("Error loading testimonials:", error);
      showErrorMessage();
    }
  }

  function showNoReviewsMessage() {
    const track = document.getElementById("testimonialsTrack");
    if (!track) return;

    track.innerHTML = `
      <div class="testimonial-card">
        <div class="no-reviews-message">
          <p class="testimonial-message">No reviews yet. Be the first to share your experience!</p>
        </div>
      </div>
    `;
  }

  function showErrorMessage() {
    const track = document.getElementById("testimonialsTrack");
    if (!track) return;

    track.innerHTML = `
      <div class="testimonial-card">
        <div class="error-message">
          <p class="testimonial-message">Unable to load reviews at the moment. Please try again later.</p>
        </div>
      </div>
    `;
  }

  function renderTestimonials() {
    const track = document.getElementById("testimonialsTrack");
    if (!track || testimonials.length === 0) return;

    track.innerHTML = testimonials
      .map(
        (testimonial, index) => `
      <div class="testimonial-card" data-index="${index}">
        <div class="testimonial-stars">
          ${generateStars(testimonial.rating)}
        </div>
        <p class="testimonial-message">"${escapeHtml(testimonial.message)}"</p>
        <div class="testimonial-author">
          <div class="author-info">
            <h4 class="author-name">${escapeHtml(testimonial.name)}</h4>
            <p class="author-brand">${escapeHtml(testimonial.brand)}</p>
            <span class="service-badge">${escapeHtml(
              testimonial.workDone,
            )}</span>
          </div>
        </div>
      </div>
    `,
      )
      .join("");

    updateCarouselPosition();
  }

  function escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  function generateStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += `
      <svg class="testimonial-star ${i <= rating ? "filled" : ""}" 
           width="20" height="20" 
           viewBox="0 0 24 24" 
           fill="${i <= rating ? "var(--secondary-900)" : "none"}" 
           xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
              stroke="var(--secondary-900)" 
              stroke-width="1.5" 
              stroke-linecap="round" 
              stroke-linejoin="round"/>
      </svg>
    `;
    }
    return stars;
  }
  function getCardsVisible() {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  function updateCarouselIndicators() {
    const indicators = document.getElementById("carouselIndicators");
    if (!indicators || testimonials.length === 0) return;

    const cardsVisible = getCardsVisible();
    const totalPages = Math.max(
      1,
      Math.ceil(testimonials.length / cardsVisible),
    );
    indicators.innerHTML = Array.from(
      { length: totalPages },
      (_, i) => `
      <span class="indicator ${
        i === Math.floor(currentIndex / cardsVisible) ? "active" : ""
      }" data-page="${i}"></span>
    `,
    ).join("");
    indicators.querySelectorAll(".indicator").forEach((indicator, i) => {
      indicator.addEventListener("click", () => {
        currentIndex = i * cardsVisible;
        updateCarouselPosition();
        updateCarouselIndicators();
      });
    });
  }

  function updateCarouselPosition() {
    const track = document.getElementById("testimonialsTrack");
    if (!track) return;

    const cardsVisible = getCardsVisible();
    const cards = track.querySelectorAll(".testimonial-card");
    if (!cards.length) return;
    const cardRect = cards[0].getBoundingClientRect();
    const computed = window.getComputedStyle(track);
    const gapPx = computed.gap ? parseFloat(computed.gap) : 16;
    const cardFullWidth = cardRect.width + gapPx;
    const maxIndex = Math.max(0, testimonials.length - cardsVisible);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const offsetPx = currentIndex * cardFullWidth;
    track.style.transform = `translateX(${-offsetPx}px)`;
  }

  document.querySelector(".prev-btn")?.addEventListener("click", () => {
    stopAutoScroll();
    if (currentIndex > 0) {
      currentIndex = Math.max(0, currentIndex - 1);
    } else {
      currentIndex = 0;
    }
    updateCarouselPosition();
    updateCarouselIndicators();
    startAutoScroll();
  });

  document.querySelector(".next-btn")?.addEventListener("click", () => {
    stopAutoScroll();
    const cardsVisible = getCardsVisible();
    if (currentIndex < testimonials.length - cardsVisible) {
      currentIndex = Math.min(
        testimonials.length - cardsVisible,
        currentIndex + 1,
      );
    } else {
      currentIndex = 0;
    }
    updateCarouselPosition();
    updateCarouselIndicators();
    startAutoScroll();
  });

  function startAutoScroll() {
    stopAutoScroll();
    const cardsVisible = getCardsVisible();
    if (testimonials.length > cardsVisible) {
      autoScrollInterval = setInterval(() => {
        if (currentIndex < testimonials.length - cardsVisible) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarouselPosition();
        updateCarouselIndicators();
      }, 5000);
    }
  }

  window.addEventListener("resize", () => {
    const cardsVisible = getCardsVisible();
    if (currentIndex > Math.max(0, testimonials.length - cardsVisible)) {
      currentIndex = Math.max(0, testimonials.length - cardsVisible);
    }
    updateCarouselPosition();
    updateCarouselIndicators();
  });

  (function enableTouchSwipe() {
    const trackEl = document.getElementById("testimonialsTrack");
    if (!trackEl) return;
    let startX = 0;
    let moved = false;

    trackEl.addEventListener(
      "touchstart",
      (e) => {
        if (!e.touches || !e.touches.length) return;
        startX = e.touches[0].clientX;
        moved = false;
        stopAutoScroll();
      },
      { passive: true },
    );

    trackEl.addEventListener(
      "touchmove",
      (e) => {
        if (!e.touches || !e.touches.length) return;
        const dx = e.touches[0].clientX - startX;
        if (Math.abs(dx) > 10) moved = true;
      },
      { passive: true },
    );

    trackEl.addEventListener("touchend", (e) => {
      if (!moved) {
        startAutoScroll();
        return;
      }
      const endX =
        e.changedTouches && e.changedTouches[0]
          ? e.changedTouches[0].clientX
          : 0;
      const dx = endX - startX;
      const threshold = 50;
      const cardsVisible = getCardsVisible();
      if (dx > threshold) {
        currentIndex = Math.max(0, currentIndex - 1);
      } else if (dx < -threshold) {
        if (currentIndex < testimonials.length - cardsVisible) {
          currentIndex = Math.min(
            testimonials.length - cardsVisible,
            currentIndex + 1,
          );
        } else {
          currentIndex = 0;
        }
      }
      updateCarouselPosition();
      updateCarouselIndicators();
      startAutoScroll();
    });
  })();

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  const carouselWrap = document.querySelector(".testimonials-carousel-wrap");
  carouselWrap?.addEventListener("mouseenter", stopAutoScroll);
  carouselWrap?.addEventListener("mouseleave", startAutoScroll);

  const modal = document.getElementById("reviewModal");
  const closeModal = document.getElementById("closeModal");
  const cancelReview = document.getElementById("cancelReview");
  const reviewForm = document.getElementById("reviewForm");
  const footerStars = document.getElementById("footerStars");
  const modalStars = document.getElementById("modalStars");
  const formMessage = document.getElementById("formMessage");

  footerStars?.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  function closeReviewModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    reviewForm.reset();
    selectedRating = 0;
    updateModalStars(0);
    formMessage.textContent = "";
    formMessage.className = "form-message";
  }

  closeModal?.addEventListener("click", closeReviewModal);
  cancelReview?.addEventListener("click", closeReviewModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeReviewModal();
    }
  });

  modalStars?.querySelectorAll(".modal-star").forEach((star) => {
    star.addEventListener("click", function () {
      selectedRating = parseInt(this.dataset.rating);
      document.getElementById("reviewRating").value = selectedRating;
      updateModalStars(selectedRating);
    });

    star.addEventListener("mouseenter", function () {
      const rating = parseInt(this.dataset.rating);
      updateModalStars(rating, true);
    });
  });

  modalStars?.addEventListener("mouseleave", () => {
    updateModalStars(selectedRating);
  });

  function updateModalStars(rating, hover = false) {
    modalStars?.querySelectorAll(".modal-star").forEach((star, index) => {
      const starRating = index + 1;
      const path = star.querySelector("path");
      if (starRating <= rating) {
        path.setAttribute("fill", "#FFD700");
      } else {
        path.setAttribute("fill", "none");
      }
    });
  }

  reviewForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (selectedRating === 0) {
      showMessage("Please select a rating", "error");
      return;
    }

    const submitBtn = document.getElementById("submitReview");
    const originalText = submitBtn?.textContent;

    const formData = {
      name: document.getElementById("reviewName").value.trim(),
      email: document.getElementById("reviewEmail").value.trim(),
      brand: document.getElementById("reviewBrand").value.trim(),
      workDone: document.getElementById("reviewWorkDone").value,
      rating: selectedRating,
      message: document.getElementById("reviewMessage").value.trim(),
    };

    if (
      !formData.name ||
      !formData.email ||
      !formData.brand ||
      !formData.workDone ||
      !formData.message
    ) {
      showMessage("Please fill in all required fields", "error");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit review");
      }

      const result = await response.json();
      console.log("Review submitted successfully:", result);

      showMessage(
        "Thank you for your review! It will be published after our team approves it.",
        "success",
      );
      setTimeout(() => {
        loadTestimonials();
      }, 1000);

      setTimeout(() => {
        closeReviewModal();
      }, 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
      showMessage(
        error.message || "Failed to submit review. Please try again later.",
        "error",
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || "Submit Review";
      }
    }
  });

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
  }

  loadTestimonials();
})();

(function () {
  const pages = [
    "https://www.pixelatenest.com/index.html",
    "https://www.pixelatenest.com/about.html",
    "https://www.pixelatenest.com/app-dev.html",
    "https://www.pixelatenest.com/software-dev.html",
    "https://www.pixelatenest.com/video-ed.html",
    "https://www.pixelatenest.com/blogs.html",
    "https://www.pixelatenest.com/contact.html",
    "https://www.pixelatenest.com/blogs.html",
    "https://www.pixelatenest.com/careers.html",
  ];

  const domains = [
    "https://backend.pixelatenest.com",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://cdn.prod.website-files.com",
    "https://cdnjs.cloudflare.com",
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
  ];

  function addLink(rel, href, as, crossorigin) {
    try {
      const l = document.createElement("link");
      l.rel = rel;
      l.href = href;
      if (as) l.as = as;
      if (crossorigin) l.crossOrigin = "anonymous";
      document.head.appendChild(l);
    } catch (e) {}
  }

  function warm() {
    domains.forEach((d) => {
      addLink("preconnect", d, null, true);
      addLink("dns-prefetch", d);
    });
    pages.forEach((p) => {
      addLink("prefetch", p, "document");
    });
    addLink("preload", "styles.css", "style");
    addLink(
      "preload",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      "style",
      true,
    );
    try {
      fetch("/", { method: "GET", mode: "no-cors", cache: "no-cache" }).catch(
        () => {},
      );
      fetch("https://backend.pixelatenest.com", {
        method: "GET",
        mode: "no-cors",
      }).catch(() => {});
    } catch (e) {}
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(warm, { timeout: 2000 });
  } else {
    window.addEventListener("load", function () {
      setTimeout(warm, 1000);
    });
  }
})();

(function () {
  function initMobileNav() {
    const navbar = document.querySelector('.w-nav[data-collapse="medium"]');
    const menuButton = document.querySelector(".menu-button");
    const navMenu = document.querySelector(".nav-menu-wrapper");
    const closeButton = document.querySelector(".mobile-menu-close");

    console.log("Mobile Nav Init:", {
      navbar,
      menuButton,
      navMenu,
      closeButton,
    });

    if (!navbar || !menuButton) {
      console.warn("Navbar elements not found", { navbar, menuButton });
      return;
    }

    console.log("Menu button found, adding event listeners");

    function closeMenu() {
      navbar.classList.add("w--closing");
      navbar.classList.remove("w--open");

      setTimeout(() => {
        navbar.classList.remove("w--closing");
      }, 300);

      menuButton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    function openMenu() {
      navbar.classList.add("w--open");
      menuButton.setAttribute("aria-expanded", "true");
      if (window.innerWidth <= 991) {
        document.body.style.overflow = "hidden";
      }
    }

    menuButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (navbar.classList.contains("w--open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeButton) {
      closeButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
    }

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".navbar")) {
        closeMenu();
      }
    });

    if (navMenu) {
      const navLinks = navMenu.querySelectorAll(
        ".nav-link:not(.dropdown-toggle)",
      );
      navLinks.forEach(function (link) {
        if (!link.closest(".has-dropdown")) {
          link.addEventListener("click", function () {
            closeMenu();
          });
        }
      });
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth > 991 && navbar.classList.contains("w--open")) {
        closeMenu();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNav);
  } else {
    initMobileNav();
  }
})();

(function initHeroStats() {
  function animateStats() {
    const statsRow = document.querySelector(".hero-stats-row");
    if (!statsRow) return;

    const statItems = statsRow.querySelectorAll(".hero-stat-item");
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;

            statItems.forEach((item, index) => {
              const numberEl = item.querySelector(".stat-number");
              const target = parseInt(numberEl.getAttribute("data-target"));
              const duration = 2000;
              const delay = index * 150;

              setTimeout(() => {
                item.style.opacity = "0";
                item.style.transform = "translateY(20px)";
                item.style.transition =
                  "opacity 0.6s ease, transform 0.6s ease";

                requestAnimationFrame(() => {
                  item.style.opacity = "1";
                  item.style.transform = "translateY(0)";
                });

                const startTime = performance.now();

                function updateCount(currentTime) {
                  const elapsed = currentTime - startTime;
                  const progress = Math.min(elapsed / duration, 1);

                  const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                  const current = Math.floor(easeOutQuart * target);

                  numberEl.textContent = current;

                  if (progress < 1) {
                    requestAnimationFrame(updateCount);
                  } else {
                    numberEl.textContent = target;
                  }
                }

                requestAnimationFrame(updateCount);
              }, delay);
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      },
    );

    observer.observe(statsRow);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", animateStats);
  } else {
    animateStats();
  }
})();

(function initWhyChooseUsAnimation() {
  function animateCards() {
    const cards = document.querySelectorAll(
      ".choose-container .outer[data-animate-index]",
    );
    if (!cards.length) return;

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(60px)";
      card.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    });

    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;

            cards.forEach((card, index) => {
              const delay = index * 200;

              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, delay);
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      },
    );

    const container = document.querySelector(".choose-container");
    if (container) {
      observer.observe(container);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", animateCards);
  } else {
    animateCards();
  }
})();
(function initFAQ() {
  function setupFAQ() {
    const faqLists = document.querySelectorAll(".faq-list");
    if (!faqLists.length) return;

    faqLists.forEach((item) => {
      const questionWrap = item.querySelector(".faq-question-wrap");
      if (!questionWrap) return;

      questionWrap.addEventListener("click", function () {
        const isActive = item.classList.contains("active");

        // Close all open items
        faqLists.forEach((el) => el.classList.remove("active"));

        // Open clicked one if it wasn't already open
        if (!isActive) {
          item.classList.add("active");
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupFAQ);
  } else {
    setupFAQ();
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggles = document.querySelectorAll(
    ".nav-item.has-dropdown > .dropdown-toggle",
  );
  const subdropdownItems = document.querySelectorAll(
    ".dropdown-item.has-subdropdown",
  );

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();
        const parent = this.parentElement;
        parent.classList.toggle("active");
      }
    });
  });

  subdropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle("active");
      }
    });
  });

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const currentlyActive = document.querySelector(".faq-item.active");
      if (currentlyActive && currentlyActive !== item) {
        currentlyActive.classList.remove("active");
      }
      item.classList.toggle("active");
    });
  });

  const statNumbers = document.querySelectorAll(".stat-number");
  const statSection = document.querySelector(".hero-stats-row");

  const animateStat = (element) => {
    const target = +element.getAttribute("data-target");
    const duration = 1500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = Math.round(target);
        clearInterval(timer);
      } else {
        element.textContent = Math.round(current);
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statNumbers.forEach(animateStat);
          observer.unobserve(statSection);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (statSection) {
    observer.observe(statSection);
  }
});
