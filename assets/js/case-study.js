console.log("on case study page!")


// get elements
let body = document.body;
let hamburgerIcon = document.querySelector(".hamburger-icon");
let mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
let closeIcon = document.querySelector(".close-icon");

hamburgerIcon.addEventListener("click", () => {
  // prevent user from scrolling while the menu is up
  body.style.overflow = "hidden";

  // remove the "hide" class and add the "show" class
  mobileNavOverlay.classList.remove("hide");
  mobileNavOverlay.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  // allow user to scroll when the menu is gone
  body.style.overflow = "auto";

  // remove the "show" class and add the "hide" class
  mobileNavOverlay.classList.remove("show");
  mobileNavOverlay.classList.add("hide");
});




// ----------------------------------------------------------------------
// // targeted elements
// let tableOfContentsBtn = document.getElementById("table-of-contents-btn");
// let tableOfContents = document.getElementById("mobile-table-of-contents");
// let tableOfContentsLinks = document.querySelectorAll(".mobile-table-of-contents-links li")
// let downArrow = document.getElementById("down-arrow");
// let upArrow = document.getElementById("up-arrow");


// // ---------- Table of contents mobile functionality ----------
// tableOfContentsBtn.addEventListener("click", () => {
//   // on click, show the menu
//   tableOfContents.classList.toggle("show");

//   // hide the down arrow, show the up arrow
//   downArrow.classList.toggle("hide");
//   upArrow.classList.toggle("show");
// });

// // ---------- Table of contents link functionality ----------
// // loop through the table of contents links and add an eventlistener
// for(let i = 0; i < tableOfContentsLinks.length; i++) {
//   tableOfContentsLinks[i].addEventListener("click", () => {
//     // alert('you clicked on a link!');

//     // hide the table of contents
//     tableOfContents.classList.remove("show");

//     // hide the up arrow, show the down arrow
//     upArrow.classList.remove("show");
//     downArrow.classList.remove("hide");
//   })
// }