const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/accounts/" + id;

fetch(url)
  .then((res) => res.json())
  .then((data) => showAccountDetails(data));

function showAccountDetails(account) {
  console.log(account);

  if (id) {
    document.querySelector("#details-first-name").textContent =
      account.firstname;
    document.querySelector("#details-last-name").textContent = account.lastname;
    document.querySelector("#details-email").textContent = account.email;
    document.querySelector("#details-phone-number").textContent =
      "+45 " + account.phonenumber;
    document.querySelector("#details-company-name").textContent =
      account.companyname;
    document.querySelector("#details-street-name").textContent =
      account.streetname;
    document.querySelector("#details-apartment").textContent =
      account.apartmentname;
    document.querySelector("#details-country").textContent = account.country;
    document.querySelector("#details-city").textContent = account.city;
    document.querySelector("#details-postal-code").textContent =
      account.postalcode;
  } else {
    window.location.href = "account.html";
  }
}

document
  .querySelector("#account-details-edit")
  .addEventListener("click", () => {
    document.querySelector(".edit-pop-up").classList.add("edit-pop-up-visible");
  });

document.querySelector(".edit-pop-up div img").addEventListener("click", () => {
  document
    .querySelector(".edit-pop-up")
    .classList.remove("edit-pop-up-visible");
});
