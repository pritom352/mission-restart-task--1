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
