(function () {
  // Cookie banner + consent-gated visitor analytics. Nothing is stored or sent
  // until the visitor clicks "Accept"; IP + location are added server-side.
  var H = location.hostname;
  var URL = "https://backend.pixelatenest.com/api/telemetry";
  var POLICY = "https://www.pixelatenest.com/legal/cookie-policy.html";
  var CK = "pn_consent";

  var cookie = function (k) {
    var m = document.cookie.match("(?:^|; )" + k + "=([^;]*)");
    return m ? m[1] : "";
  };
  var setChoice = function (v) {
    document.cookie =
      CK + "=" + v + ";path=/;max-age=31536000;SameSite=Lax" +
      (location.protocol === "https:" ? ";Secure" : "");
  };
  var ls = function (k, v) {
    try {
      if (v === null) return localStorage.removeItem(k);
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) {}
  };
  var rnd = function (p) {
    return p + Math.random().toString(36).slice(2, 11) + "_" + Date.now();
  };

  var started = false;
  var sid, uid;

  function pagePath() {
    return location.pathname.replace(/\/index\.html$/, "/") || "/";
  }

  function start() {
    if (started) return;
    started = true;
    uid = ls("pixelate_user_id");
    if (!uid) ls("pixelate_user_id", (uid = rnd("user_")));
    try {
      sid = sessionStorage.getItem("pixelate_sid");
      if (!sid) sessionStorage.setItem("pixelate_sid", (sid = rnd("s_")));
    } catch (e) {
      sid = rnd("s_");
    }

    var ua = navigator.userAgent;
    var browser = /Edg\//.test(ua)
      ? "Edge"
      : /OPR\//.test(ua)
        ? "Opera"
        : /Chrome\//.test(ua)
          ? "Chrome"
          : /Firefox\//.test(ua)
            ? "Firefox"
            : /Safari\//.test(ua)
              ? "Safari"
              : "Other";
    var os = /Android/.test(ua)
      ? "Android"
      : /iPhone|iPad/.test(ua)
        ? "iOS"
        : /Windows/.test(ua)
          ? "Windows"
          : /Mac OS/.test(ua)
            ? "macOS"
            : /Linux/.test(ua)
              ? "Linux"
              : "Other";
    var kind = /Mobi|Android|iPhone/.test(ua) ? "Mobile" : "Desktop";
    var tz = "";
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (e) {}

    function send(type, extra) {
      if (cookie(CK) !== "granted") return;
      var e = {
        sid: sid,
        uid: uid,
        platform: "web",
        type: type,
        v: "web",
        device: browser + " " + kind,
        os: os,
        page: pagePath(),
        consent: true,
      };
      for (var k in extra) e[k] = extra[k];
      var body = JSON.stringify({ events: [e] });
      // text/plain avoids a CORS preflight; sendBeacon survives page unload.
      if (!(navigator.sendBeacon && navigator.sendBeacon(URL, body))) {
        fetch(URL, {
          method: "POST",
          body: body,
          keepalive: true,
          headers: { "Content-Type": "text/plain" },
        }).catch(function () {});
      }
    }

    send("page", {
      ref: document.referrer,
      qs: location.search,
      lang: navigator.language,
      tz: tz,
      screen: screen.width + "x" + screen.height,
    });
    setInterval(function () {
      if (document.visibilityState === "visible") send("ping");
    }, 30000);

    // Rate-limit crash reports so one broken loop can't flood the API.
    var sent = 0;
    function crash(msg, stack) {
      if (sent++ < 5)
        send("crash", { msg: String(msg), stack: String(stack || "") });
    }
    window.addEventListener("error", function (ev) {
      // Ignore cross-origin "Script error." (no useful info) and resource load errors.
      if (!ev.message || ev.message === "Script error.") return;
      crash(
        ev.message +
          " @" +
          (ev.filename || "").split("/").pop() +
          ":" +
          ev.lineno,
        ev.error && ev.error.stack,
      );
    });
    window.addEventListener("unhandledrejection", function (ev) {
      var r = ev.reason;
      crash("Unhandled rejection: " + ((r && r.message) || r), r && r.stack);
    });
  }

  function apply(granted) {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
      });
    }
    if (granted) {
      // localhost: show the banner but don't pollute production data.
      if (H !== "localhost" && H !== "127.0.0.1") start();
    } else {
      // Withdrawn / rejected: forget the identifiers; running timers go quiet
      // because send() re-checks the consent cookie.
      ls("pixelate_user_id", null);
      try {
        sessionStorage.removeItem("pixelate_sid");
      } catch (e) {}
    }
  }

  function banner() {
    if (document.getElementById("pn-cookie")) return;
    var css = document.createElement("style");
    css.textContent =
      "#pn-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;max-width:760px;margin:0 auto;background:#0b1633;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:18px 20px;box-shadow:0 12px 40px rgba(0,0,0,.4);font:14px/1.5 DM Sans,system-ui,sans-serif;display:flex;gap:16px;align-items:center;flex-wrap:wrap}" +
      "#pn-cookie p{margin:0;flex:1 1 320px;font-size:14px;line-height:1.5;color:#e6ebf7}" +
      "#pn-cookie a{color:#7eb8f7;text-decoration:underline}" +
      "#pn-cookie .pn-b{display:flex;gap:10px}" +
      "#pn-cookie button{cursor:pointer;border-radius:10px;padding:10px 20px;font-weight:700;font-size:14px;border:1px solid #fff;background:transparent;color:#fff}" +
      "#pn-cookie button.pn-y{background:#fff;color:#0547ab;border-color:#fff}";
    document.head.appendChild(css);
    var d = document.createElement("div");
    d.id = "pn-cookie";
    d.setAttribute("role", "dialog");
    d.setAttribute("aria-label", "Cookie consent");
    d.innerHTML =
      "<p>We use cookies and similar tech to count visitors and improve this site. If you accept, we record your IP address, approximate location, pages visited and device details for 90 days. Reject keeps tracking off. <a href=\"" +
      POLICY +
      "\">Cookie Policy</a></p><div class=\"pn-b\"><button type=\"button\" class=\"pn-n\">Reject</button><button type=\"button\" class=\"pn-y\">Accept</button></div>";
    d.querySelector(".pn-y").onclick = function () {
      choose("granted");
    };
    d.querySelector(".pn-n").onclick = function () {
      choose("denied");
    };
    document.body.appendChild(d);
    d.querySelector(".pn-y").focus();
  }

  function choose(v) {
    setChoice(v);
    var b = document.getElementById("pn-cookie");
    if (b) b.remove();
    apply(v === "granted");
  }

  window.pnCookieSettings = banner;

  function init() {
    var c = cookie(CK);
    if (c === "granted" || c === "denied") apply(c === "granted");
    else apply(false), banner();
  }
  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
