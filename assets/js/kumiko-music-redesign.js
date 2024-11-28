console.log("connected to kumiko music redesign!");

// ---------- Page load animation function ----------
const init = () => {
  gsap.timeline()
    .from("body", {autoAlpha: 0})
    .to("body", {backgroundColor: "#000", duration: 1})
    .set("body", {overflow: "hidden"})
    .from("h1", {opacity: 0, y: 10, duration: 0.7})
    .from(".table-of-contents li", {pointerEvents: "none", opacity: 0, x: -10, stagger: 0.1, duration: 1}, "<1")
    .from(".additional-info", {opacity: 0, y: 10, duration: 0.7}, "<1")
    .from(".main-content-section", {opacity: 0, stagger: 0.1, duration: 1})
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
* @param {string} elem3 - the third portfolio link you want to fade away
*/
const transitionTimeline = (event, elem1, elem2, elem3) => {
  const targetId = event.target.id;
  const target = event.target.href;
  const animationOptions = {opacity: 0, duration: 0.7};

  gsap.timeline()
    .to(".sidenav-content", animationOptions)
    .to(".main-content", animationOptions, "<")
    .to(".footer", animationOptions, "<")
    .to(`#${elem1}`, animationOptions, "<")
    .to(`#${elem2}`, animationOptions, "<")
    .to(`#${elem3}`, animationOptions, "<")
    .call(() => {
      // get all links
      let allLinks = document.querySelectorAll("a");

      // loop through the links and add a class for no pointer events
      for(let j = 0; j < allLinks.length; j++) {
        allLinks[j].style.pointerEvents = "none";
      }
    })
    .to(`#transition-${targetId}`, {opacity: 0, y: -5, duration: 0.5, delay: 0.8})
    .to(".sidenav", {backgroundColor: "#fff5eb", duration: 1})
    .to("body", {visibility: "hidden", backgroundColor: "#fff5eb", duration: 1}, "<")
    .call(() => {
      window.location.href = target;
    });
}

navbarContainer.addEventListener("click", (event) => {
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


// ---------- page load animation at 992px and below ----------
mm.add("(max-width: 992px)", () => {
  window.addEventListener("load", () => {
    gsap.timeline()
    .from("body", {autoAlpha: 0})
    .to("body", {backgroundColor: "#000", duration: 1})
    .to(".sidenav", {backgroundColor: "#000", duration: 1}, "<")
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
      markers: true,
      start: "top 26.4%",
      end: "bottom 75%",
      onEnter: changeSectionTitle,
      onEnterBack: changeSectionTitle
    });
  });
}); 


// ---------- Persona modal animation ----------
const personaButtons = document.querySelectorAll(".persona-button");
const personaModal = document.querySelector(".persona-modal");
const personaCloseButton = document.querySelector(".persona-close-icon");


// ----- Typing effect -----
const personaName = document.querySelector(".persona-intro h2");
const personaIntro = document.querySelector(".persona-intro p");
let currentStr = "";
let index = 0;

// personas
const personaShawn = {
  name: "Hi, I'm Shawn!",
  intro: "I’m 36 and live in Vancouver, British Columbia and I’m a photographer.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
}


const typingEffect = (str, element) => {
  // base case:  if the index is less that the string's length keeping calling the function
  if(index < str.length) {
    // add a letter from the string (at the current index) to the current string
    currentStr += str[index];

    // set the subheader's text content to be what the current string is
    element.textContent = currentStr;

    // increase the index by 1
    index++;

    // use setTimeout to call the function after a delay
    setTimeout(() => typingEffect(str, element), 20);
  };
};


// loop over the persona buttons and add an event listener
for(let button of personaButtons) {
  button.addEventListener("click", () => {
    console.log("you clicked on me!");

    // on click, show modal
    personaModal.classList.add("active");

    // animation
    gsap.timeline()
      .from(".persona-modal", {opacity: 0, duration: 1})
      .from(".persona-image-1", {rotateX: 90, duration: 0.5})
      .from(".persona-image-2", {rotateY: 90, duration: 0.5})
      .from(".persona-image-3", {rotateX: 90, duration: 0.5})
      .call(() => {
        // check to see if currentStr isn't empty. If it's not, set currentStr to empty, and index to 0.
        // otherwise, call the typing effect.
        if(currentStr !== "") {
          currentStr = "";
          index = 0;
          typingEffect(personaShawn.name, personaName);
        } else {
          typingEffect(personaShawn.name, personaName);
        }
      })
      .call(() => {
        // set currentStr to empty and index to 0, then call the typing effect
        currentStr = "";
        index = 0;
        typingEffect(personaShawn.intro, personaIntro)
      }, null, "<1")
      .from(".persona-goals h3", {opacity: 0, duration: 0.5}, "<7.5")
      .from(".persona-goals li", {opacity: 0, duration: 0.5})
      .from(".persona-frustrations h3", {opacity: 0, duration: 0.5})
      .from(".persona-frustrations li", {opacity: 0, duration: 0.5})
      .from(".problem-statement h3", {opacity: 0, duration: 0.5})
      .from(".problem-statement p", {opacity: 0, duration: 0.5})
      .from(".attribution", {opacity: 0, duration: 0.5})
  });
};


// persona modal close
personaCloseButton.addEventListener("click", () => {
  // hide modal
  personaModal.classList.remove("active");

  // reset the persona's name an intro
  personaName.textContent = "";
  personaIntro.textContent = "";
});