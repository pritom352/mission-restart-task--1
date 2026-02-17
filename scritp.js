const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
//!navbar button color
const currentPage = window.location.pathname;

if (currentPage.includes("products.html")) {
  document
    .getElementById("productLink")
    .classList.add("text-[#4F39F6]", "font-bold");
} else {
  document
    .getElementById("homeLink")
    .classList.add("text-[#4F39F6]", "font-bold");
}
// console.log("hello world");

const categories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => {
      showCategories(data);
    });
};
const showCategories = (data) => {
  const categories_section = document.getElementById("categoriesSection");
  // console.log(categories_section);

  data.map((categorie) => {
    // console.log(categorie);
    const button = document.createElement("button");
    button.classList.add(
      "bg-[#4F39F6]",
      "px-4",
      "rounded-xl",
      "text-white",
      "py-2",
    );
    //! add event listener
    button.innerText = categorie;
    button.addEventListener("click", () => {
      filterByCategory(categorie);
    });
    categories_section.appendChild(button);
  });
};
categories();

//! s section
const allCards = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => cards(data));
};
const card_section = document.getElementById("cardSection");
const cards = (data) => {
  data.map((item) => {
    // console.log(item);
    const div = document.createElement("div");
    div.classList.add("flex", "flex-col", "h-full", "rounded-2xl", "shadow-lg");
    div.innerHTML = `
        <div class="bg-sky-100 rounded-t-2xl py-5">
          <img
            class="w-[200px] h-[250px] mx-auto"
            src=${item?.image}
            alt=""
          />
        </div>
        <div class="p-4 space-y-3 flex flex-col flex-grow">
          <div class="flex justify-between">
            <p class="text-sm bg-sky-100 rounded-2xl px-2">${item?.category}</p>
            <p class="flex gap-1 items-center">
              <i class="fa-regular fa-star"></i>${item?.rating?.rate}(${item?.rating?.count})
            </p>
          </div>
          <p class="text-xl font-bold line-clamp-2">${item?.title}</p>
          <p class="text-xl font-bold">${item?.price}</p>
          <div class="flex justify-between items-center mt-auto">
            <button
              onclick="loadDetails(${item.id})"
              class="flex gap-1 items-center bg-[#4F39F6] px-3 py-2 rounded-xl text-white"
            >
              <i class="fa-regular fa-eye"></i>Details</button
            ><button
              class="flex gap-1 items-center bg-[#4F39F6] px-3 py-2 rounded-xl text-white"
            >
              <i class="fa-solid fa-cart-shopping"></i>Add
            </button>
          </div>
        </div>`;

    card_section.appendChild(div);
  });
};
allCards();
//! show clicked button products
const filterByCategory = (categorie) => {
  // console.log(categorie);
  fetch(`https://fakestoreapi.com/products/category/${categorie}`)
    .then((res) => res.json())
    .then((data) => showProductsByCategories(data));
};
const showProductsByCategories = (data) => {
  card_section.innerHTML = "";
  cards(data);
};
//! details section(modal)
const loadDetails = (id) => {
  console.log(id);
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => showDetails(data));
};
const showDetails = (data) => {
  console.log(data);

  const modal_div = document.getElementById("modalDiv");
  modal_div.innerHTML = `
    <div class="  flex items-center justify-center ">
      
      <div class="bg-white w-[90%] md:w-[500px] rounded-2xl shadow-xl p-6 ">

        

        <div class="space-y-4">

          <h2 class="text-xl font-bold text-gray-800">
            ${data?.title}
          </h2>

          <p class="text-gray-600 text-sm">
            ${data?.description}
          </p>

          <div class="flex justify-between items-center">
            <p class="text-lg font-bold text-sky-600">
              $${data?.price}
            </p>

            <p class="text-yellow-500">
              ⭐ ${data?.rating?.rate} (${data?.rating?.count})
            </p>
          </div>

          <div class="flex gap-3 pt-3">
            <button class="flex-1 bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-600 transition">
              Add to Cart
            </button>
            <button class="flex-1 bg-sky-500 text-white py-2 rounded-xl hover:bg-sky-600 transition">
              Buy Now
            </button>
          </div>

        </div>
      </div>
    </div>
  `;
  document.getElementById("my_modal_2").showModal();
};

//! home page top product section
const loadTopRatedProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      const sortedProducts = data.sort((a, b) => b.rating.rate - a.rating.rate);

      const topThree = sortedProducts.slice(0, 3);
      const topProductSection = document.getElementById("topRatedSection");

      // topThree.map((data) => {
      topThree.map((item) => {
        const div = document.createElement("div");
        div.classList.add(
          "flex",
          "flex-col",
          "h-full",
          "rounded-2xl",
          "shadow-lg",
        );
        div.innerHTML = `
        <div class="bg-sky-100 rounded-t-2xl py-5">
          <img
            class="w-[200px] h-[250px] mx-auto"
            src=${item?.image}
            alt=""
          />
        </div>
        <div class="p-4 space-y-3 flex flex-col flex-grow">
          <div class="flex justify-between">
            <p class="text-sm bg-sky-100 rounded-2xl px-2">${item?.category}</p>
            <p class="flex gap-1 items-center">
              <i class="fa-regular fa-star"></i>${item?.rating?.rate}(${item?.rating?.count})
            </p>
          </div>
          <p class="text-xl font-bold line-clamp-2">${item?.title}</p>
          <p class="text-xl font-bold">${item?.price}</p>
          <div class="flex justify-between items-center mt-auto">
            <button
              onclick="loadDetails(${item.id})"
              class="flex gap-1 items-center bg-[#4F39F6] px-3 py-2 rounded-xl text-white"
            >
              <i class="fa-regular fa-eye"></i>Details</button
            ><button
              class="flex gap-1 items-center bg-[#4F39F6] px-3 py-2 rounded-xl text-white"
            >
              <i class="fa-solid fa-cart-shopping"></i>Add
            </button>
          </div>
        </div>`;

        topProductSection.appendChild(div);
      });
    });
};
loadTopRatedProducts();
