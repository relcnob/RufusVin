const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".header-menu");
const searchBtn = document.querySelector("#search-icon");
const searchBar = document.querySelector(".header-searchbar");
const searchClose = document.querySelector(".searchbar-close");
let messageSent = 0;
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
    document
      .querySelector(".age-check-wrapper")
      .classList.remove("age-check-hidden");
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

// chat window

document.querySelector(".chat-window-toggle").addEventListener("click", () => {
  document.querySelector(".chat-window-wrapper").classList.add("show-chat");
  document
    .querySelector(".chat-window-toggle")
    .classList.add("hide-chat-toggle");
});

document.querySelector(".chat-header img").addEventListener("click", () => {
  document.querySelector(".chat-window-wrapper").classList.remove("show-chat");
  document
    .querySelector(".chat-window-toggle")
    .classList.remove("hide-chat-toggle");
});

// check if not emplty and append messages

document
  .querySelector(".chat-send-message button")
  .addEventListener("click", () => {
    if (document.querySelector(".chat-message-box").value) {
      const node = document.createElement("span");
      const header = document.createElement("h3");
      const textNode = document.createTextNode(
        document.querySelector(".chat-message-box").value
      );
      header.textContent = "You";
      node.appendChild(header);
      node.appendChild(textNode);
      node.classList.add("user-message");
      document.querySelector(".chat-messages-wrapper").appendChild(node);
      messageSent = messageSent + 1;
      setTimeout(checkAndReply, 1300);
    }
  });

document
  .querySelector("#chat-message")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      if (document.querySelector(".chat-message-box").value) {
        const node = document.createElement("span");
        const header = document.createElement("h3");
        const textNode = document.createTextNode(
          document.querySelector(".chat-message-box").value
        );
        header.textContent = "You";
        node.appendChild(header);
        node.appendChild(textNode);
        node.classList.add("user-message");
        document.querySelector(".chat-messages-wrapper").appendChild(node);
        messageSent = messageSent + 1;
        setTimeout(checkAndReply, 1000);
      }
    }
  });

function checkAndReply() {
  const node = document.createElement("span");
  const header = document.createElement("h3");
  const textNode = document.createTextNode(
    "Unfortunately there are no assistants available right now, please send us an email instead!"
  );
  header.textContent = "Rufus Vin";
  node.appendChild(header);
  node.appendChild(textNode);
  node.classList.add("assistant-message");
  document.querySelector(".chat-messages-wrapper").appendChild(node);
}

// Newsletter

document
  .querySelector(".footer-newsletter form")
  .addEventListener("submit", (event) => {
    document
      .querySelector(".newsletter-pop-up")
      .classList.add("newsletter-pop-up-visible");
    event.preventDefault();
  });

document
  .querySelector(".newsletter-pop-up div img")
  .addEventListener("click", () => {
    document
      .querySelector(".newsletter-pop-up")
      .classList.remove("newsletter-pop-up-visible");
  });

document
  .querySelector("#newsletter-pop-up-button")
  .addEventListener("click", () => {
    document
      .querySelector(".newsletter-pop-up")
      .classList.remove("newsletter-pop-up-visible");
  });
