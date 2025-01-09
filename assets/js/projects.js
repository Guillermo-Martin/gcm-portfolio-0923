// ---------- Page load animation function ----------
let desktopTimeline;

const init = () => {
  desktopTimeline = gsap.timeline()
    .set("body", {overflow: "hidden"})
    .from("body", {autoAlpha: 0}, "<")
    .from("h1", {opacity: 0, y: 10, duration: 0.7})
    .from(".table-of-contents li", {pointerEvents: "none", opacity: 0, x: -10, stagger: 0.1, duration: 1}, "<1")
    .from(".main-content", {opacity: 0, duration: 0.5})
    .from(".main-content-section", {opacity: 0, duration: 0.5})
    .from(".mobile-nav-icon", {opacity: 0, pointerEvents: "none", duration: 0.7}, "<")
    .from(".navbar", {pointerEvents: "none", opacity: 0, duration: 1}, "<0.5")
    .from(".footer", {opacity: 0, duration: 1}, "<")
    .set("body", {overflow: "scroll"}, "<")

  return desktopTimeline;
};

// ----- Do animation when page elements load -----
// See if page is being loaded from cache.  If so, reset all elements from the page transition animation
// then play the entrance animation.
mm.add("(min-width: 993px", () => {
  window.addEventListener("pageshow", (event) => {
    if(event.persisted) {
      // Check to see if the animation is active or not.  If the desktop animation is active, complete it
      if(desktopTimeline && desktopTimeline.isActive()) {
        // complete animation
        desktopTimeline.progress(1);
      };

      // reset all elements to initial state
      gsap.set(".sidenav-content", { clearProps: "all" });
      gsap.set(".sidenav", { clearProps: "all" });
      gsap.set(".main-content", { clearProps: "all" });
      gsap.set(".footer", { clearProps: "all" });
      gsap.set(".navbar li", { clearProps: "all" });
      gsap.set(".navbar a", { clearProps: "all" });
      gsap.set("a", { clearProps: "all" });
  
      // play the entrance animation
      init();
    } else {
      // Otherwise, play the page entrance animation.
      init();
    };
  });
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

// ---------- page load animation at 992px and below ----------
// ----- Mobile page load animation function -----
mm.add("(max-width: 992px", () => {
  // See if page is being loaded from cache.  If so, reset all elements from the page transition animation
  // then play the entrance animation.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      // Check to see if the animation is active or not.  If the desktop animation is active, complete it
      if(desktopTimeline && desktopTimeline.isActive()) {
        console.log("The desktop timeline is active!");

        // complete animation
        desktopTimeline.progress(1);
      };

      // reset all elements to initial state
      mobileNavMenu.classList.add("hide");
      gsap.set(".mobile-nav-links h2", { clearProps: "all" });
      gsap.set(".mobile-table-of-contents-link", { clearProps: "all" });
      gsap.set(".mobile-nav-menu li", { clearProps: "all" });
      gsap.set(".social-links", { clearProps: "all" });
      gsap.set(".mobile-nav-icon", { clearProps: "all" });
      gsap.set(".main-content", { clearProps: "all" });
      gsap.set(".mobile-nav-links a", { clearProps: "all" });
      gsap.set(".sidenav", { clearProps: "all" });
      gsap.set(".sidenav-text-container", { clearProps: "all" });
      gsap.set(".mobile-nav-menu", { clearProps: "all" });
      gsap.set("body", { clearProps: "all" });
      gsap.set("a", { clearProps: "all" });

      // play the entrance animation
      init();
    } else {
      // Otherwise, play the entrance animation
      init();
    };
  });
});
