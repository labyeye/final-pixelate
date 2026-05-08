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
      const payload = {
        type: "page_view",
        userId: userId,
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        startTime: new Date().toISOString(),
      };
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = text;
      }
      if (!response.ok) {
        return;
      }
      if (data && data.id) {
        activityId = data.id;
      }
    } catch (error) {}
  }

  async function sendPing() {
    if (!activityId) return;

    const duration = Math.floor((Date.now() - startTime) / 1000);

    try {
      const payload = {
        type: "ping",
        id: activityId,
        userId: userId,
        duration: duration,
      };
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        keepalive: true,
        body: JSON.stringify(payload),
      });
    } catch (error) {}
  }
})();
