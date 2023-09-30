// targeted elements
let body = document.querySelector("body");
let mobileNavMenu = document.getElementById("mobile-nav-menu");
let hamburgerIcon = document.getElementById("hamburger-icon");
let closeIcon = document.getElementById("close-icon");

// ---------- Mobile hamburger menu functionality ----------
hamburgerIcon.addEventListener("click", () => {
  // show menu
  mobileNavMenu.classList.add("show");

  // hide hamburger icon, show close icon
  hamburgerIcon.classList.add("hide");
  closeIcon.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  // hide menu
  mobileNavMenu.classList.remove("show");

  // hide close icon, show hamburger icon
  closeIcon.classList.remove("show");
  hamburgerIcon.classList.remove("hide");
});

// PREVENT SCROLLING OF BODY WHEN MOBILE NAV IS DISPLAYING