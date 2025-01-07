let mm = gsap.matchMedia();

// ---------- Subheader typing effect ----------
const textToType = "Web Developer & UX Designer.";
const subheader = document.querySelector(".subheader");
let currentStr = "";
let index = 0;

const typingEffect = (str) => {
  // base case:  if the index is less that the string's length keeping calling the function
  if(index < str.length) {
    // add a letter from the string (at the current index) to the current string
    currentStr += str[index];

    // set the subheader's text content to be what the current string is
    subheader.textContent = currentStr;

    // increase the index by 1
    index++;

    // use setTimeout to call the function after a delay
    setTimeout(() => typingEffect(str), 20);
  };
};

// ---------- Page load animation function ----------
const init = () => {
  gsap.timeline()
    .from("body", {autoAlpha: 0})
    .from("h1", {opacity: 0, duration: 0.7})
    .from(".subheader", {opacity: 0, duration: 0.7}, "<1")
    .call(() => typingEffect(textToType), null, "<")
    .from(".social-links svg", {opacity: 0, stagger: 0.05, duration: 0.7}, "<1")
    .from(".portfolio-links li", {opacity: 0, stagger: 0.05, duration: 0.7}, "<")
    .from("a", {pointerEvents: "none"}, "<")
    .from(".footer", {opacity: 0, duration: 0.7})
};

// ----- Do animation when page elements load -----
// See if page is being loaded from cache.  If so, reset all elements from the page transition animation
// then play the entrance animation.
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // reset all elements to initial state
    gsap.set(".homepage-hero-text", { clearProps: "all" });
    gsap.set(".portfolio-link-info", { clearProps: "all" });
    gsap.set(".footer", { clearProps: "all" });
    gsap.set(".portfolio-links li", { clearProps: "all" });
    gsap.set(".portfolio-links a", { clearProps: "all" });

    // play the entrance animation
    init();
  } else {
    // Otherwise, play the page entrance animation.
    init();
  };
});

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
      // history.pushState({page: `${target}`}, "", `${target}`)

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
