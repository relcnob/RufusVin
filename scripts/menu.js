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

const searchbar = document.querySelector(".header-searchbar input");

searchbar.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    window.location.href = "store.html?search=" + searchbar.value;
    console.log("enter");
  }
});

// AGE CHECKER
// https://www.w3schools.com/js/js_cookies.asp

function getCookie(cookieName) {
  let name = cookieName + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function ageCheck() {
  let ageCheckValue = getCookie("ageCheckValue");
  if (ageCheckValue != "") {
    console.log(ageCheckValue);
    document
      .querySelector(".age-check-wrapper")
      .classList.add("age-check-hidden");
  } else {
  }
}

document.querySelector("#cookie-yes").addEventListener("click", () => {
  const date = new Date();
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
  console.log(date);
  let expires = "expires=" + date.toUTCString();
  document.cookie = "ageCheckValue=true;" + expires + ";path=/";
  ageCheck();
});
ageCheck();
