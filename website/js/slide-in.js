(function () {
  // Slide each top-level section in from alternating sides as it scrolls into view.
  // Skips nav, footer and the first section after the nav (hero) so the page top never flashes.
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var css = document.createElement("style");
  css.textContent =
    "body{overflow-x:clip}" +
    ".pn-slide{opacity:0;transition:opacity .8s ease,transform .8s cubic-bezier(.22,.8,.3,1);will-change:transform,opacity}" +
    ".pn-slide.pn-l{transform:translateX(-80px)}" +
    ".pn-slide.pn-r{transform:translateX(80px)}" +
    ".pn-slide.pn-in{opacity:1;transform:none}";
  document.head.appendChild(css);

  function init() {
    var secs = Array.prototype.filter.call(
      document.querySelectorAll("section"),
      function (s) {
        return (
          !s.parentElement.closest("section") &&
          !s.closest("nav, footer, header") &&
          !/\b(nav-wrap|footer|home-hero-v1|svc-carousel-section)\b/.test(
            s.className,
          ) &&
          !s.querySelector(".svc-pin-wrapper")
        );
      },
    );
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("pn-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    // city pages: .mzp-reveal cards rise into place (CSS in state.css) once visible
    var io2 = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io2.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".mzp-reveal").forEach(function (el) {
      io2.observe(el);
    });
    secs.forEach(function (s, i) {
      s.classList.add("pn-slide", i % 2 ? "pn-r" : "pn-l");
      io.observe(s);
    });
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
