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


console.log("connected! to home");

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

  // ---------- links ----------
  // portfolioLinks[i].addEventListener("click", (event) => {
  //   let target = event.target.href;

  //   console.log(target);
  //   // prevent default link behavior
  //   event.preventDefault();

  //   // animation timeline
  //   gsap.timeline()
  //     .to(".homepage-hero-text", {opacity: 0, duration: 0.7})
  //     .to("#transition-projects", {opacity: 0, duration: 0.7}, "<")
  //     .to("#transition-resume", {opacity: 0, duration: 0.7}, "<")
  //     .to(".portfolio-link-info", {opacity: 0, duration: 0.7}, "<")
  //     .to(".footer", {opacity: 0, duration: 0.7}, "<")
  //     .call(() => {
  //       // get all links
  //       let allLinks = document.querySelectorAll("a");

  //       // loop through the links and add a class for no pointer events
  //       for(let j = 0; j < allLinks.length; j++) {
  //         allLinks[j].style.pointerEvents = "none";
  //       }
  //     })
  //     .to("#transition-about", {opacity: 0, y: -5, duration: 0.5, delay: 0.8})
  //     .call(() => {
  //       window.location.href = target;
  //     })
  // });
};

// get all portfolio links
const portfolioLinksContainer = document.querySelector(".portfolio-links");

portfolioLinksContainer.addEventListener("click", (event) => {
  console.log(event.target.id);
  event.preventDefault()

  let target = event.target.href;

  // about
  if(event.target.id === "about") {
    gsap.timeline()
      .to(".homepage-hero-text", {opacity: 0, duration: 0.7})
      .to("#transition-projects", {opacity: 0, duration: 0.7}, "<")
      .to("#transition-resume", {opacity: 0, duration: 0.7}, "<")
      .to(".portfolio-link-info", {opacity: 0, duration: 0.7}, "<")
      .to(".footer", {opacity: 0, duration: 0.7}, "<")
      .call(() => {
        // get all links
        let allLinks = document.querySelectorAll("a");

        // loop through the links and add a class for no pointer events
        for(let j = 0; j < allLinks.length; j++) {
          allLinks[j].style.pointerEvents = "none";
        }
      })
      .to("#transition-about", {opacity: 0, y: -5, duration: 0.5, delay: 0.8})
      .call(() => {
        window.location.href = target;
      })
  };

  // projects
  if(event.target.id === "projects") {
    gsap.timeline()
      .to(".homepage-hero-text", {opacity: 0, duration: 0.7})
      .to("#transition-about", {opacity: 0, duration: 0.7}, "<")
      .to("#transition-resume", {opacity: 0, duration: 0.7}, "<")
      .to(".portfolio-link-info", {opacity: 0, duration: 0.7}, "<")
      .to(".footer", {opacity: 0, duration: 0.7}, "<")
      .call(() => {
        // get all links
        let allLinks = document.querySelectorAll("a");

        // loop through the links and add a class for no pointer events
        for(let j = 0; j < allLinks.length; j++) {
          allLinks[j].style.pointerEvents = "none";
        }
      })
      .to("#transition-projects", {opacity: 0, y: -5, duration: 0.5, delay: 0.8})
      .call(() => {
        window.location.href = target;
      })
  };

  // resume
  if(event.target.id === "resume") {
    gsap.timeline()
      .to(".homepage-hero-text", {opacity: 0, duration: 0.7})
      .to("#transition-about", {opacity: 0, duration: 0.7}, "<")
      .to("#transition-projects", {opacity: 0, duration: 0.7}, "<")
      .to(".portfolio-link-info", {opacity: 0, duration: 0.7}, "<")
      .to(".footer", {opacity: 0, duration: 0.7}, "<")
      .call(() => {
        // get all links
        let allLinks = document.querySelectorAll("a");

        // loop through the links and add a class for no pointer events
        for(let j = 0; j < allLinks.length; j++) {
          allLinks[j].style.pointerEvents = "none";
        }
      })
      .to("#transition-resume", {opacity: 0, y: -5, duration: 0.5, delay: 0.8})
      .call(() => {
        window.location.href = target;
      })
  };



});