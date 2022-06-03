const url = "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/wine?per_page=50";

fetch(url)
  .then((res) => res.json())
  .then((data) => handleProductList(data));

function handleProductList(data) {
  //function needs different name from api.js to work
  //console.log(data);
  data.forEach(showProductList);
}

function showProductList(product) {
  const parent = document.querySelector(".product-list-wrapper");
  console.log(product);
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
