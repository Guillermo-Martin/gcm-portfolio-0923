console.log("connected to about!!!");

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
mm.add("(min-width: 993px)", () => {
  window.addEventListener("load", () => {
    init();
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
    transitionTimeline(event, "projects", "resume");
  };

  // projects link
  if(event.target.id === "projects") {
    transitionTimeline(event, "home", "resume");
  };

  // resume link
  if(event.target.id === "resume") {
    transitionTimeline(event, "home", "projects");
  };
});

// ---------- page load animation at 992px and below ----------
mm.add("(max-width: 992px)", () => {
  window.addEventListener("load", () => {
    gsap.timeline()
    .from("body", {autoAlpha: 0})
    .set("body", {overflow: "hidden"})
    .from("h1", {opacity: 0, y: 10, duration: 0.7})
    .from(".table-of-contents li", {opacity: 0, x: -10, stagger: 0.1, duration: 1}, "<1")
    .from(".current-section", {opacity: 0, y: 10, duration: 0.7})
    .from(".main-content-section", {opacity: 0, stagger: 0.1, duration: 1})
    .from(".mobile-nav-icon", {opacity: 0, pointerEvents: "none", duration: 0.7}, "<")
    .from(".footer", {opacity: 0, duration: 1}, "<")
    .from(".table-of-contents li", {pointerEvents: "none"}, "<")
    .set("body", {overflow: "scroll"}, "<")
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
