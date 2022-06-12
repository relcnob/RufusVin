const url = "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/accounts";
let accountArray = [];

fetch(url)
  .then((res) => res.json())
  .then((data) => handleAccountArray(data));

function handleAccountArray(data) {
  data.forEach(addToArray);
}

function addToArray(account) {
  accountArray.push(account);
}

document.querySelector("#account-link").addEventListener("click", () => {
  const isFound = accountArray.some((element) => {
    console.log(element.email);
    console.log(element.userpassword);
    if (
      element.email == document.querySelector("#account-email-log-in").value &&
      element.userpassword ==
        document.querySelector("#account-password-log-in").value
    ) {
      console.log("okay");
      window.location.href = "account-details.html?id=" + element.id;
    } else {
      console.log("notokay");
    }
  });
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

document.querySelector("#account-link").addEventListener("click", () => {
  document
    .querySelector(".log-in-pop-up")
    .classList.add("log-in-pop-up-visible");
});

document
  .querySelector(".log-in-pop-up div img")
  .addEventListener("click", () => {
    document
      .querySelector(".log-in-pop-up")
      .classList.remove("log-in-pop-up-visible");
  });
