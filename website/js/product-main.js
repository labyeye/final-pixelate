/* Lean main.js for the NestHR (attendance) pages: only what these pages use.
   Shared site-wide script stays in main.js. */
(function () {
  var d = document,
    w = window;

  // Fonts
  try {
    var f = d.createElement("link");
    f.rel = "stylesheet";
    f.href =
      "https://fonts.googleapis.com/css?family=Great+Vibes:400|Instrument+Sans:400,500,600,700&display=swap";
    d.head.appendChild(f);
  } catch (e) {}

  // Webflow-style feature classes
  var h = d.documentElement,
    m = " w-mod-";
  h.className += m + "js";
  if ("ontouchstart" in w || (w.DocumentTouch && d instanceof DocumentTouch))
    h.className += m + "touch";

  w.dataLayer = w.dataLayer || [];

  function ready(fn) {
    "loading" === d.readyState
      ? d.addEventListener("DOMContentLoaded", fn)
      : fn();
  }

  // Announcement bar
  (async function () {
    var bar = d.getElementById("announcement-bar");
    if (!bar) return;
    try {
      var r = await fetch("https://backend.pixelatenest.com/api/announcement", {
        cache: "no-store",
      });
      if (!r.ok) return;
      var t = await r.json();
      if (t.text && t.enabled) {
        var c = d.getElementById("announcement-content");
        for (var i = 0; i < 20; i++) {
          var s = d.createElement("span");
          s.textContent = t.text;
          c.appendChild(s);
        }
        bar.style.display = "block";
      } else if (!t.enabled) bar.style.display = "none";
    } catch (e) {
      bar.style.display = "none";
    }
  })();

  // Idle prefetch of two likely next pages
  function prefetch() {
    [
      "https://www.pixelatenest.com/",
      "https://www.pixelatenest.com/services/app-development.html",
    ].forEach(function (u) {
      try {
        var l = d.createElement("link");
        l.rel = "prefetch";
        l.href = u;
        l.as = "document";
        d.head.appendChild(l);
      } catch (e) {}
    });
  }
  "requestIdleCallback" in w
    ? requestIdleCallback(prefetch, { timeout: 2e3 })
    : w.addEventListener("load", function () {
        setTimeout(prefetch, 1e3);
      });

  // Mobile menu
  ready(function () {
    var nav = d.querySelector('.w-nav[data-collapse="medium"]'),
      btn = d.querySelector(".menu-button"),
      wrap = d.querySelector(".nav-menu-wrapper"),
      close = d.querySelector(".mobile-menu-close");
    if (!nav || !btn) return;
    function shut() {
      nav.classList.add("w--closing");
      nav.classList.remove("w--open");
      setTimeout(function () {
        nav.classList.remove("w--closing");
      }, 300);
      btn.setAttribute("aria-expanded", "false");
      d.body.style.overflow = "";
    }
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (nav.classList.contains("w--open")) shut();
      else {
        nav.classList.add("w--open");
        btn.setAttribute("aria-expanded", "true");
        if (w.innerWidth <= 991) d.body.style.overflow = "hidden";
      }
    });
    close &&
      close.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        shut();
      });
    d.addEventListener("click", function (e) {
      e.target.closest(".navbar") || shut();
    });
    wrap &&
      wrap
        .querySelectorAll(".nav-link:not(.dropdown-toggle)")
        .forEach(function (a) {
          a.closest(".has-dropdown") || a.addEventListener("click", shut);
        });
    w.addEventListener("resize", function () {
      w.innerWidth > 991 && nav.classList.contains("w--open") && shut();
    });
  });

  // Mobile dropdowns
  ready(function () {
    d.querySelectorAll(".nav-item.has-dropdown > .dropdown-toggle").forEach(
      function (t) {
        t.addEventListener("click", function (e) {
          if (w.innerWidth <= 991) {
            e.preventDefault();
            e.stopPropagation();
            this.parentElement.classList.toggle("active");
          }
        });
      },
    );
    d.querySelectorAll(".dropdown-item.has-subdropdown").forEach(function (t) {
      t.addEventListener("click", function (e) {
        if (w.innerWidth <= 991) {
          e.preventDefault();
          e.stopPropagation();
          this.classList.toggle("active");
        }
      });
    });
  });

  // Sticky navbar
  ready(function () {
    var wrap = d.querySelector(".nav-wrap"),
      bar = wrap && wrap.querySelector(".navbar"),
      ph = null;
    if (!bar) return;
    function onScroll() {
      var y = w.pageYOffset || h.scrollTop;
      if (y > 40) {
        if (!bar.classList.contains("sticky")) {
          bar.classList.add("sticky");
          if (!ph) {
            ph = d.createElement("div");
            ph.className = "nav-placeholder";
            ph.style.height = bar.offsetHeight + "px";
            wrap.parentNode.insertBefore(ph, wrap.nextSibling);
          }
        }
      } else if (bar.classList.contains("sticky")) {
        bar.classList.remove("sticky");
        if (ph) {
          ph.parentNode.removeChild(ph);
          ph = null;
        }
      }
    }
    w.addEventListener("scroll", onScroll, { passive: true });
    w.addEventListener("resize", function () {
      ph && (ph.style.height = bar.offsetHeight + "px");
    });
    onScroll();
  });

  // Product rows animate in once
  var rows = d.querySelectorAll(".pn-prod-row");
  if (rows.length) {
    var obs = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("pn-anim-done");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    rows.forEach(function (r) {
      obs.observe(r);
    });
  }
})();
