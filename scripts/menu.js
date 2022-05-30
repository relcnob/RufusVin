const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".header-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("show-menu");
  menuToggle.classList.toggle("open");
});
