// ---------- Page load animation function ----------
let desktopTimeline;

const init = () => {
  desktopTimeline = gsap.timeline()
    .set("body", {overflow: "hidden"})
    .from("body", {autoAlpha: 0}, "<")
    .from("h1", {opacity: 0, y: 10, duration: 0.7})
    .from(".table-of-contents li", {pointerEvents: "none", opacity: 0, x: -10, stagger: 0.1, duration: 1}, "<1")
    .from(".additional-info", {opacity: 0, y: 10, duration: 0.7}, "<1")
    .from(".main-content", {opacity: 0, duration: 0.5})
    .from(".main-content-section", {opacity: 0, duration: 0.5}, "<0.4")
    .from(".navbar", {pointerEvents: "none", opacity: 0, duration: 1}, "<0.5")
    .from(".mobile-nav-icon", {opacity: 0, pointerEvents: "none", duration: 0.7}, "<")
    .from(".footer", {opacity: 0, duration: 1}, "<")
    .set("body", {overflow: "scroll"}, "<")

  return desktopTimeline;
};

// ----- Do animation when page elements load -----
mm.add("(min-width: 993px)", () => {
  // See if page is being loaded from cache.  If so, reset all elements from the page transition animation
  // then play the entrance animation.
  window.addEventListener("pageshow", (event) => {
    if(event.persisted) {
      // Check to see if the animation is active or not.  If the desktop animation is active, complete it
      if(desktopTimeline && desktopTimeline.isActive()) {
        // complete animation
        desktopTimeline.progress(1);
      };

      // reset all elements to initial state
      gsap.set(".sidenav-content", { clearProps: "all" });
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
    transitionTimeline(event, "about", "projects");
  };

  // about link
  if(event.target.id === "about") {
    transitionTimeline(event, "home", "projects");
  };

  // projects link
  if(event.target.id === "projects") {
    transitionTimeline(event, "home", "about");
  };
});

// ---------- page load animation at 992px and below ----------
// ----- Mobile page load animation function -----
let mobileTimeline;

const mobileInit = () => {
  mobileTimeline = gsap.timeline()
    .from("body", {autoAlpha: 0})
    .set("body", {overflow: "hidden"})
    .from("h1", {opacity: 0, y: 10, duration: 0.7})
    .from(".table-of-contents li", {opacity: 0, x: -10, stagger: 0.1, duration: 1}, "<1")
    .from(".current-section", {opacity: 0, y: 10, duration: 0.7})
    .from(".main-content", {opacity: 0, duration: 0.7}, "<")
    .from(".main-content-section", {opacity: 0, stagger: 0.1, duration: 1})
    .from(".mobile-nav-icon", {opacity: 0, pointerEvents: "none", duration: 0.7}, "<")
    .from(".footer", {opacity: 0, duration: 1}, "<")
    .from(".table-of-contents li", {pointerEvents: "none"}, "<")
    .set("body", {overflow: "scroll"}, "<")

    return mobileTimeline;
};

// ----- Do animation when page elements load -----
mm.add("(max-width: 992px)", () => {
  // See if page is being loaded from cache.  If so, reset all elements from the page transition animation
  // then play the entrance animation.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      // Check to see if the animation is active or not.  If the mobile animation is active, complete it
      if(mobileTimeline && mobileTimeline.isActive()) {
        // complete animation
        mobileTimeline.progress(1)
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
      mobileInit();
    } else {
      // Otherwise, play the entrance animation
      mobileInit();
    };
  });
});

// ---------- Fade in section animation (767px and below) ----------
mm.add("(max-width: 767px)", () => {
  // scrollTrigger fadeIn animation (for mobile)
  const allSections = document.querySelectorAll(".main-content-section");

  allSections.forEach(section => {
    // get the section's h2 and section id
    const sectionHeader = document.querySelector(`#${section.id} h2`).textContent;
    const sectionId = section.id;

    // fade in animation function
    const changeSectionTitle = () => {
      // get current section
      const currentSectionTitle = document.querySelector(".current-section");

      // change it's textcontent
      currentSectionTitle.textContent = sectionHeader;
    };

    // create a scrollTrigger for each of the sections
    ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: "top 26.4%",
      end: "bottom 75%",
      onEnter: changeSectionTitle,
      onEnterBack: changeSectionTitle
    });
  });
});
