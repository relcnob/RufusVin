const url = "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/wine?per_page=4";
const url2 = "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/wine?tags=12";
const url3 =
  "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/posts?tags=10&_embed";

// New in Store wines
fetch(url)
  .then((res) => res.json())
  .then((data) => handleNewProducts(data));

function handleNewProducts(data) {
  data.forEach(showNewProducts);
}

function showNewProducts(product) {
  const template = document.querySelector("#product-card-template").content;
  const parent = document.querySelector(".home-new-in-store");
  const myClone = template.cloneNode(true);

  myClone.querySelector("a").href = "product-page.html?id=" + product.id;
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

// Featured Wines
fetch(url2)
  .then((res) => res.json())
  .then((data) => handleFeaturedWines(data));

function handleFeaturedWines(data) {
  data.forEach(showFeaturedWines);
}

function showFeaturedWines(product) {
  const template = document.querySelector("#product-card-template").content;
  const parent = document.querySelector("#featured-wines");
  const myClone = template.cloneNode(true);

  myClone.querySelector("a").href = "product-page.html?id=" + product.id;
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

// Upcoming events

fetch(url3)
  .then((res) => res.json())
  .then((data) => handleUpcomingEvents(data));

function handleUpcomingEvents(data) {
  data.forEach(showUpcomingEvents);
}

function showUpcomingEvents(item) {
  console.log(item);
  const template = document.querySelector("#upcoming-events-template").content;
  const parent = document.querySelector(".home-events");
  const clone = template.cloneNode(true);

  //   change content

  clone.querySelector(".event-image-wrapper h2").textContent =
    item.title.rendered;
  clone.querySelector("#events-content").innerHTML = item.content.rendered;

  //   fetching featured image from post

  clone.querySelector("#events-image").src =
    item._embedded["wp:featuredmedia"][0].source_url;
  console.log;
  parent.appendChild(clone);
}
