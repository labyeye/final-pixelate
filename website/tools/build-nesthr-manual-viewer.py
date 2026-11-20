"""Writes pages/nesthr-user-manual.html: flip-book viewer (StPageFlip) over the page images in
assets/docs/user-manual/pages/ plus a PDF download button. Re-run after replacing the PDF
(re-render the images first: see tools/render-nesthr-manual.py)."""
import os, sys
from manuals_config import MANUALS, ROOT, d

M = MANUALS[sys.argv[1] if len(sys.argv) > 1 else "hr"]
N = len(os.listdir(d(M) + "/pages"))
PDF = "/assets/docs/user-manual/" + M["pdf"]
IMG = "/assets/docs/user-manual/" + M["sub"] + "pages"

pages = "\n".join(
    f'<div class="page"><img data-src="{IMG}/p{i:02d}.webp" alt="{M['name']} user manual page {i}" draggable="false"></div>'
    for i in range(1, N + 1)
)

HTML = """<!doctype html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-T64KPYDX6P"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-T64KPYDX6P");</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>@NAME@ User Manual: Read Online or Download PDF | Pixelate Nest</title>
<meta name="description" content="@DESC@">
<link rel="canonical" href="https://www.pixelatenest.com/pages/@VIEWER@">
<style>
:root{--bg:#f4f7fb;--ink:#0b1220;--blue:#024BAB;--bar:#fff}
@media (prefers-color-scheme:dark){:root{--bg:#0b1220;--ink:#e8eefc;--bar:#121a2b}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:flex;flex-direction:column;min-height:100vh}
header{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bar);border-bottom:2px solid #000}
header a.back{color:var(--ink);text-decoration:none;font-weight:700}
h1{font-size:1rem;margin:0}
.btn{display:inline-block;border:2px solid #000;background:var(--blue);color:#fff;padding:9px 16px;font-weight:700;font-size:.85rem;text-decoration:none;cursor:pointer;box-shadow:2px 2px 0 #000}
.btn.alt{background:#fff;color:#000}
main{flex:1;display:flex;align-items:center;justify-content:center;padding:16px;min-height:0}
#book{margin:0 auto}
.page{background:#fff;overflow:hidden}.page img{width:100%;height:100%;object-fit:contain;display:block;user-select:none}
footer{display:flex;gap:10px;align-items:center;justify-content:center;padding:12px;background:var(--bar);border-top:2px solid #000;flex-wrap:wrap}
footer span{min-width:90px;text-align:center;font-weight:700;font-size:.9rem}
</style>
</head>
<body>
<header>
  <a class="back" href="https://www.pixelatenest.com@BACK@">&larr; @NAME@</a>
  <h1>@NAME@ User Manual</h1>
  <a class="btn" href="@PDF@" download>Download PDF</a>
</header>
<main><div id="book">
@PAGES@
</div><noscript>Turn on JavaScript to read the flip book, or <a href="@PDF@">download the PDF</a>.</noscript></main>
<footer>
  <button class="btn alt" id="prev" type="button">&larr; Prev</button>
  <span id="pos">1 / @N@</span>
  <button class="btn alt" id="next" type="button">Next &rarr;</button>
  <button class="btn alt" id="full" type="button">Full screen</button>
</footer>
<script src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js"></script>
<script>
(function(){
var el=document.getElementById("book"),pages=el.querySelectorAll(".page"),N=pages.length;
function size(){var m=document.querySelector("main"),h=Math.min(window.innerHeight-170,1100),w=m.clientWidth-32,pw=Math.round(h*0.707),ph=h;
 if(w<=700){pw=Math.min(w,pw);ph=Math.round(pw/0.707)}else if(pw*2>w){pw=Math.floor(w/2);ph=Math.round(pw/0.707)}
 return {w:pw,h:ph}}
var s=size();
var pf=new St.PageFlip(el,{width:s.w,height:s.h,size:"fixed",showCover:true,usePortrait:true,mobileScrollSupport:false,maxShadowOpacity:.5,flippingTime:700});
function load(i){for(var k=Math.max(0,i-2);k<=Math.min(N-1,i+5);k++){var im=pages[k].querySelector("img");if(im&&!im.src)im.src=im.getAttribute("data-src")}}
pf.loadFromHTML(pages);load(0);
function upd(){var i=pf.getCurrentPageIndex();load(i);document.getElementById("pos").textContent=(i+1)+" / "+N}
pf.on("flip",upd);
document.getElementById("prev").onclick=function(){pf.flipPrev()};
document.getElementById("next").onclick=function(){pf.flipNext()};
document.getElementById("full").onclick=function(){var d=document.documentElement;document.fullscreenElement?document.exitFullscreen():d.requestFullscreen&&d.requestFullscreen()};
document.addEventListener("keydown",function(e){if(e.key==="ArrowRight")pf.flipNext();if(e.key==="ArrowLeft")pf.flipPrev()});
})();
</script>
</body>
</html>
"""

out = HTML.replace("@NAME@", M["name"]).replace("@DESC@", M["desc"]).replace("@VIEWER@", M["viewer"]).replace("@BACK@", M["back"]).replace("@PAGES@", pages).replace("@PDF@", PDF).replace("@N@", str(N))
with open(os.path.join(ROOT, "pages/" + M["viewer"]), "w", encoding="utf-8") as f:
    f.write(out)
print("pages:", N)
