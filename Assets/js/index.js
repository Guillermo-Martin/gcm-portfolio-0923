let body = document.querySelector("body");
let mobileNavMenu = document.getElementById("mobile-nav-menu");


// hamburger menu functionality
// 1. target the hamburger icon
let hamburgerIcon = document.getElementById("hamburger-icon");
let closeIcon = document.getElementById("close-icon");
let mobileNavClose = document.createElement("p");

// 2. add a click listener
hamburgerIcon.addEventListener("click", () => {
  // show menu
  mobileNavMenu.classList.add("show");

  // hide hamburger icon
  hamburgerIcon.classList.add("hide");

  // show close icon
  closeIcon.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  // hide menu
  mobileNavMenu.classList.remove("show");

  // hide the close icon
  closeIcon.classList.remove("show");

  // show the hamburger icon
  hamburgerIcon.classList.remove("hide");
});

