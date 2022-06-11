document.querySelector("#account-link").addEventListener("click", () => {
  document
    .querySelector(".account-pop-up")
    .classList.add("account-pop-up-visible");
});

document.querySelector("#account-link-2").addEventListener("click", () => {
  document
    .querySelector(".account-pop-up")
    .classList.add("account-pop-up-visible");
});

document.querySelector("#account-link-3").addEventListener("click", () => {
  document
    .querySelector(".account-pop-up")
    .classList.add("account-pop-up-visible");
});

document
  .querySelector(".account-pop-up div img")
  .addEventListener("click", () => {
    document
      .querySelector(".account-pop-up")
      .classList.remove("account-pop-up-visible");
  });
