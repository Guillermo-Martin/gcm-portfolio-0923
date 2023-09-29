let body = document.querySelector("body");


// hamburger menu functionality
// 1. target the hamburger icon
let hamburgerIcon = document.getElementById("hamburger-icon");

// 2. add a click listener
hamburgerIcon.addEventListener("click", () => {
  // on click, create a div
  let mobileNavMenu = document.createElement("div");

  // add a class for styling
  mobileNavMenu.classList.add("mobile-nav-menu");

  // add it to the body
  body.appendChild(mobileNavMenu);

  // give it a z-index greater than the body

  
});


