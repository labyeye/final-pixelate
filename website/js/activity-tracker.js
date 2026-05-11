!(function () {
  !(function () {
    let t = localStorage.getItem("pixelate_user_id");
    t ||
      ((t =
        "user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()),
      localStorage.setItem("pixelate_user_id", t));
  })();
  Date.now();
  Date.now();
})();
