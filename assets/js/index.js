console.log("connected! to home");

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

typingEffect(textToType);




// ---------- Page load animation function ----------
const init = () => {
  gsap.timeline()
    .from("body", {autoAlpha: 0})
    .from("h1", {opacity: 0, duration: 0.7})
    // .from(".subheader", {opacity: 0, duration: 0.7})
    .from(".social-links", {opacity: 0, duration: 0.7})
    .from(".portfolio-links", {opacity: 0, duration: 0.7})
    .from(".footer", {opacity: 0, duration: 0.7})

    // .to("body", {backgroundColor: "#000", duration: 1})
    // .set("body", {overflow: "hidden"})
    
    // .from(".table-of-contents li", {pointerEvents: "none", opacity: 0, x: -10, stagger: 0.1, duration: 1}, "<1")
    // .from(".additional-info", {opacity: 0, y: 10, duration: 0.7}, "<1")
    // .from(".main-content-section", {opacity: 0, stagger: 0.1, duration: 1})
    // .from(".navbar", {opacity: 0, duration: 1}, "<0.5")
    // .from(".mobile-nav-icon", {opacity: 0, pointerEvents: "none", duration: 0.7}, "<")
    // .from(".footer", {opacity: 0, duration: 1}, "<")
    // .set("body", {overflow: "scroll"}, "<")
}

// ----- Do animation when page elements load -----
mm.add("(min-width: 993px)", () => {
  window.addEventListener("load", () => {
    init();
  });
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
