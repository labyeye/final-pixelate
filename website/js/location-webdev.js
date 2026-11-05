document.addEventListener("DOMContentLoaded", function () {
  var cards = document.querySelectorAll(".ind-card");
  if (!("IntersectionObserver" in window)) { cards.forEach(function (c) { c.classList.add("is-visible"); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  cards.forEach(function (c) { io.observe(c); });
});
(function () {
        function initSnake() {
          var section = document.getElementById("pn-section");
          var snake = document.getElementById("pn-snake");
          if (!snake || !section) return;

          var svg = document.getElementById("pn-svg");
          var pathBg = document.getElementById("pn-path-bg");
          var pathFg = document.getElementById("pn-path-fg");
          var circles = Array.from(document.querySelectorAll(".pn-circle"));
          var steps = Array.from(document.querySelectorAll(".pn-step"));

          var totalLen = 0;
          var thresholds = [];
          var progress = 0; // 0 &rarr; 1
          var accDelta = 0; // accumulated wheel delta
          var TOTAL_DELTA = 1200; // wheel px needed to complete animation
          var touchPrevY = 0;

          /* ── Build the SVG path ── */
          function buildPath() {
            var svgRect = svg.getBoundingClientRect();
            var pts = circles.map(function (c) {
              var r = c.getBoundingClientRect();
              return {
                x: r.left + r.width / 2 - svgRect.left,
                y: r.top + r.height / 2 - svgRect.top,
                r: r.width / 2,
              };
            });

            var p0 = pts[0],
              p2 = pts[2],
              p3 = pts[3],
              p5 = pts[5];
            var dy = p3.y - p2.y;

            var d = [
              "M " + p0.x + "," + p0.y,
              "L " + p2.x + "," + p2.y,
              "a " + dy / 2 + "," + dy / 2 + " 0 0,1 0," + dy,
              "L " + p5.x + "," + p5.y,
            ].join(" ");

            pathBg.setAttribute("d", d);
            pathFg.setAttribute("d", d);

            totalLen = pathFg.getTotalLength();
            pathFg.style.strokeDasharray = totalLen;
            pathFg.style.strokeDashoffset = totalLen - totalLen * progress;

            // Find path-length threshold for each circle (binary search on 400 samples)
            thresholds = pts.map(function (p) {
              var best = 0,
                bestDist = Infinity;
              for (var i = 0; i <= 400; i++) {
                var t = (i / 400) * totalLen;
                var pt = pathFg.getPointAtLength(t);
                var d2 = Math.hypot(pt.x - p.x, pt.y - p.y);
                if (d2 < bestDist) {
                  bestDist = d2;
                  best = t;
                }
              }
              return best;
            });
          }

          /* ── Apply progress 0-1 to path + step activation ── */
          function setProgress(p) {
            progress = Math.max(0, Math.min(1, p));
            accDelta = progress * TOTAL_DELTA;
            var drawn = totalLen * progress;
            pathFg.style.strokeDashoffset = totalLen - drawn;
            thresholds.forEach(function (t, i) {
              steps[i].classList.toggle("active", drawn >= t - 1);
            });
          }

          /* ── Should wheel/touch be captured? ── */
          function inLockZone(goingDown) {
            var rect = section.getBoundingClientRect();
            var wh = window.innerHeight;

            // Section must be visible at all
            if (rect.top > wh || rect.bottom < 0) return false;

            // Going down: lock once section top is near/past viewport top
            if (goingDown) {
              if (progress > 0 && progress < 1) return true; // mid-animation always lock
              if (progress >= 1) return false; // done &rarr; scroll through
              return rect.top <= 60; // section top at viewport top &rarr; start
            }

            // Going up: lock if animation has started (so they can rewind)
            return progress > 0 && rect.top <= wh;
          }

          /* ── Wheel (desktop) ── */
          window.addEventListener(
            "wheel",
            function (e) {
              var goingDown = e.deltaY >= 0;
              if (!inLockZone(goingDown)) return;

              e.preventDefault();

              // Normalize: deltaMode 1 = lines (~40px each), mode 2 = pages
              var raw = e.deltaY;
              if (e.deltaMode === 1) raw *= 40;
              if (e.deltaMode === 2) raw *= window.innerHeight;

              accDelta = Math.max(0, Math.min(TOTAL_DELTA, accDelta + raw));
              setProgress(accDelta / TOTAL_DELTA);
            },
            { passive: false },
          );

          /* ── Touch (mobile) ── */
          window.addEventListener(
            "touchstart",
            function (e) {
              touchPrevY = e.touches[0].clientY;
            },
            { passive: true },
          );

          window.addEventListener(
            "touchmove",
            function (e) {
              var dy = touchPrevY - e.touches[0].clientY;
              touchPrevY = e.touches[0].clientY;
              var goingDown = dy >= 0;

              if (!inLockZone(goingDown)) return;

              e.preventDefault();
              accDelta = Math.max(
                0,
                Math.min(TOTAL_DELTA, accDelta + dy * 2.5),
              );
              setProgress(accDelta / TOTAL_DELTA);
            },
            { passive: false },
          );

          /* ── Init ── */
          function init() {
            buildPath();
            // Pre-check if already scrolled past section (e.g. page refresh at bottom)
            var rect = section.getBoundingClientRect();
            if (rect.bottom < 0) setProgress(1);
          }

          if (document.readyState === "complete") {
            init();
          } else {
            window.addEventListener("load", init);
          }

          window.addEventListener("resize", function () {
            buildPath();
          });
        }

        initSnake();
      })();
