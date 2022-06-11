document.querySelector("#contact-link").addEventListener("click", () => {
  document
    .querySelector(".contact-pop-up")
    .classList.add("contact-pop-up-visible");
});

document
  .querySelector(".contact-pop-up div img")
  .addEventListener("click", () => {
    document
      .querySelector(".contact-pop-up")
      .classList.remove("contact-pop-up-visible");
  });
