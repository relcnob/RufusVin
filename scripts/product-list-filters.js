const filtersWrapper = document.querySelector(".product-list-filters");
const filterCloseButton = document.querySelector(".filter-close");
const filterOpenButton = document.querySelector("#open-filters");

filterOpenButton.addEventListener("click", () => {
  filtersWrapper.classList.toggle("filters-collapsed");
});

filterCloseButton.addEventListener("click", () => {
  filtersWrapper.classList.toggle("filters-collapsed");
});
