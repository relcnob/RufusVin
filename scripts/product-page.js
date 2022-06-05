const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/wine/" + id;
let quantity = parseInt(document.querySelector("#quantity").value);

fetch(url)
  .then((res) => res.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  console.log(product);

  //updating content
  document.querySelector(".product-header h1").textContent = product.winename;
  document.querySelector(".product-header span").textContent =
    product.winerating;
  // product details
  // COUNTRY
  document.querySelector(
    ".product-details ul:first-of-type li:nth-of-type(1)"
  ).textContent = product.winecountry;
  // REGION
  document.querySelector(
    ".product-details ul:first-of-type li:nth-of-type(2)"
  ).textContent = product.wineregion;
  //   WINERY
  document.querySelector(
    ".product-details ul:first-of-type li:nth-of-type(3)"
  ).textContent = product.wineproducer;
  //   TYPE
  document.querySelector(
    ".product-details ul:first-of-type li:nth-of-type(4)"
  ).textContent = product.winetype;
  //   GRAPE
  document.querySelector(
    ".product-details ul:last-of-type li:nth-of-type(1)"
  ).textContent = product.winegrape;
  //   YEAR
  document.querySelector(
    ".product-details ul:last-of-type li:nth-of-type(2)"
  ).textContent = product.wineyear;
  //   SIZE
  document.querySelector(
    ".product-details ul:last-of-type li:nth-of-type(3)"
  ).textContent = product.winebottlesize + " cl";
  //   ALCOHOL
  document.querySelector(
    ".product-details ul:last-of-type li:nth-of-type(4)"
  ).textContent = product.alcohol_percentage + " %";
  // MAIN IMAGE
  document.querySelector(".product-image").src = product.winepic1.guid;
  document.querySelector(".product-image").alt = product.winename;
  //   PRICE
  document.querySelector(".product-buy h1").textContent =
    product.wineprice + " kr";
  // DESCRIPTION
  document.querySelector(".product-description p").textContent =
    product.winedescription;
  // LIGHTNESS
  document
    .querySelector(
      ".product-sliders .wine-slider-wrapper:nth-of-type(1) .wine-slider"
    )
    .classList.add("position-" + product.winelightness);
  // SMOOTHNESS
  document
    .querySelector(
      ".product-sliders .wine-slider-wrapper:nth-of-type(2) .wine-slider"
    )
    .classList.add("position-" + product.winesmoothness);
  // DRYNESS
  document
    .querySelector(
      ".product-sliders .wine-slider-wrapper:nth-of-type(3) .wine-slider"
    )
    .classList.add("position-" + product.winedryness);
  // SMOOTHNESS
  document
    .querySelector(
      ".product-sliders .wine-slider-wrapper:nth-of-type(4) .wine-slider"
    )
    .classList.add("position-" + product.winesoftness);
  // TEMPERATURE
  document.querySelector(".product-temp span").textContent =
    product.winetemperature + "C";

  // REPLACING FOOD ICONS
  let foodPairings = product.winefoodpairing.split(",");
  console.log(foodPairings);

  document.querySelector(".product-food img:first-of-type").src =
    "assets/icons/ico-" + foodPairings[0] + ".svg";
  document.querySelector(".product-food img:nth-of-type(2)").src =
    "assets/icons/ico-" + foodPairings[1] + ".svg";
  // BREADCRUMBS
  document.querySelector(".breadcrumbs span").textContent = product.winename;
  //   DOCUMENT TITLE
  document.title = "RufusVin - " + product.winename;
}

// counter
// add amount
document.querySelector(".atc-add").addEventListener("click", () => {
  if (quantity > 5) {
    quantity = 6;
  } else {
    quantity = quantity + 1;
    document.querySelector("#quantity").value = quantity;
  }
});
// remove amount
document.querySelector(".atc-remove").addEventListener("click", () => {
  if (quantity < 2) {
    quantity = 1;
  } else {
    quantity = quantity - 1;
    document.querySelector("#quantity").value = quantity;
  }
});

const form = document.querySelector(".atc-wrapper");
function handleForm(event) {
  event.preventDefault();
  window.location.href =
    "basket.html?id=" +
    id +
    "&quantity= " +
    document.querySelector("#quantity").value;
}
form.addEventListener("submit", handleForm);
