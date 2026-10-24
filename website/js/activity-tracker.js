(function () {
  var H = location.hostname;
  if (H === "localhost" || H === "127.0.0.1") return;
  var URL = "https://backend.pixelatenest.com/api/telemetry";
  var ls = function (k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) {}
  };
  var rnd = function (p) {
    return p + Math.random().toString(36).slice(2, 11) + "_" + Date.now();
  };
  var uid = ls("pixelate_user_id");
  if (!uid) ls("pixelate_user_id", (uid = rnd("user_")));
  var sid;
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

  function send(type, extra) {
    var e = {
      sid: sid,
      uid: uid,
      platform: "web",
      type: type,
      v: "web",
      device: browser + " " + kind,
      os: os,
      page: pagePath(),
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
  function pagePath() {
    return location.pathname.replace(/\/index\.html$/, "/") || "/";
  }

  send("page");
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
})();
