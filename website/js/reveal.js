// Fade-up on scroll for common page components. Stagger = position inside parent.
(function () {
  var SEL = [
    ".offerings-headline", ".offerings-sub", ".offer-card",
    ".portfolio-heading", ".portfolio-grid", ".hero", ".faq-item",
    ".cta-section", ".footer-top", ".footer-wrap",
  ].join(",");
  var els = document.querySelectorAll(SEL);
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("reveal-in");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  els.forEach(function (el) {
    var i = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty("--reveal-delay", (i % 4) * 90 + "ms");
    el.classList.add("reveal");
    io.observe(el);
  });
})();
