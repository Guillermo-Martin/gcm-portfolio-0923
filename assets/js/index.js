// // targeted elements
// let body = document.querySelector("body");
// let mobileNavMenu = document.getElementById("mobile-nav-menu");
// let hamburgerIcon = document.getElementById("hamburger-icon");
// let closeIcon = document.getElementById("close-icon");

// // elements for GSAP
// // let projectLinksArr = document.querySelectorAll(".project-link");
// let projectLinks = document.querySelector(".links-container-links.project-links ul");

// // ---------- Mobile hamburger menu functionality ----------
// hamburgerIcon.addEventListener("click", () => {
//   // show menu
//   mobileNavMenu.classList.add("show");

//   // hide hamburger icon, show close icon
//   hamburgerIcon.classList.add("hide");
//   closeIcon.classList.add("show");

//   // prevent user from scrolling when the menu is up
//   body.style.overflow = "hidden";
// });

// closeIcon.addEventListener("click", () => {
//   // hide menu
//   mobileNavMenu.classList.remove("show");

//   // hide close icon, show hamburger icon
//   closeIcon.classList.remove("show");
//   hamburgerIcon.classList.remove("hide");

//   // resume scrolling when menu is hidden
//   body.style.overflow = "scroll";
// });


console.log("connected!");

// ---------- Portfolio links animation ----------
// get all portfolio links
const portfolioLinks = document.getElementsByClassName("portfolio-link");

// loop over them and add an event listener to each
for(let i = 0; i < portfolioLinks.length; i++) {
  // show additional info on mouseenter
  portfolioLinks[i].addEventListener("mouseenter", function(){
    // get the element's id
    const elementId = portfolioLinks[i].id;

    gsap.to(`.portfolio-link-info.${elementId}`, {x: 8, opacity: 1, duration: 0.2})
  });

  // hide additional info on mouseleave
  portfolioLinks[i].addEventListener("mouseleave", function(){
    // get the element's id
    const elementId = portfolioLinks[i].id;

    gsap.to(`.portfolio-link-info.${elementId}`, {x: 0, opacity: 0, duration: 0.2})
  });
};
