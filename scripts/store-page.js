const url = "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/wine?per_page=50";

// fetch current URL and convert it to string
// search for parameters
const urlParams = new URLSearchParams(window.location.search);
// create new URL element to fetch all parameters of a type
urlFilters = new URL(window.location.href.toString());
let filterWineType = urlFilters.searchParams.getAll("wine-type");
let filterWineCountry = urlFilters.searchParams.getAll("wine-country");
let filterWineRegion = urlFilters.searchParams.getAll("wine-region");
let filterWineStyle = urlFilters.searchParams.getAll("wine-style");
let filterWinePairing = urlFilters.searchParams.getAll("food-pairing");
let filterMinPrice = urlFilters.searchParams.getAll("min-price");
let filterMaxPrice = urlFilters.searchParams.getAll("max-price");
let filterNatural = urlFilters.searchParams.getAll("natural-wine");
console.log(filterWineType);
console.log(filterWineCountry);
console.log(filterWineRegion);
console.log(filterWineStyle);
console.log(filterWinePairing);
console.log(filterMinPrice);
console.log(filterMaxPrice);
console.log(filterNatural);

fetch(url)
  .then((res) => res.json())
  .then((data) => handleProductList(data));

function handleProductList(data) {
  // CHECK FOR FILTERS AND DISPLAY PRODUCTS
  let filteredProducts = data.filter(function (wine) {
    // CONVERT FOOD PAIRINGS TO ARRAY
    let splitFoodPairing = wine.winefoodpairing.split(",");
    // check if filters are empty if yes update them with all options
    if (filterWineType.length == 0) {
      filterWineType = ["Red", "White", "Rose", "Sparkling"];
    }
    if (filterWineCountry.length == 0) {
      filterWineCountry = [
        "Italy",
        "France",
        "Germany",
        "Belgium",
        "Portugal",
        "Spain",
      ];
    }
    if (filterWineRegion.length == 0) {
      filterWineRegion = [
        "Rioja",
        "Bordeaux",
        "Tuscany",
        "Rheingau",
        "Nahe",
        "Ruwer",
        "Burgundy",
        "Brezeme",
        "Champagne",
        "Chablis",
        "Pfalz",
        "Franconia",
        "Lisbon",
        "Porto",
        "Antwerp",
        "Wallonie",
        "Bree",
        "Sicily",
        "Piemonte",
        "Limburg",
      ];
    }
    if (filterWineStyle.length == 0) {
      filterWineStyle = [
        "Rioja red",
        "Rioja white",
        "Bordeaux",
        "Sangiovese",
        "Riesling",
        "German spätburgunder",
        "Burgundy red",
        "Burgundy white",
        "Chablis white",
        "Loire red",
        "French syrah",
        "Merlot",
        "Champagne",
        "Lisbon red",
        "Lisbon white",
        "Port wine",
        "Belgian chardonnay",
        "Sicilian red",
        "Spumante",
        "Italian barolo",
        "Sparkling",
        "Erbaluce white",
        "Pet nat rosé",
        "Pinot noir",
      ];
    }
    if (filterWinePairing.length == 0) {
      filterWinePairing = ["beef", "pork", "poultry", "fish"];
    }

    if (filterMinPrice.length == 0) {
      filterMinPrice = 89;
    }
    if (filterMaxPrice.length == 0) {
      filterMaxPrice = 3999;
    }
    if (filterWinePairing.length == 1) {
      filterWinePairing[1] = filterWinePairing[0];
    }
    if (filterNatural.length == 0) {
      filterNatural = ["0", "1"];
    }

    return (
      filterWineType.includes(wine.winetype) &&
      filterWineCountry.includes(wine.winecountry) &&
      filterWineRegion.includes(wine.wineregion) &&
      filterWineStyle.includes(wine.winestyle) &&
      filterWinePairing.some((r) => splitFoodPairing.includes(r)) &&
      parseInt(filterMinPrice) <= wine.wineprice &&
      parseInt(filterMaxPrice) >= wine.wineprice &&
      filterNatural.some((r) => wine.winenatural.includes(r))
    );
  });
  filteredProducts.forEach(showProductList);
}
const parent = document.querySelector(".product-list-wrapper");

function showProductList(product) {
  // console.log(product);
  //GRAB TEMPLATE

  const template = document.querySelector("#product-card-template").content;

  //CLONE TEMPLATE
  const myClone = template.cloneNode(true);
  //POPULATE TEMPLATE

  myClone.querySelector(" a ").href = "product-page.html?id=" + product.id;

  myClone.querySelector(".pc-price").textContent = product.wineprice + " kr";
  myClone.querySelector(".pc-producer").textContent = product.wineproducer;
  myClone.querySelector(".pc-wine-name").textContent = product.winename;
  myClone.querySelector(".pc-wine-type").textContent =
    product.wineregion + " " + product.winegrape;
  myClone.querySelector(".product-card img").src = product.winepic1.guid;
  myClone.querySelector(".product-card img").alt = product.winename;
  // flag
  myClone
    .querySelector(".pc-ico-country")
    .classList.add("pc-ico-flag-" + product.winecountry);
  // points
  myClone.querySelector(".pc-ico-rating").textContent = product.winerating;
  // food
  let foodPairings = product.winefoodpairing.split(",");
  myClone
    .querySelector(".pc-ico-food-1")
    .classList.add("pc-ico-" + foodPairings[0]);
  myClone
    .querySelector(".pc-ico-food-2")
    .classList.add("pc-ico-" + foodPairings[1]);
  if (product.winenatural == 1) {
    myClone.querySelector(".pc-ico-natural").classList.add("pc-ico-leaf");
  }
  wineType = product.winetype.toLowerCase();
  myClone.querySelector(".pc-ico-type").classList.add("pc-ico-" + wineType);

  //  APPEND PRODUCT
  parent.appendChild(myClone);
}

let sortingOption = document.querySelector("#sort");
sortingOption.addEventListener("click", () => {
  console.log(sortingOption.value);
  if (sortingOption.value == "default") {
  } else if (sortingOption.value == "price-asc") {
    // PRICE ASCENDING
    let productCards = parent.children;
    let productCardsArray = [];
    for (let i = 0; i < productCards.length; i++) {
      productCardsArray.push(productCards[i]);
    }
    function sortByPrice(a, b) {
      let price1text = a.querySelector(".pc-price").textContent;
      let price2text = b.querySelector(".pc-price").textContent;
      let price1 = parseInt(price1text);
      let price2 = parseInt(price2text);
      console.log(price1);
      if (price1 == price2) return 0;
      else if (price1 < price2) return -1;
      else return 1;
    }
    productCardsArray.sort(sortByPrice);
    for (let i = 0; i < productCardsArray.length; i++) {
      parent.appendChild(productCardsArray[i]);
    }
  } else if (sortingOption.value == "price-desc") {
    // PRICE DESCENDING
    let productCards = parent.children;
    let productCardsArray = [];
    for (let i = 0; i < productCards.length; i++) {
      productCardsArray.push(productCards[i]);
    }
    function sortByPrice(a, b) {
      let price1text = a.querySelector(".pc-price").textContent;
      let price2text = b.querySelector(".pc-price").textContent;
      let price1 = parseInt(price1text);
      let price2 = parseInt(price2text);
      console.log(price1);
      if (price1 == price2) return 0;
      else if (price1 < price2) return 1;
      else return -1;
    }
    productCardsArray.sort(sortByPrice);
    for (let i = 0; i < productCardsArray.length; i++) {
      parent.appendChild(productCardsArray[i]);
    }
  } else if (sortingOption.value == "alph-desc") {
    // ALPHABETICALLY DESCENDING
    let productCards = parent.children;
    let productCardsArray = [];
    for (let i = 0; i < productCards.length; i++) {
      productCardsArray.push(productCards[i]);
    }
    function sortByPrice(a, b) {
      let name1 = a.querySelector(".pc-wine-name").textContent;
      let name2 = b.querySelector(".pc-wine-name").textContent;
      if (name1 == name2) return 0;
      else if (name1 < name2) return -1;
      else return 1;
    }
    productCardsArray.sort(sortByPrice);
    for (let i = 0; i < productCardsArray.length; i++) {
      parent.appendChild(productCardsArray[i]);
    }
  } else {
    // ALPHABETICALLY ASCENDING
    let productCards = parent.children;
    let productCardsArray = [];
    for (let i = 0; i < productCards.length; i++) {
      productCardsArray.push(productCards[i]);
    }
    function sortByPrice(a, b) {
      let name1 = a.querySelector(".pc-wine-name").textContent;
      let name2 = b.querySelector(".pc-wine-name").textContent;
      if (name1 == name2) return 0;
      else if (name1 < name2) return 1;
      else return -1;
    }
    productCardsArray.sort(sortByPrice);
    for (let i = 0; i < productCardsArray.length; i++) {
      parent.appendChild(productCardsArray[i]);
    }
  }
});

document.querySelector("#sort").addEventListener("click", () => {});
// PRODUCT CARD TEMPLATE

// <article class="product-card">
// <a href="product-page.html">
//   <section class="pc-icon-wrapper">
// 	<span class="pc-ico-country pc-ico-flag-fr"></span>
// 	<span class="pc-ico-type pc-ico-red" ></span>
// 	<span class="pc-ico-food-1 pc-ico-beef "></span>
// 	<span class="pc-ico-food-2 pc-ico-fish"></span>
// 	<span class="pc-ico-natural pc-ico-leaf"></span>
// 	<span class="pc-ico-rating">4.5</span>
//   </section>
//   <section class="pc-desc-wrapper">
// 	<p class="pc-price">299 kr.</p>
// 	<p class="pc-producer">Domaine Guy Robin & Fils </p>
// 	<p class="pc-wine-name">Chablis 1er Cru ‘Montee de Tonnerre</p>
// 	<p class="pc-wine-type">Burgundy Chablis</p>
//   </section>
//   <img src="assets/images/placeholder.png" alt="wine-name">
// </a>
// </article>
