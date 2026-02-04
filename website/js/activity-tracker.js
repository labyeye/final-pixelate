(function () {
  const API_URL = "https://backend.pixelatenest.com/api/user-activity";

  function getUserId() {
    let userId = localStorage.getItem("pixelate_user_id");
    if (!userId) {
      userId =
        "user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
      localStorage.setItem("pixelate_user_id", userId);
    }
    return userId;
  }

  const userId = getUserId();
  let activityId = null;
  const startTime = Date.now();
  let lastPingTime = Date.now();

  async function trackPageView() {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "page_view",
          userId: userId,
          url: window.location.href,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          startTime: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      if (data.id) {
        activityId = data.id;
      }
    } catch (error) {
      console.error("Tracking Error:", error);
    }
  }

  async function sendPing() {
    if (!activityId) return;

    const duration = Math.floor((Date.now() - startTime) / 1000);

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        keepalive: true,
        body: JSON.stringify({
          type: "ping",
          id: activityId,
          userId: userId,
          duration: duration,
        }),
      });
    } catch (error) {}
  }

  trackPageView();

  setInterval(sendPing, 5000);

  window.addEventListener("beforeunload", () => {
    sendPing();
  });
})();
