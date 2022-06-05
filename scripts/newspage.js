const url =
  "https://mehmetscreations.dk/wp21a/wp-json/wp/v2/posts?tags=11&_embed";

fetch(url)
  .then((res) => res.json())
  .then((data) => handleNews(data));

function handleNews(data) {
  data.forEach(showNews);
}

function showNews(item) {
  console.log(item);
  const template = document.querySelector("#news-template").content;
  const parent = document.querySelector("#news-cards-wrapper");
  const clone = template.cloneNode(true);

  //   change content

  clone.querySelector(".post-details h1").textContent = item.title.rendered;
  const splitDate = item.date.split("T");
  clone.querySelector(".post-date").textContent = splitDate[0];
  clone.querySelector("#news-content").innerHTML = item.content.rendered;

  //   fetching featured image from post

  clone.querySelector(".news-post-image-wrapper").style.backgroundImage =
    "url(" + item._embedded["wp:featuredmedia"][0].source_url + ")";
  console.log;
  parent.appendChild(clone);
}
