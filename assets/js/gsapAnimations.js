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

  // add event listener for scrollTo functionality
  tocLinkArr[i].addEventListener("click", () => {
    // when user clicks on the link, get the screenwidth
    const screenWidth = window.innerWidth;
    let offset = 0;

    // if screenWidth is less than or equal to 992, use an offset
    if(screenWidth <= 792) {
      console.log(screenWidth);
      offset = 250;
    } else if(screenWidth <= 992) {
      offset = 220;
    } else {
      offset = 0;
    }
    
    // scroll to section
    gsap.to(window, { duration: 1, scrollTo: { y: `#${sectionId}`, offsetY: `${offset}` } });
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


// ---------- Mobile menu close animation elements ----------
let body = document.querySelector("body");
let hamburgerIcon = document.querySelector(".hamburger-icon");
let closeIcon = document.querySelector(".close-icon");
// for mobile menu resizing bug
let isMobileMenuOpen = false;

// ----- Mobile menu close animation -----
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
    .from(".social-links", {opacity: 0, y: -8, duration: 1}, "<0.6")

// close menu if resize is happening
window.addEventListener('resize', () => {
  if(window.innerWidth >= 993 && isMobileMenuOpen) {
    // console.log(`Current browser width: ${window.innerWidth}px`);
    console.log("i'm going to close the menu");

    gsap.timeline()
      .to(".close-icon", {opacity: 0, duration: 0.2})
      .set(".close-icon", {display: "none"}, "<")
      .to(".mobile-nav-menu", {opacity: 0, duration: 0.2}, "<")
      .set(".mobile-nav-menu", {display: "none"}, "<")
      .to(".sidenav-text-container", {opacity: 1, duration: 0.2}, "<")

    isMobileMenuOpen = false;
  };
});
    

// ---------- Mobile menu animation:  992px and below ----------
mm.add("(max-width: 992px)", () => {
  // ----- hamburger icon -----
  hamburgerIcon.addEventListener("click", function() {
    // play the mobile menu animation
    tl.play();

    // prevent user from scrolling when the menu is up
    body.style.overflow = "hidden";

    // for mobile menu resizing bug
    isMobileMenuOpen = true;
    console.log(isMobileMenuOpen);
  });

  // ----- close icon -----
  closeIcon.addEventListener("click", function() {
    // reverse the mobile menu animation
    tl.reverse(0.7);

    // resume scrolling when menu is hidden
    body.style.overflow = "scroll";

    // for mobile menu resizing bug
    isMobileMenuOpen = false;
    console.log(isMobileMenuOpen);
  });

  // -------------- mobile page transition implementation ---------------
  const mobileNavLinksContainer = document.querySelector(".mobile-nav-links");

  /**
  * This is the Greensock page transition animation timeline.
  * @param {object} event - the "event" object when a user clicks on a link
  * @param {string} elem1 - the first portfolio link you want to fade away
  * @param {string} elem2 - the second portfolio link you want to fade away
  * @param {string} elem3 - the third portfolio link you want to fade away
  */
  const transitionTimeline = (event, elem1, elem2, elem3) => {
    const targetId = event.target.id;
    const target = event.target.href;
    const animationOptions = {opacity: 0, duration: 0.7};

    gsap.timeline()
      .to(".mobile-nav-links h2", animationOptions)
      .to(".social-links", animationOptions, "<")
      .to(".mobile-nav-icon", animationOptions, "<")
      .to(`#${elem1}`, animationOptions, "<")
      .to(`#${elem2}`, animationOptions, "<")
      .to(`#${elem3}`, animationOptions, "<")
      .call(() => {
        // get all links and mobile nav icon
        let allLinks = document.querySelectorAll("a");
        let closeIcon = document.querySelector(".close-icon");

        // loop through the links and add a class for no pointer events
        for(let j = 0; j < allLinks.length; j++) {
          allLinks[j].style.pointerEvents = "none";
        }

        // add no pointer events to the mobile nav icon
        closeIcon.style.pointerEvents = "none";
      })
      .to(`#transition-${targetId}`, {opacity: 0, y: -5, duration: 0.5, delay: 0.8})
      .to(".sidenav", {backgroundColor: "#fff5eb", duration: 1})
      .to("body", {visibility: "hidden", backgroundColor: "#fff5eb", duration: 1}, "<")
      .call(() => {
        window.location.href = target;
      });
  }

  mobileNavLinksContainer.addEventListener("click", (event) => {
    // prevent default link behavior
    event.preventDefault();

    // home
    if(event.target.id === "home") {
      transitionTimeline(event, "about", "projects", "resume");
    };

    // about
    if(event.target.id === "about") {
      transitionTimeline(event, "home", "projects", "resume");
    };
  
    // projects
    if(event.target.id === "projects") {
      transitionTimeline(event, "home", "about", "resume");
    };
  
    // resume
    if(event.target.id === "resume") {
      transitionTimeline(event, "home", "about", "projects");
    };
  });
});


// ---------- Mobile table of content closing animation:  767px and below ----------
mm.add("(max-width: 767px)", () => {
  // get all of the mobile table of contents link
  const mobileTocLinkArr = document.querySelectorAll(".mobile-nav-links .table-of-contents-link");

  // loop through the mobile table of contents links and add an eventlistener
  for(let i = 0; i < mobileTocLinkArr.length; i++) {
    // add event listener to close menu and resume scrolling
    mobileTocLinkArr[i].addEventListener("click", () => {
      // when user clicks on the link, scroll to that section
      tl.reverse();

      // resume scrolling when menu is hidden
      body.style.overflow = "scroll";
    });
  };
});
