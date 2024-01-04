// targeted elements
let body = document.querySelector("body");
let mobileNavMenu = document.getElementById("mobile-nav-menu");
let hamburgerIcon = document.getElementById("hamburger-icon");
let closeIcon = document.getElementById("close-icon");

// elements for GSAP
// let projectLinksArr = document.querySelectorAll(".project-link");
let projectLinks = document.querySelector(".links-container-links.project-links ul");

// ---------- Mobile hamburger menu functionality ----------
hamburgerIcon.addEventListener("click", () => {
  // show menu
  mobileNavMenu.classList.add("show");

  // hide hamburger icon, show close icon
  hamburgerIcon.classList.add("hide");
  closeIcon.classList.add("show");

  // prevent user from scrolling when the menu is up
  body.style.overflow = "hidden";
});

closeIcon.addEventListener("click", () => {
  // hide menu
  mobileNavMenu.classList.remove("show");

  // hide close icon, show hamburger icon
  closeIcon.classList.remove("show");
  hamburgerIcon.classList.remove("hide");

  // resume scrolling when menu is hidden
  body.style.overflow = "scroll";
});


// ---------- GSAP ----------
// gsap animation timeline:
// when you click on a link, everything fades out except the link you clicked on
// gsap.to(".links-container", { rotation: 27, x: 100, duration: 5 });
// loop through and add an event listener to each
// console.log(projectLinksArr);

// for(let i = 0; i < projectLinksArr.length; i++) {
//   console.log(projectLinksArr[i]);

//   projectLinksArr[i].addEventListener("click", () => {
//     alert('you clicked on a link!');
//   })
// }

// console.log(projectLinks);

// projectLinks.addEventListener("click", (event) => {
//   console.log(event.target.dataset.project);
  
//   switch (event.target.dataset.project) {
//     case "web-developer": 
//       // alert("hello web developer!");
//       gsap.to(".main-section", {opacity: 0, duration: 1});
//       gsap.to(".contact-links", {opacity: 0, duration: 1});
//       gsap.to(".footer", {opacity: 0, duration: 1});
//       gsap.to(".ux-design", {opacity: 0, duration: 1});
//       gsap.to(".link-3", {opacity: 0, duration: 1});
//       gsap.to(".project-links h2", {opacity: 0, duration: 1});
//       window.location.href = "/web-developer-projects.html"
//       break;
//   }
// })