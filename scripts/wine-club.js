const url = "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/wine?tags=9";

fetch(url)
  .then((res) => res.json())
  .then((data) => handleWineClubList(data));

function handleWineClubList(data) {
  data.forEach(showWineClubList);
}

function showWineClubList(product) {
  const template = document.querySelector("#product-card-template").content;
  const parent = document.querySelector(".wine-club-wrapper");
  const myClone = template.cloneNode(true);
  console.log(template);

  myClone.querySelector("a").href = "product-page.html?id=" + product.id;
  myClone.querySelector(".pc-price").textContent = " ";
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

document.querySelector("#wine-club-join").addEventListener("click", () => {
  document
    .querySelector(".wine-club-pop-up")
    .classList.add("wine-club-pop-up-visible");
});

document
  .querySelector(".wine-club-pop-up div img")
  .addEventListener("click", () => {
    document
      .querySelector(".wine-club-pop-up")
      .classList.remove("wine-club-pop-up-visible");
  });
