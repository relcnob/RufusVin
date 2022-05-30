const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".header-menu");
const searchBtn = document.querySelector("#search-icon");
const searchBar = document.querySelector(".header-searchbar");
const searchClose = document.querySelector(".searchbar-close");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("show-menu");
  menuToggle.classList.toggle("open");
  searchBar.classList.remove("searchbar-visible");
});

searchBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("show-menu");
  menuToggle.classList.remove("open");
  searchBar.classList.toggle("searchbar-visible");
});

searchClose.addEventListener("click", () => {
  searchBar.classList.remove("searchbar-visible");
});
