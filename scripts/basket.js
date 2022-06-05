const urlParams = new URLSearchParams(window.location.search);
const url = "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/wine?per_page=50";
urlInfo = new URL(window.location.href.toString());

let fetchedID = urlInfo.searchParams.getAll("id");
let fetchedQty = urlInfo.searchParams.getAll("quantity");
const submitButton = document.querySelector(".basket-form-submit");
let productArray = [
  {
    id: "77",
    qty: "1",
  },
  {
    id: "62",
    qty: "2",
  },
];
let basketItemNumber = 0;
let shippingMethod, paymentMethod, subTotal, shippingPrice, totalPrice;
let discountCode = "derail";

subTotal = 0;
console.log(fetchedID);
console.log(fetchedQty);

fetch(url)
  .then((res) => res.json())
  .then((data) => handleBasketList(data));

function handleBasketList(data) {
  if (fetchedID.length !== 0) {
    productArray.push({
      id: fetchedID[0],
      qty: fetchedQty[0],
    });
  }
  let filteredData = data.filter(function (wine) {
    let stringID = wine.id.toString();
    let idArray = productArray.map((a) => a.id);
    return idArray.includes(stringID);
  });
  filteredData.forEach(showBasketList);
}

function showBasketList(wine) {
  const parent = document.querySelector(".basket-contents");
  const template = document.querySelector("#basket-card-template").content;
  const myClone = template.cloneNode(true);
  const winePrice = parseInt(wine.wineprice);
  console.log(productArray.find((x) => x.id === wine.id.toString()).qty);

  myClone.querySelector(".basket-pc-name").textContent = wine.winename;
  myClone.querySelector(".basket-pc-name").href =
    "product-page.html?id=" + wine.id;
  myClone.querySelector(".basket-pc-quantity").textContent = productArray.find(
    (x) => x.id === wine.id.toString()
  ).qty;
  myClone.querySelector(".basket-pc-item-price").textContent =
    wine.wineprice + " kr.";
  myClone.querySelector(".basket-pc-total-price").textContent =
    winePrice * productArray.find((x) => x.id === wine.id.toString()).qty +
    ".00 kr.";
  myClone.querySelector("img").src = wine.winepic1.guid;
  myClone.querySelector("img").alt = wine.winename;
  subTotal =
    subTotal +
    winePrice * productArray.find((x) => x.id === wine.id.toString()).qty;
  updatePrice();
  myClone.querySelector(".remove-from-basket").addEventListener("click", () => {
    console.log(totalPrice);
    totalPrice =
      totalPrice -
      winePrice * productArray.find((x) => x.id === wine.id.toString()).qty;
    subTotal =
      subTotal -
      winePrice * productArray.find((x) => x.id === wine.id.toString()).qty;
    document.querySelector("#total-amount").textContent =
      totalPrice + ".00 kr.";
    document.querySelector("#subtotal-amount").textContent =
      totalPrice + ".00 kr.";
  });
  parent.appendChild(myClone);
}
submitButton.addEventListener("click", () => {
  let formValid = false;
  console.log(
    document
      .querySelector(".basket-payment-information input:nth-of-type(1)")
      .checkValidity()
  );
  checkFormValidation();
  function checkFormValidation() {
    if (
      document
        .querySelector(".basket-payment-information input:nth-of-type(1)")
        .checkValidity() ||
      !document
        .querySelector(".basket-payment-information input:nth-of-type(2)")
        .checkValidity() ||
      !document
        .querySelector(".basket-payment-information input:nth-of-type(4)")
        .checkValidity() ||
      !document
        .querySelector(".basket-payment-information input:nth-of-type(6)")
        .checkValidity() ||
      !document
        .querySelector(".basket-payment-information input:nth-of-type(7)")
        .checkValidity() ||
      !document
        .querySelector(".basket-payment-information input:nth-of-type(8)")
        .checkValidity() ||
      !document
        .querySelector(".basket-information input:nth-of-type(1)")
        .checkValidity()
    ) {
    } else {
      formValid = true;
    }
  }

  if (totalPrice < 0 || formValid == false) {
  } else {
    window.location.href = "thankyou.html";
  }
});

document.querySelector("#shipping-label").addEventListener("click", () => {
  updatePrice();
});
document.querySelector("#pick-up-label").addEventListener("click", () => {
  updatePrice();
});

document
  .querySelector(".basket-discount span")
  .addEventListener("click", () => {
    updatePrice();
  });

function updatePrice() {
  document.querySelector("#subtotal-amount").textContent = subTotal + ".00 kr.";
  if (document.querySelector("#pick-up").checked) {
    shippingPrice = 0;
  } else if (document.querySelector("#shipping").checked) {
    shippingPrice = 49;
  }
  document.querySelector("#shipping-amount").textContent =
    shippingPrice + ".00 kr.";
  totalPrice = shippingPrice + subTotal;
  document.querySelector("#total-amount").textContent = totalPrice + ".00 kr.";
  if (discountCode == document.querySelector("#discount-code").value) {
    totalPrice = shippingPrice + subTotal - 29;
    document.querySelector("#total-amount").textContent =
      totalPrice + ".00 kr.";
  }
}

// .addEventListener("click", () => {
//   console.log("XD");
// });

// TEMPLATE FOR BASKET PAGE
// <template id="basket-card-template">
// <article class="basket-product-card">
// 	<img src="assets/images/placeholder.png">
// 		<a class="basket-pc-name" href="">Freiherr Langwerth von Simmern - Rauenthaler Baiken Riesling</a>
// 		<p class="basket-pc-quantity">2</p>
// 		<p class="basket-pc-item-price">249.00 kr.</p>
// 		<p class="basket-pc-total-price">498.00 kr.</p>
// 		<button class="remove-from-basket"></span>
// 	</article>
// </template>
