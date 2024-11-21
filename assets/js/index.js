console.log("connected! to home");

// ---------- Portfolio links more info animation ----------
// get portfolio lnks container and all portfolio links
const portfolioLinks = document.getElementsByClassName("portfolio-link");
const portfolioLinksContainer = document.querySelector(".portfolio-links");

// loop over them and add an event listener to each
for(let i = 0; i < portfolioLinks.length; i++) {
  // show additional info on mouseenter
  portfolioLinks[i].addEventListener("mouseenter", function(){
    // get the element's id
    const elementId = portfolioLinks[i].id;

    gsap.to(`.portfolio-link-info.${elementId}`, {x: 8, opacity: 1, duration: 0.2});
  });

  // hide additional info on mouseleave
  portfolioLinks[i].addEventListener("mouseleave", function(){
    // get the element's id
    const elementId = portfolioLinks[i].id;

    gsap.to(`.portfolio-link-info.${elementId}`, {x: 0, opacity: 0, duration: 0.2});
  });
};

// ---------- Portfolio link page transition animations ----------
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
    .to(".homepage-hero-text", animationOptions)
    .to(".portfolio-link-info", animationOptions, "<")
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
portfolioLinksContainer.addEventListener("click", (event) => {
  // prevent default link behavior
  event.preventDefault();

  // about link
  if(event.target.id === "about") {
    transitionTimeline(event, "projects", "resume");
  };

  // projects link
  if(event.target.id === "projects") {
    transitionTimeline(event, "about", "resume");
  };

  // resume link
  if(event.target.id === "resume") {
    transitionTimeline(event, "about", "projects");
  };
});
