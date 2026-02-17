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
console.log("hello world");

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
