let body = document.querySelector("body");
let mobileNavMenu = document.getElementById("mobile-nav-menu");

console.log(mobileNavMenu)

// hamburger menu functionality
// 1. target the hamburger icon
let hamburgerIcon = document.getElementById("hamburger-icon");
let mobileNavClose = document.createElement("p");

// 2. add a click listener
hamburgerIcon.addEventListener("click", () => {
  // on click, create a div
  // let mobileNavMenu = document.createElement("div");
  mobileNavMenu.classList.toggle("show");

  // // add a class for styling
  // mobileNavMenu.classList.add("mobile-nav-menu");

  
  // mobileNavClose.classList.add("mobile-nav-close-button");
  // mobileNavClose.textContent = "X";
  // mobileNavMenu.appendChild(mobileNavClose);

  // // add it to the body
  // body.appendChild(mobileNavMenu);
});


