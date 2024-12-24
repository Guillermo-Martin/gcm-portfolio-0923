console.log("connected to projects!!!");

// ---------- Page load animation function ----------
const init = () => {
  gsap.timeline()
    .set("body", {overflow: "hidden"})
    .from("body", {autoAlpha: 0}, "<")
    .from("h1", {opacity: 0, y: 10, duration: 0.7})
    .from(".table-of-contents li", {pointerEvents: "none", opacity: 0, x: -10, stagger: 0.1, duration: 1}, "<1")
    .from(".main-content", {opacity: 0, duration: 0.5})
    .from(".main-content-section", {opacity: 0, duration: 0.5}, "<0.4")
    .from(".navbar", {pointerEvents: "none", opacity: 0, duration: 1}, "<0.5")
    .from(".mobile-nav-icon", {opacity: 0, pointerEvents: "none", duration: 0.7}, "<")
    .from(".footer", {opacity: 0, duration: 1}, "<")
    .set("body", {overflow: "scroll"}, "<")
}

// ----- Do animation when page elements load -----
window.addEventListener("load", () => {
  init();
});


// ---------- Navbar links page transition animations ----------
// get navbar links
const navbarContainer = document.querySelector(".navbar ul");

/**
  * This is the Greensock page transition animation timeline.
  * @param {object} event - the "event" object when a user clicks on a link
  * @param {string} elem1 - the first portfolio link you want to fade away
  * @param {string} elem2 - the second portfolio link you want to fade away
*/
const transitionTimeline = (event, elem1, elem2) => {
  const targetId = event.target.id;
  const target = event.target.href;
  const animationOptions = {opacity: 0, duration: 0.7};

  gsap.timeline()
    .to(".sidenav-content", animationOptions)
    .to(".main-content", animationOptions, "<")
    .to(".footer", animationOptions, "<")
    .to(`#${elem1}`, animationOptions, "<")
    .to(`#${elem2}`, animationOptions, "<")
    .call(() => {
      // get all links
      let allLinks = document.querySelectorAll("a");

      // loop through the links and add a class for no pointer events
      for(let j = 0; j < allLinks.length; j++) {
        allLinks[j].style.pointerEvents = "none";
      }
    })
    .to(`#transition-${targetId}`, {opacity: 0, y: -5, duration: 0.5, delay: 0.8})
    .call(() => {
      window.location.href = target;
    });
}

// ----- Page transition implementation -----
navbarContainer.addEventListener("click", (event) => {
  // prevent default link behavior
  event.preventDefault();

  // home link
  if(event.target.id === "home") {
    transitionTimeline(event, "about", "resume");
  };

  // about link
  if(event.target.id === "about") {
    transitionTimeline(event, "home", "resume");
  };

  // resume link
  if(event.target.id === "resume") {
    transitionTimeline(event, "home", "about");
  };
});


// ----- Case study page transition animation -----
const uxButtons = document.querySelectorAll('.ux-button');

for(let button of uxButtons) {
  button.addEventListener("click", (event) => {
    // prevent default link behavior
    event.preventDefault();

    // fade out main content, then go to page
    gsap.timeline()
      .to(".sidenav", {opacity: 0, duration: 0.7})
      .to(".main-content", {opacity: 0, duration: 0.7}, "<")
      .call(() => {
        window.location.href = event.target.href;
      })
  });
};