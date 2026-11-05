"""One-off: copy ind-card + process-snake CSS/JS from index.html/services.css into shared files."""
idx = open('index.html', encoding='utf-8').read().replace('\r\n', '\n')
a = idx.index('/* ===== Process Snake Timeline ===== */')
b = idx.index('/* ===== End Process Snake Timeline ===== */')
pn = idx[a:b]

svc = open('css/services.css', encoding='utf-8').read().replace('\r\n', '\n')
i = svc.index('.ind-grid {')
j = svc.index('@media (prefers-reduced-motion: reduce) {\n  .ind-card')
j = svc.index('}\n}', j) + 3
ind = svc[i:j]

extra = """
.ind-grid.ind-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.ind-grid.ind-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.ind-grid .ind-card { min-height: 0; }
.ind-arrow { font-size: 22px; }
@media (max-width: 1200px) { .ind-grid.ind-cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 900px) { .ind-grid.ind-cols-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 600px) { .ind-grid.ind-cols-3, .ind-grid.ind-cols-4 { grid-template-columns: 1fr; } }
"""

p = 'css/pages/service-locations.css'
raw = open(p, newline='', encoding='utf-8').read()
if 'webdev location' not in raw:
    add = '\n/* ===== webdev location: industries-style cards + process snake ===== */\n' + ind + extra + pn
    if '\r\n' in raw:
        add = add.replace('\n', '\r\n')
    open(p, 'w', newline='', encoding='utf-8').write(raw + add)

s = idx.index('(function () {\n        function initSnake()')
e = idx.index('initSnake();\n      })();', s) + len('initSnake();\n      })();')
obs = """document.addEventListener("DOMContentLoaded", function () {
  var cards = document.querySelectorAll(".ind-card");
  if (!("IntersectionObserver" in window)) { cards.forEach(function (c) { c.classList.add("is-visible"); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  cards.forEach(function (c) { io.observe(c); });
});
"""
open('js/location-webdev.js', 'w', encoding='utf-8').write(obs + idx[s:e] + '\n')
print(len(ind), len(pn))
