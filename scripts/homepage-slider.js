const slide1 = document.querySelector(".slide-1");
const slide2 = document.querySelector(".slide-2");
const slide3 = document.querySelector(".slide-3");
const nextSlide = document.querySelector(".slider-nav-right");
const prevSlide = document.querySelector(".slider-nav-left");
const slideSelector1 = document.querySelector("#select-slide-1");
const slideSelector2 = document.querySelector("#select-slide-2");
const slideSelector3 = document.querySelector("#select-slide-3");
let activeSlide = 1;

nextSlide.addEventListener("click", () => {
  activeSlide = activeSlide + 1;
  if (activeSlide > 3) {
    activeSlide = 1;
  }
  updateSlide();
});

prevSlide.addEventListener("click", () => {
  activeSlide = activeSlide - 1;
  if (activeSlide < 1) {
    activeSlide = 3;
  }
  updateSlide();
});

function updateSlide() {
  if (activeSlide == 1) {
    slide1.className = "slide-1 pos-2";
    slide2.className = "slide-2 pos-3";
    slide3.className = "slide-3 pos-4";
  } else if (activeSlide == 2) {
    slide1.className = "slide-1 pos-1";
    slide2.className = "slide-2 pos-2";
    slide3.className = "slide-3 pos-3";
  } else if (activeSlide == 3) {
    slide1.className = "slide-1 pos-1";
    slide2.className = "slide-2 pos-1";
    slide3.className = "slide-3 pos-2";
  }
}

slideSelector1.addEventListener("click", () => {
  activeSlide = 1;
  updateSlide();
  slideSelector1.classList.add("selected-slide");
  slideSelector2.classList.remove("selected-slide");
  slideSelector3.classList.remove("selected-slide");
});

slideSelector2.addEventListener("click", () => {
  activeSlide = 2;
  updateSlide();
  slideSelector2.classList.add("selected-slide");
  slideSelector1.classList.remove("selected-slide");
  slideSelector3.classList.remove("selected-slide");
});
slideSelector3.addEventListener("click", () => {
  activeSlide = 3;
  updateSlide();
  slideSelector3.classList.add("selected-slide");
  slideSelector2.classList.remove("selected-slide");
  slideSelector1.classList.remove("selected-slide");
});
