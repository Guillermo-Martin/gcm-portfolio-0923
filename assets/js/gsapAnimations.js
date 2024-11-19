// register scrollToPlugin, scrollTrigger plugins and create matchMedia for different screens
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
let mm = gsap.matchMedia();

// ---------- Table of contents and scrollTo animation ----------
// get all of the table of contents link
const tocLinkArr = document.querySelectorAll(".table-of-contents-link");

// loop through the table of contents links and add an eventlistener
for(let i = 0; i < tocLinkArr.length; i++) {
  // get the section id to scroll to and define the scrollTrigger target
  let sectionId = tocLinkArr[i].dataset.section;
  let scrollTriggerTarget = `.table-of-contents-link[data-section='${sectionId}']`;

  // add event listener
  tocLinkArr[i].addEventListener("click", () => {
    // when user clicks on the link, scroll to that section
    gsap.to(window, { duration: 1, scrollTo: `#${sectionId}` });
  });

  // add the scrollTrigger "active" link animation
  gsap.to(scrollTriggerTarget, {
    scrollTrigger: {
      trigger: `#${sectionId}`,
      start: "top 40%",
      end: "bottom 40%",
      toggleClass: {targets: scrollTriggerTarget, className: "active"}
    }
  });
};


// ---------- scrollTo animation:  992px and below ----------
mm.add("(max-width: 992px)", () => {
  // ----- Scroll to animation -----
  // get all of the table of contents link
  const tocLinkArr = document.querySelectorAll(".table-of-contents-link");

  // loop through the table of contents links and add an eventlistener
  for(let i = 0; i < tocLinkArr.length; i++) {
    // get the section id to scroll to and define the scrollTrigger target
    let sectionId = tocLinkArr[i].dataset.section;
    let scrollTriggerTarget = `.table-of-contents-link[data-section='${sectionId}']`;

    // add event listener
    tocLinkArr[i].addEventListener("click", () => {
      // when user clicks on the link, scroll to that section
      gsap.to(window, { duration: 1, scrollTo: {y: `#${sectionId}`, offsetY: 240} });
    });

    // add the scrollTrigger "active" link animation
    gsap.to(scrollTriggerTarget, {
      scrollTrigger: {
        trigger: `#${sectionId}`,
        start: "top 60%",
        end: "bottom 60%",
        toggleClass: {targets: scrollTriggerTarget, className: "active"}
      }
    });
  };

  // ---------- Mobile menu animation ----------
  let body = document.querySelector("body");
  let hamburgerIcon = document.querySelector(".hamburger-icon");
  let closeIcon = document.querySelector(".close-icon");

  // // ----- gsap timeline -----
  let tl = gsap.timeline({ paused: true, duration: 0.1 });
  tl
    .to(".sidenav-text-container", {opacity: 0, duration: 0.2})
    .to(".hamburger-icon", {opacity: 0, scale: 0, duration: 0.2}, "<")
    .set(".hamburger-icon", {display: "none"})
    .set(".close-icon", {display: "block"})
    .from(".close-icon", {opacity: 0, scale: 0, duration: 0.2}, "<")
    .set(".mobile-nav-menu", {display: "flex"}, "<")
    .from(".mobile-nav-menu", {height: 0, opacity: 0, duration: 0.2}, "<")
    .from(".mobile-nav-links li", {opacity: 0, y: -8, stagger: 0.05, duration: 0.9}, "<")
    .from(".social-links", {opacity: 0, y: -8, duration: 1}, "<0.2")

  // ----- hamburger icon -----
  hamburgerIcon.addEventListener("click", function() {
    // play the mobile menu animation
    tl.play();

    // prevent user from scrolling when the menu is up
    body.style.overflow = "hidden";
  });

  // ----- close icon -----
  closeIcon.addEventListener("click", function() {
    // reverse the mobile menu animation
    tl.reverse(0.7);

    // resume scrolling when menu is hidden
    body.style.overflow = "scroll";
  });
});
