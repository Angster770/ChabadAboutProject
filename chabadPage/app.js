"use strict";

// GLOBAL query selectors
const contentContainer = document.querySelectorAll(".content_container_el");
const slideImgs = document.querySelectorAll(".slide_img");
const imgsComments = document.querySelectorAll(".img_comment");
const modal = document.querySelector(".modal_popout");
const overlay = document.querySelector(".overlay");
const closeModalButton = document.querySelector(".modal--close");
const openModalButton = document.querySelector(".chabadModalButton");
const sections = document.querySelectorAll(".section");
const historySubContainers = document.querySelectorAll(
  ".history_sub_container"
);
// tabs
const tabParent = document.querySelector(".tab_container");
const contents = document.querySelectorAll(".content_container_el");
const tabs = document.querySelectorAll(".button_tab_style");
//FOREACHS

// hiding the content of the what is section 2 and displaying only 1
tabs.forEach((t) => {
  if (t.classList.contains("tab1_button")) t.classList.add("active_button");
});

contentContainer.forEach((container) => {
  if (!container.classList.contains("tab_content1"))
    container.classList.add("invisible");
});
// click on button it get s chosen

// hiding all imgs other than the tab 1 img
// slideImgs.forEach((container) => {
//   if (!container.classList.contains("slide1"))
//     container.classList.add("invisible");
// });

// hiding all icomment other than the tab 1 comment
imgsComments.forEach((container) => {
  if (!container.classList.contains("img1_comment"))
    container.classList.add("invisible");
});

// hiding the overlay and modal
overlay.classList.add("invisible");
modal.classList.add("invisible");

// FUNCTIONS;
// display modal and hide modal
// func to show modal
const showModalFunc = () => {
  overlay.classList.remove("invisible");
  modal.classList.remove("invisible");
};
// func to hide modal
const hideModalFunc = () => {
  overlay.classList.add("invisible");
  modal.classList.add("invisible");
};

// function to reveal one and hide the other

// EVENT LISTENERS
openModalButton.addEventListener("click", showModalFunc);
closeModalButton.addEventListener("click", hideModalFunc);

//--- Revealing sections upon scroll

// removing the rise effect
const secObserveFunc = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(secObserveFunc, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (sec) {
  sectionObserver.observe(sec);
  sec.classList.add("section--hidden");
});

// implementing sticky nav bar
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const navObserveFunc = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const navOps = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const navObserver = new IntersectionObserver(navObserveFunc, navOps);
navObserver.observe(header);

// if (!container.classList.contains("tab_content1"))
// container.classList.add("invisible");
// tabs.forEach(tab=> if(tab.classList.contains('')))

//
// -- TABBED COMPONENT

contents.forEach((c) => c.classList.add(".invisible"));

tabParent.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".button_tab_style");
  console.log(clicked);
  console.log(`.tab_content${clicked.dataset.tab}`);
  if (!clicked) return;
  // hide all other content and only show content of tab

  contentContainer.forEach((container) => {
    container.classList.remove("invisible");
    if (!container.classList.contains(`tab_content${clicked.dataset.tab}`))
      container.classList.add("invisible");
    console.log(clicked.dataset.tab);
  });

  // remove active_button class from all other tabs and only add to tab clicked
  tabs.forEach((t) => {
    t.classList.remove("active_button");
    if (t.classList.contains(`tab${clicked.dataset.tab}_button`))
      t.classList.add("active_button");
  });
});

// imgs slider
// slideImgs.forEach((container) => {
//   if (!container.classList.contains("slide1"))
//     container.classList.add("invisible");
// });
const slider_img_container = document.querySelector(".slides_img_container");
// const slides = document.querySelectorAll(".slide_img");

slider_img_container.style.transform = `scale(0.4) translateX(0px)`;
// slider_img_container.style.overflow = "visible";

const imgContent = document.querySelectorAll(".img_comment");

const btnRight = document.querySelector(".right_arrow");
const btnLeft = document.querySelector(".left_arrow");

// slideImgs.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

let curSlide = 0;
let maxSlide = slideImgs.length;
const goToSlideFunc = function (slide) {
  slideImgs.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
  imgContent.forEach(
    (c, i) => (c.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlideFunc = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlideFunc(curSlide);
};

const prevSlideFunc = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlideFunc(curSlide);
};
// slides.forEach((s,i) => s.)
btnLeft.addEventListener("click", nextSlideFunc);
btnRight.addEventListener("click", prevSlideFunc);

