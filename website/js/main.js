function gtag() {
  dataLayer.push(arguments);
}
(!(function () {
  try {
    var e = document.createElement("link");
    ((e.rel = "stylesheet"),
      (e.href =
        "https://fonts.googleapis.com/css?family=Great+Vibes:400|Instrument+Sans:400,500,600,700&display=swap"),
      document.head.appendChild(e));
  } catch (e) {}
})(),
  (function (e, t) {
    var n = t.documentElement,
      o = " w-mod-";
    ((n.className += o + "js"),
      ("ontouchstart" in e ||
        (e.DocumentTouch && t instanceof DocumentTouch)) &&
        (n.className += o + "touch"));
  })(window, document),
  (window.__WEBFLOW_CURRENCY_SETTINGS = {
    currencyCode: "USD",
    symbol: "$",
    decimal: ".",
    fractionDigits: 2,
    group: ",",
    template:
      '{{wf {"path":"symbol","type":"PlainText"} }} {{wf {"path":"amount","type":"CommercePrice"} }} {{wf {"path":"currencyCode","type":"PlainText"} }}',
    hideDecimalForWholeNumbers: !1,
  }),
  (window.dataLayer = window.dataLayer || []),
  gtag("js", new Date()),
  gtag("config", "G-T64KPYDX6P"),
  (async function () {
    try {
      const e = await fetch(
        "https://backend.pixelatenest.com/api/announcement",
        { cache: "no-store" },
      );
      if (e.ok) {
        const t = await e.json();
        if (t.text && t.enabled) {
          const e = document.getElementById("announcement-content");
          for (let n = 0; n < 20; n++) {
            const n = document.createElement("span");
            ((n.textContent = t.text), e.appendChild(n));
          }
          document.getElementById("announcement-bar").style.display = "block";
        } else
          t.enabled ||
            (document.getElementById("announcement-bar").style.display =
              "none");
      }
    } catch (e) {
      const t = document.getElementById("announcement-bar");
      t && (t.style.display = "none");
    }
  })(),
  (function () {
    const e = document.getElementById("typewriter");
    if (!e) return;
    const t = JSON.parse(e.getAttribute("data-phrases") || "[]");
    if (!t.length) return;
    e.innerHTML = "";
    const n = document.createElement("span");
    ((n.className = "tw-text"), e.appendChild(n));
    const o = document.querySelector(".typewriter-cursor");
    o && (e.appendChild(o), (o.style.marginLeft = "0"));
    let a = 0;
    setTimeout(function o() {
      const s = t[a] || "";
      ((n.textContent = s),
        (e.style.transition = "none"),
        (e.style.width = "0ch"),
        e.offsetWidth);
      const r = Math.max(300, 80 * s.length);
      ((e.style.transition = `width ${r}ms linear`),
        (e.style.width = `${s.length}ch`),
        setTimeout(() => {
          setTimeout(() => {
            const n = Math.max(180, Math.floor((80 * s.length) / 2));
            ((e.style.transition = `width ${n}ms linear`),
              (e.style.width = "0ch"),
              setTimeout(() => {
                ((a = (a + 1) % t.length), o());
              }, n + 30));
          }, 1400);
        }, r + 20));
    }, 300);
  })(),
  (function () {
    function e(e, t) {
      const n = performance.now();
      ((e.style.willChange = "transform, opacity"),
        requestAnimationFrame(function o(a) {
          const s = a - n,
            r = Math.min(s / 1600, 1),
            c = 1 === (i = r) ? 1 : 1 - Math.pow(2, -10 * i);
          var i;
          const l = Math.round(c * t);
          e.textContent !== String(l) && (e.textContent = l);
          const d = Math.round(18 * (1 - c));
          ((e.style.transform = `translateY(${d}px)`),
            (e.style.opacity = String(c)),
            r < 1
              ? requestAnimationFrame(o)
              : ((e.textContent = t),
                (e.style.transform = ""),
                (e.style.opacity = ""),
                (e.style.willChange = "")));
        }));
    }
    function t() {
      const t = Array.from(document.querySelectorAll(".counter-number"));
      t.length &&
        (t.forEach((e) => {
          const t = parseInt(e.textContent.replace(/[^0-9]/g, ""), 10) || 0;
          ((e.dataset.target = String(t)), (e.textContent = "0"));
        }),
        t.forEach((t, n) => {
          const o = parseInt(t.dataset.target, 10) || 0;
          setTimeout(() => e(t, o), 180 * n);
        }));
    }
    const n = new IntersectionObserver(
        (e, n) => {
          e.forEach((e) => {
            e.isIntersecting && (t(), n.disconnect());
          });
        },
        { threshold: 0.2 },
      ),
      o =
        document.querySelector(".success-rate-bottom") ||
        document.querySelector(".success-rate-wrap") ||
        document.body;
    o
      ? n.observe(o)
      : "loading" !== document.readyState
        ? t()
        : document.addEventListener("DOMContentLoaded", t);
  })(),
  document.addEventListener("DOMContentLoaded", () => {
    const e = document.querySelectorAll(".logo-scroller");
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      e.forEach((e) => {
        e.setAttribute("data-animated", !0);
        const t = e.querySelector(".logo-scroller-inner");
        Array.from(t.children).forEach((e) => {
          const n = e.cloneNode(!0);
          (n.setAttribute("aria-hidden", !0), t.appendChild(n));
        });
      });
  }),
  (function () {
    try {
      (document
        .querySelectorAll("img.testimonials-01-client")
        .forEach(function (e) {
          if (
            e &&
            (!e.getAttribute("alt") || "" === e.getAttribute("alt").trim())
          ) {
            var t =
              e.parentElement &&
              e.parentElement.querySelector(".client-name-wrap");
            if (
              (!t &&
                e.nextElementSibling &&
                e.nextElementSibling.classList &&
                e.nextElementSibling.classList.contains("client-name-wrap") &&
                (t = e.nextElementSibling),
              t)
            ) {
              var n = t.querySelector("div"),
                o = n ? n.textContent.trim() : "";
              o && e.setAttribute("alt", o + " — client photo");
            }
          }
        }),
        document.querySelectorAll("img.star-image").forEach(function (e) {
          !e ||
            (e.getAttribute("alt") && "" !== e.getAttribute("alt").trim()) ||
            e.setAttribute("alt", "rating star");
        }));
    } catch (e) {}
  })(),
  (function () {
    const e = "https://backend.pixelatenest.com/api/reviews";
    let t,
      n = 0,
      o = [],
      a = 0;
    async function s() {
      try {
        const t = await fetch(`${e}?approved=true&limit=50`);
        if (!t.ok) throw new Error("Failed to fetch testimonials");
        const n = await t.json();
        ((o = n.filter((e) => !0 === e.approved)),
          0 === o.length
            ? (function () {
                const e = document.getElementById("testimonialsTrack");
                if (!e) return;
                e.innerHTML =
                  '\n      <div class="testimonial-card">\n        <div class="no-reviews-message">\n          <p class="testimonial-message">No reviews yet. Be the first to share your experience!</p>\n        </div>\n      </div>\n    ';
              })()
            : (!(function () {
                const e = document.getElementById("testimonialsTrack");
                if (!e || 0 === o.length) return;
                ((e.innerHTML = o
                  .map(
                    (e, t) =>
                      `\n      <div class="testimonial-card" data-index="${t}">\n        <div class="testimonial-stars">\n          ${(function (
                        e,
                      ) {
                        let t = "";
                        for (let n = 1; n <= 5; n++)
                          t += `\n      <svg class="testimonial-star ${n <= e ? "filled" : ""}" \n           width="20" height="20" \n           viewBox="0 0 24 24" \n           fill="${n <= e ? "var(--secondary-900)" : "none"}" \n           xmlns="http:\n        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" \n              stroke="var(--secondary-900)" \n              stroke-width="1.5" \n              stroke-linecap="round" \n              stroke-linejoin="round"/>\n      </svg>\n    `;
                        return t;
                      })(
                        e.rating,
                      )}\n        </div>\n        <p class="testimonial-message">"${r(e.message)}"</p>\n        <div class="testimonial-author">\n          <div class="author-info">\n            <h4 class="author-name">${r(e.name)}</h4>\n            <p class="author-brand">${r(e.brand)}</p>\n            <span class="service-badge">${r(e.workDone)}</span>\n          </div>\n        </div>\n      </div>\n    `,
                  )
                  .join("")),
                  l());
              })(),
              i(),
              d()));
      } catch (e) {
        !(function () {
          const e = document.getElementById("testimonialsTrack");
          if (!e) return;
          e.innerHTML =
            '\n      <div class="testimonial-card">\n        <div class="error-message">\n          <p class="testimonial-message">Unable to load reviews at the moment. Please try again later.</p>\n        </div>\n      </div>\n    ';
        })();
      }
    }
    function r(e) {
      const t = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return e.replace(/[&<>"']/g, (e) => t[e]);
    }
    function c() {
      const e = window.innerWidth;
      return e <= 640 ? 1 : e <= 1024 ? 2 : 3;
    }
    function i() {
      const e = document.getElementById("carouselIndicators");
      if (!e || 0 === o.length) return;
      const t = c(),
        a = Math.max(1, Math.ceil(o.length / t));
      ((e.innerHTML = Array.from(
        { length: a },
        (e, o) =>
          `\n      <span class="indicator ${o === Math.floor(n / t) ? "active" : ""}" data-page="${o}"></span>\n    `,
      ).join("")),
        e.querySelectorAll(".indicator").forEach((e, o) => {
          e.addEventListener("click", () => {
            ((n = o * t), l(), i());
          });
        }));
    }
    function l() {
      const e = document.getElementById("testimonialsTrack");
      if (!e) return;
      const t = c(),
        a = e.querySelectorAll(".testimonial-card");
      if (!a.length) return;
      const s = a[0].getBoundingClientRect(),
        r = window.getComputedStyle(e),
        i = r.gap ? parseFloat(r.gap) : 16,
        l = s.width + i,
        d = Math.max(0, o.length - t);
      n > d && (n = d);
      const u = n * l;
      e.style.transform = `translateX(${-u}px)`;
    }
    function d() {
      u();
      const e = c();
      o.length > e &&
        (t = setInterval(() => {
          (n < o.length - e ? n++ : (n = 0), l(), i());
        }, 5e3));
    }
    function u() {
      t && (clearInterval(t), (t = null));
    }
    (document.querySelector(".prev-btn")?.addEventListener("click", () => {
      (u(), (n = n > 0 ? Math.max(0, n - 1) : 0), l(), i(), d());
    }),
      document.querySelector(".next-btn")?.addEventListener("click", () => {
        u();
        const e = c();
        ((n = n < o.length - e ? Math.min(o.length - e, n + 1) : 0),
          l(),
          i(),
          d());
      }),
      window.addEventListener("resize", () => {
        const e = c();
        (n > Math.max(0, o.length - e) && (n = Math.max(0, o.length - e)),
          l(),
          i());
      }),
      (function () {
        const e = document.getElementById("testimonialsTrack");
        if (!e) return;
        let t = 0,
          a = !1;
        (e.addEventListener(
          "touchstart",
          (e) => {
            e.touches &&
              e.touches.length &&
              ((t = e.touches[0].clientX), (a = !1), u());
          },
          { passive: !0 },
        ),
          e.addEventListener(
            "touchmove",
            (e) => {
              if (!e.touches || !e.touches.length) return;
              const n = e.touches[0].clientX - t;
              Math.abs(n) > 10 && (a = !0);
            },
            { passive: !0 },
          ),
          e.addEventListener("touchend", (e) => {
            if (!a) return void d();
            const s =
                (e.changedTouches && e.changedTouches[0]
                  ? e.changedTouches[0].clientX
                  : 0) - t,
              r = c();
            (s > 50
              ? (n = Math.max(0, n - 1))
              : s < -50 &&
                (n = n < o.length - r ? Math.min(o.length - r, n + 1) : 0),
              l(),
              i(),
              d());
          }));
      })());
    const m = document.querySelector(".testimonials-carousel-wrap");
    (m?.addEventListener("mouseenter", u),
      m?.addEventListener("mouseleave", d));
    const h = document.getElementById("reviewModal"),
      f = document.getElementById("closeModal"),
      p = document.getElementById("cancelReview"),
      g = document.getElementById("reviewForm"),
      y = document.getElementById("footerStars"),
      v = document.getElementById("modalStars"),
      w = document.getElementById("formMessage");
    function E() {
      ((h.style.display = "none"),
        (document.body.style.overflow = "auto"),
        g.reset(),
        (a = 0),
        b(0),
        (w.textContent = ""),
        (w.className = "form-message"));
    }
    function b(e, t = !1) {
      v?.querySelectorAll(".modal-star").forEach((t, n) => {
        const o = n + 1,
          a = t.querySelector("path");
        o <= e
          ? a.setAttribute("fill", "#FFD700")
          : a.setAttribute("fill", "none");
      });
    }
    function L(e, t) {
      ((w.textContent = e), (w.className = `form-message ${t}`));
    }
    (y?.addEventListener("click", () => {
      ((h.style.display = "flex"), (document.body.style.overflow = "hidden"));
    }),
      f?.addEventListener("click", E),
      p?.addEventListener("click", E),
      h?.addEventListener("click", (e) => {
        e.target === h && E();
      }),
      v?.querySelectorAll(".modal-star").forEach((e) => {
        (e.addEventListener("click", function () {
          ((a = parseInt(this.dataset.rating)),
            (document.getElementById("reviewRating").value = a),
            b(a));
        }),
          e.addEventListener("mouseenter", function () {
            b(parseInt(this.dataset.rating), !0);
          }));
      }),
      v?.addEventListener("mouseleave", () => {
        b(a);
      }),
      g?.addEventListener("submit", async (t) => {
        if ((t.preventDefault(), 0 === a))
          return void L("Please select a rating", "error");
        const n = document.getElementById("submitReview"),
          o = n?.textContent,
          r = {
            name: document.getElementById("reviewName").value.trim(),
            email: document.getElementById("reviewEmail").value.trim(),
            brand: document.getElementById("reviewBrand").value.trim(),
            workDone: document.getElementById("reviewWorkDone").value,
            rating: a,
            message: document.getElementById("reviewMessage").value.trim(),
          };
        if (r.name && r.email && r.brand && r.workDone && r.message) {
          n && ((n.disabled = !0), (n.textContent = "Submitting..."));
          try {
            const t = await fetch(e, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(r),
            });
            if (!t.ok) {
              const e = await t.json().catch(() => ({}));
              throw new Error(e.error || "Failed to submit review");
            }
            await t.json();
            (L(
              "Thank you for your review! It will be published after our team approves it.",
              "success",
            ),
              setTimeout(() => {
                s();
              }, 1e3),
              setTimeout(() => {
                E();
              }, 3e3));
          } catch (e) {
            L(
              e.message || "Failed to submit review. Please try again later.",
              "error",
            );
          } finally {
            n && ((n.disabled = !1), (n.textContent = o || "Submit Review"));
          }
        } else L("Please fill in all required fields", "error");
      }),
      s());
  })(),
  (function () {
    const e = [
        "https://www.pixelatenest.com/index.html",
        "https://www.pixelatenest.com/services/app-development.html",
      ],
      t = [
        "https://backend.pixelatenest.com",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
        "https://cdn.prod.website-files.com",
        "https://cdnjs.cloudflare.com",
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
      ];
    function n(e, t, n, o) {
      try {
        const a = document.createElement("link");
        ((a.rel = e),
          (a.href = t),
          n && (a.as = n),
          o && (a.crossOrigin = "anonymous"),
          document.head.appendChild(a));
      } catch (e) {}
    }
    function o() {
      (t.forEach((e) => {
        (n("preconnect", e, null, !0), n("dns-prefetch", e));
      }),
        e.forEach((e) => {
          n("prefetch", e, "document");
        }),
        n(
          "preload",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
          "style",
          !0,
        ));
      try {
        (fetch("/", {
          method: "GET",
          mode: "no-cors",
          cache: "no-cache",
        }).catch(() => {}),
          fetch("https://backend.pixelatenest.com", {
            method: "GET",
            mode: "no-cors",
          }).catch(() => {}));
      } catch (e) {}
    }
    "requestIdleCallback" in window
      ? requestIdleCallback(o, { timeout: 2e3 })
      : window.addEventListener("load", function () {
          setTimeout(o, 1e3);
        });
  })(),
  (function () {
    function e() {
      const e = document.querySelector('.w-nav[data-collapse="medium"]'),
        t = document.querySelector(".menu-button"),
        n = document.querySelector(".nav-menu-wrapper"),
        o = document.querySelector(".mobile-menu-close");
      if (e && t) {
        if (
          (t.addEventListener("click", function (n) {
            (n.preventDefault(),
              n.stopPropagation(),
              e.classList.contains("w--open")
                ? a()
                : (e.classList.add("w--open"),
                  t.setAttribute("aria-expanded", "true"),
                  window.innerWidth <= 991 &&
                    (document.body.style.overflow = "hidden")));
          }),
          o &&
            o.addEventListener("click", function (e) {
              (e.preventDefault(), e.stopPropagation(), a());
            }),
          document.addEventListener("click", function (e) {
            e.target.closest(".navbar") || a();
          }),
          n)
        ) {
          n.querySelectorAll(".nav-link:not(.dropdown-toggle)").forEach(
            function (e) {
              e.closest(".has-dropdown") ||
                e.addEventListener("click", function () {
                  a();
                });
            },
          );
        }
        window.addEventListener("resize", function () {
          window.innerWidth > 991 && e.classList.contains("w--open") && a();
        });
      }
      function a() {
        (e.classList.add("w--closing"),
          e.classList.remove("w--open"),
          setTimeout(() => {
            e.classList.remove("w--closing");
          }, 300),
          t.setAttribute("aria-expanded", "false"),
          (document.body.style.overflow = ""));
      }
    }
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", e)
      : e();
  })(),
  (function () {
    function e() {
      const e = document.querySelector(".hero-stats-row");
      if (!e) return;
      const t = e.querySelectorAll(".hero-stat-item");
      let n = !1;
      new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            e.isIntersecting &&
              !n &&
              ((n = !0),
              t.forEach((e, t) => {
                const n = e.querySelector(".stat-number"),
                  o = parseInt(n.getAttribute("data-target"));
                setTimeout(() => {
                  ((e.style.opacity = "0"),
                    (e.style.transform = "translateY(20px)"),
                    (e.style.transition =
                      "opacity 0.6s ease, transform 0.6s ease"),
                    requestAnimationFrame(() => {
                      ((e.style.opacity = "1"),
                        (e.style.transform = "translateY(0)"));
                    }));
                  const t = performance.now();
                  requestAnimationFrame(function e(a) {
                    const s = a - t,
                      r = Math.min(s / 2e3, 1),
                      c = 1 - Math.pow(1 - r, 4),
                      i = Math.floor(c * o);
                    ((n.textContent = i),
                      r < 1 ? requestAnimationFrame(e) : (n.textContent = o));
                  });
                }, 150 * t);
              }));
          });
        },
        { threshold: 0.3, rootMargin: "0px" },
      ).observe(e);
    }
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", e)
      : e();
  })(),
  (function () {
    function e() {
      const e = document.querySelectorAll(
        ".choose-container .outer[data-animate-index]",
      );
      if (!e.length) return;
      e.forEach((e) => {
        ((e.style.opacity = "0"),
          (e.style.transform = "translateY(60px)"),
          (e.style.transition =
            "opacity 0.8s ease-out, transform 0.8s ease-out"));
      });
      let t = !1;
      const n = new IntersectionObserver(
          (n) => {
            n.forEach((n) => {
              n.isIntersecting &&
                !t &&
                ((t = !0),
                e.forEach((e, t) => {
                  setTimeout(() => {
                    ((e.style.opacity = "1"),
                      (e.style.transform = "translateY(0)"));
                  }, 200 * t);
                }));
            });
          },
          { threshold: 0.2, rootMargin: "0px" },
        ),
        o = document.querySelector(".choose-container");
      o && n.observe(o);
    }
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", e)
      : e();
  })(),
  (function () {
    function e() {
      const e = document.querySelectorAll(".faq-list");
      e.length &&
        e.forEach((t) => {
          const n = t.querySelector(".faq-question-wrap");
          n &&
            n.addEventListener("click", function () {
              const n = t.classList.contains("active");
              (e.forEach((e) => e.classList.remove("active")),
                n || t.classList.add("active"));
            });
        });
    }
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", e)
      : e();
  })(),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.querySelectorAll(
        ".nav-item.has-dropdown > .dropdown-toggle",
      ),
      t = document.querySelectorAll(".dropdown-item.has-subdropdown");
    (e.forEach((e) => {
      e.addEventListener("click", function (e) {
        if (window.innerWidth <= 991) {
          (e.preventDefault(), e.stopPropagation());
          this.parentElement.classList.toggle("active");
        }
      });
    }),
      t.forEach((e) => {
        e.addEventListener("click", function (e) {
          window.innerWidth <= 991 &&
            (e.preventDefault(),
            e.stopPropagation(),
            this.classList.toggle("active"));
        });
      }));
    document.querySelectorAll(".faq-item").forEach((e) => {
      e.querySelector(".faq-question").addEventListener("click", () => {
        const t = document.querySelector(".faq-item.active");
        (t && t !== e && t.classList.remove("active"),
          e.classList.toggle("active"));
      });
    });
    const n = document.querySelectorAll(".stat-number"),
      o = document.querySelector(".hero-stats-row"),
      a = (e) => {
        const t = +e.getAttribute("data-target"),
          n = t / 75;
        let o = 0;
        const a = setInterval(() => {
          ((o += n),
            o >= t
              ? ((e.textContent = Math.round(t)), clearInterval(a))
              : (e.textContent = Math.round(o)));
        }, 20);
      },
      s = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            e.isIntersecting && (n.forEach(a), s.unobserve(o));
          });
        },
        { threshold: 0.5 },
      );
    o && s.observe(o);
  }),
  (function () {
    function e() {
      const e = document.querySelector(".nav-wrap");
      if (!e) return;
      const t = e.querySelector(".navbar");
      if (!t) return;
      let n = null;
      function o() {
        (window.pageYOffset || document.documentElement.scrollTop) > 40
          ? t.classList.contains("sticky") ||
            (t.classList.add("sticky"),
            n ||
              ((n = document.createElement("div")),
              (n.className = "nav-placeholder"),
              (n.style.height = `${t.offsetHeight}px`),
              e.parentNode.insertBefore(n, e.nextSibling)))
          : t.classList.contains("sticky") &&
            (t.classList.remove("sticky"),
            n && (n.parentNode.removeChild(n), (n = null)));
      }
      (window.addEventListener("scroll", o, { passive: !0 }),
        window.addEventListener("resize", () => {
          n && (n.style.height = `${t.offsetHeight}px`);
        }),
        o());
    }
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", e)
      : e();
  })());

(function () {
  var rows = document.querySelectorAll(".pn-prod-row");
  if (!rows.length) return;
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("pn-anim-done");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  rows.forEach(function (row) {
    obs.observe(row);
  });
})();
