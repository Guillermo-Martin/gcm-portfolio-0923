// get elements
let body = document.body;
let hamburgerIcon = document.querySelector(".hamburger-icon");
let closeIcon = document.querySelector(".close-icon");
let mobileNavOverlay = document.querySelector(".mobile-nav-overlay");

hamburgerIcon.addEventListener("click", () => {
  // prevent user from scrolling while the menu is up
  body.style.overflow = "hidden";

  // closeIcon.classList.add("show");

  // hide the hamburger icon, show the close icon
  hamburgerIcon.classList.remove("show");
  hamburgerIcon.classList.add("hide");
  closeIcon.classList.remove("hide");
  closeIcon.classList.add("show");
 

  // remove the "hide" class and add the "show" class
  mobileNavOverlay.classList.remove("hide");
  mobileNavOverlay.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  // allow user to scroll when the menu is gone
  body.style.overflow = "auto";

  // hide the close icon, show the hamburger icon
  closeIcon.classList.remove("show");
  closeIcon.classList.add("hide");
  hamburgerIcon.classList.remove("hide");
  hamburgerIcon.classList.add("show");

  // remove the "show" class and add the "hide" class
  mobileNavOverlay.classList.remove("show");
  mobileNavOverlay.classList.add("hide");
});