let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let backButton = document.getElementById("back");

let seeMoreButtons = document.querySelectorAll(".seeMore");
let carousel = document.querySelector(".p-carousel");
let listHTML = document.querySelector(".p-carousel .list");

nextButton.onclick = function () {
  showSlider("next");
};

prevButton.onclick = function () {
  showSlider("prev");
};
let unAcceptClick;
const showSlider = (type) => {
  nextButton.style.pointerEvents = "none";
  prevButton.style.pointerEvents = "none";
  carousel.classList.remove("next", "prev");
  let items = document.querySelectorAll(".p-carousel .list .item");
  if (type === "next") {
    listHTML.appendChild(items[0]);
    carousel.classList.add("next");
  } else {
    let postionlast = items.length - 1;
    listHTML.prepend(items[postionlast]);
    carousel.classList.add("prev");
  }
  clearTimeout(unAcceptClick);
  unAcceptClick = setTimeout(() => {
    nextButton.style.pointerEvents = "auto";
    prevButton.style.pointerEvents = "auto";
  }, 2000);
};

seeMoreButtons.forEach((button) => {
  button.onclick = function () {
    carousel.classList.add("showDetail");
  };
});

backButton.onclick = function () {
  carousel.classList.remove("showDetail");
};
