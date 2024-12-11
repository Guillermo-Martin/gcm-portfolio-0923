console.log("connected to kumiko music redesign!");

// ---------- Page load animation function ----------
const init = () => {
  gsap.timeline()
    .set(".sidenav", {backgroundColor: "transparent"})
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


// ------------------------------------------------------------------
//                    Persona modal animation 
// ------------------------------------------------------------------
// ---------- Persona elements ----------
const personaButtons = document.querySelectorAll(".persona-button");
const personaModal = document.querySelector(".persona-modal");
// const personaCloseButton = document.querySelector(".persona-close-icon");
const personaCloseButtons = document.querySelectorAll(".persona-close-icon");
const personaImagesDiv = document.querySelector(".persona-images");
const personaProblem = document.querySelector(".problem-statement p");
const personaGoalsList = document.querySelector(".persona-goals ul");
const personaFrustrationsList = document.querySelector(".persona-frustrations ul");
const attributionLink = document.querySelector(".attribution a");
const attributionHandle = document.querySelector(".attribution-handle");

// ---------- Personas information ----------
const personaShawn = {
  name: "Hi, I'm Shawn!",
  intro: "I’m 36 and live in Vancouver, British Columbia and I’m a photographer.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  problem: "Shawn Watts is a photographer who needs to visit an easy to navigate website because he wants to learn more about a new musician.",
  goals: ["Wants to learn more about a new musician"],
  frustrations: ["Navigating the musician's website is challenging", "Can't tell who a musician is by their website"],
  images: [
    {filepath: "../assets/images/kumiko-music-redesign/shawn-watts-1.jpg", alt: "Picture of Shawn"},
    {filepath: "../assets/images/kumiko-music-redesign/shawn-watts-2.jpg", alt: "Picture of Shawn"},
    {filepath: "../assets/images/kumiko-music-redesign/shawn-watts-3.jpg", alt: "Picture of Shawn"}
  ],
  attributionName: "@svetlanasokolova",
  attributionLink: "https://www.freepik.com/author/svetlanasokolova"
};

const personaLouella = {
  name: "Hi, I'm Louella!",
  intro: "Louella intro I’m 36 and live in Vancouver, British Columbia and I’m a photographer.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  problem: "Louella Washington is a social worker who needs to listen to samples of music because she wants to know what kind of music a particular musician plays.",
  goals: ["Listen to music by a new musician", "Watch the musician perform"],
  frustrations: ["Unsure where to listen and play samples of music", "Links take her off the musician's site to another site"],
  images: [
    {filepath: "../assets/images/kumiko-music-redesign/louella-washington-1.jpg", alt: "Picture of Louella"},
    {filepath: "../assets/images/kumiko-music-redesign/louella-washington-2.jpg", alt: "Picture of Louella"},
    {filepath: "../assets/images/kumiko-music-redesign/louella-washington-3.jpg", alt: "Picture of Louella"}
  ],
  attributionName: "@freepik",
  attributionLink: "https://www.freepik.com/author/freepik"
};

// ---------- Typing effect elements ----------
const personaName = document.querySelector(".persona-intro h2");
const personaIntro = document.querySelector(".persona-intro p");
let currentStr = "";
let index = 0;
let isTyping = true;

// ---------- Typing effect (for persona animation timeline) ----------
const typingEffect = (str, element) => {
  // base case:  if the index is less that the string's length keeping calling the function
  // and isTyping is false
  if(index < str.length && isTyping) {
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

// ---------- Persona animation (for createPersona function) ----------
const createTimeline = (strName, strIntro) => {
  let personaTimeline = gsap.timeline({paused: true})
    .set(".persona-goals h3", {opacity: 0})
    .set(".persona-goals li", {opacity: 0})
    .set(".persona-frustrations h3", {opacity: 0})
    .set(".persona-frustrations li", {opacity: 0})
    .set(".problem-statement h3", {opacity: 0})
    .set(".problem-statement p", {opacity: 0})
    .set(".attribution", {opacity: 0})
    .set(".persona-image-1", {rotateX: 90})
    .set(".persona-image-2", {rotateY: 90})
    .set(".persona-image-3", {rotateX: 90, duration: 0.5})
    .from(".persona-modal", {opacity: 0, duration: 1})
    .to(".persona-image-1", {rotateX: 0, duration: 0.5})
    .to(".persona-image-2", {rotateY: 0, duration: 0.5})
    .to(".persona-image-3", {rotateX: 0, duration: 0.5})
    .call(() => {
      // check to see if currentStr isn't empty. If it's not, set currentStr to empty, and index to 0.
      // otherwise, call the typing effect.
      if(currentStr !== "") {
        currentStr = "";
        index = 0;
        typingEffect(strName, personaName);
      } else {
        typingEffect(strName, personaName);
      }
    })
    .call(() => {
      // set currentStr to empty and index to 0, then call the typing effect
      currentStr = "";
      index = 0;
      typingEffect(strIntro, personaIntro)
    }, null, "<1")
    .to(".persona-goals h3", {opacity: 1, duration: 0.5}, "<7.5")
    .to(".persona-goals li", {opacity: 1, duration: 0.5})
    .to(".persona-frustrations h3", {opacity: 1, duration: 0.5})
    .to(".persona-frustrations li", {opacity: 1, duration: 0.5})
    .to(".problem-statement h3", {opacity: 1, duration: 0.5})
    .to(".problem-statement p", {opacity: 1, duration: 0.5})
    .to(".attribution", {opacity: 1, duration: 0.5});
  
    // return timeline to be used elsewhere
    return personaTimeline;
};

// ---------- Persona creation function ----------
const personaCreation = (personaObj) => {
  // destructure object variables
  const { problem, images, attributionLink, attributionName, goals, frustrations, name, intro } = personaObj;

  // set the persona information
  personaProblem.textContent = problem;

  // set the persona images
  for(let i = 0; i < images.length; i++) {
    // create an img tag
    let personaImage = document.createElement("img");

    // set the image src, alt, and add a class
    personaImage.src = images[i].filepath;
    personaImage.alt = images[i].alt;
    personaImage.classList.add(`persona-image-${i + 1}`);

    // append the image to the persona images div
    personaImagesDiv.appendChild(personaImage);
  };

  // set the attribution
  attributionLink.href = attributionLink;
  attributionHandle.textContent = attributionName;

  // set the persona goals
  for(let goal of goals){
    // create list elements
    let goalLi = document.createElement("li");
    let goalP = document.createElement("p");

    // set goal text, then append to li
    goalP.textContent = goal;
    goalLi.appendChild(goalP);

    // append li to ul
    personaGoalsList.appendChild(goalLi);
  };

  // set the persona frustrations
  for(let frustration of frustrations) {
    // create list elements
    let frustrationLi = document.createElement("li");
    let frustrationP = document.createElement("p");

    // set frustration text, then append to li
    frustrationP.textContent = frustration;
    frustrationLi.appendChild(frustrationP);

    // append li to ul
    personaFrustrationsList.appendChild(frustrationLi);
  };

  // create and play the persona animation timeline
  let personaTimeline = createTimeline(name, intro);
  personaTimeline.restart();

  // add modal close functionality
  // add an event listener to the close button; immediately stop animation if user clicks close
  // while animation is playing
  for(let personaCloseButton of personaCloseButtons) {
    personaCloseButton.addEventListener("click", () => {
      gsap.timeline()
        .to(".persona-images", {opacity: 0})
        .to(".persona-text", {opacity: 0}, "<")
        .to(".persona-close-button", {opacity: 0}, "<")
        .to(".persona-modal", {backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)"}, "<")
        .call(() => {
          // hide modal
          personaModal.classList.remove("active");
  
          // reset the persona's info
          personaImagesDiv.innerHTML = "";
          attributionLink.href = "";
          attributionHandle.textContent = "";
          personaName.textContent = "";
          personaIntro.textContent = "";
          personaGoalsList.innerHTML = "";
          personaFrustrationsList.innerHTML = "";
          personaProblem.textContent = "";
        })
        .set(".persona-images", {opacity: 1})
        .set(".persona-text", {opacity: 1}, "<")
        .set(".persona-close-button", {opacity: 1}, "<")
        .set(".persona-modal", {backdropFilter: "blur(8px)", backgroundColor: "rgba(0, 0, 0, 0.4)"}, "<")
  
      // set isTyping to false
      isTyping = false;
  
      // stop the animation
      personaTimeline.kill();
  
      // allow user to scroll again
      body.style.overflow = "visible";
    });
  }
};

// ---------- Adding persona creation function to "learn more" persona buttons ----------
for(let button of personaButtons) {
  button.addEventListener("click", (event) => {
    // prevent user from scrolling the body when the modal is open
    body.style.overflow = "hidden";

    // set isTyping to true
    isTyping = true;

    // if persona 1 is clicked on
    if(event.target.id === "persona-1") {
      personaCreation(personaShawn);
    };

    // if persona 2 is clicked on
    if(event.target.id === "persona-2") {
      personaCreation(personaLouella);
    };
  
    // on click, show modal
    personaModal.classList.add("active");
  });
};


// ------------------------------------------------------------------------------------------------
// Gallery modal animation (for wireframes, hifi mockups, and before and afters, and final designs) 
// ------------------------------------------------------------------------------------------------
// ---------- Gallery elements ----------
const galleryButtons = document.querySelectorAll(".gallery-link-button");
const galleryModal = document.querySelector(".gallery-modal");
const galleryModalImagesContainer = document.querySelector(".gallery-modal-images");
const galleryModalContainer = document.querySelector(".gallery-modal-container");
const galleryCloseButtons = document.querySelectorAll(".gallery-close-icon");

// ---------- Wireframe gallery images and information ----------
const paperWireframes = [
  {filepath: "../assets/images/kumiko-music-redesign/about-1.png", alt: "About page"},
  {filepath: "../assets/images/kumiko-music-redesign/about-2.png", alt: "About page"},
  {filepath: "../assets/images/kumiko-music-redesign/composer-1.png", alt: "Compositions page"},
  {filepath: "../assets/images/kumiko-music-redesign/composer-2.png", alt: "Compositions page"},
  {filepath: "../assets/images/kumiko-music-redesign/pianist-1.png", alt: "Pianist page"},
  {filepath: "../assets/images/kumiko-music-redesign/pianist-2.png", alt: "Pianist page"},
  {filepath: "../assets/images/kumiko-music-redesign/contact-1.png", alt: "Contact page"},
  {filepath: "../assets/images/kumiko-music-redesign/contact-2.png", alt: "Contact page"},
  {filepath: "../assets/images/kumiko-music-redesign/homepage-1.png", alt: "Homepage"},
  {filepath: "../assets/images/kumiko-music-redesign/homepage-2.png", alt: "Homepage"},
];

const digitalWireframes = [
  {filepath: "../assets/images/kumiko-music-redesign/homepage-digital-1.png", alt: "Homepage"},
  {filepath: "../assets/images/kumiko-music-redesign/homepage-digital-2.png", alt: "Homepage"},
  {filepath: "../assets/images/kumiko-music-redesign/homepage-digital-3.png", alt: "Homepage"},
  {filepath: "../assets/images/kumiko-music-redesign/about-me-page-digital-1.png", alt: "About page"},
  {filepath: "../assets/images/kumiko-music-redesign/compositions-page-digital-1.png", alt: "Compositions page"},
  {filepath: "../assets/images/kumiko-music-redesign/contact-page-digital-1.png", alt: "Contact page"},
  // {filepath: "../assets/images/kumiko-music-redesign/pianist-page-digital-1.png", alt: "Homepage"},
];

const finalDesigns = [
  {filepath: "../assets/images/kumiko-music-redesign/homepage-digital-1.png", alt: "Homepage"},
  {filepath: "../assets/images/kumiko-music-redesign/homepage-digital-2.png", alt: "Homepage"},
  {filepath: "../assets/images/kumiko-music-redesign/homepage-digital-3.png", alt: "Homepage"},
  {filepath: "../assets/images/kumiko-music-redesign/about-me-page-digital-1.png", alt: "About page"},
  {filepath: "../assets/images/kumiko-music-redesign/compositions-page-digital-1.png", alt: "Compositions page"},
  {filepath: "../assets/images/kumiko-music-redesign/contact-page-digital-1.png", alt: "Contact page"},
  // {filepath: "../assets/images/kumiko-music-redesign/pianist-page-digital-1.png", alt: "Homepage"},
];


// ---------- Wireframe intro timeline ----------
// define timeline creation
const createGalleryTimeline = () => {
  let galleryTimeline = gsap.timeline({paused: true})
    .from(".gallery-modal", {opacity: 0, duration: 1})
    .from(".gallery-modal figure", {opacity: 0, stagger: 0.05, duration: 0.5})

  return galleryTimeline;
};


// ---------- Gallery creation function (for wireframes and final designs) ----------
const galleryCreation = (galleryArr) => {
  // for every image in the "images" array, create an image element, set its src and alt
  for(let image of galleryArr){
    // create a figure element and its caption
    let galleryFigure = document.createElement("figure");
    let galleryFigureCaption = document.createElement("figcaption");

    // create an image element
    let galleryImage = document.createElement("img");

    // set its src an alt, set the figcaption
    galleryImage.src = image.filepath;
    galleryImage.alt = image.alt;
    galleryFigureCaption.textContent = image.alt;

    // append the image and figcaption to the figure
    galleryFigure.appendChild(galleryFigureCaption);
    galleryFigure.appendChild(galleryImage);

    // append the figures to the container
    galleryModalImagesContainer.appendChild(galleryFigure);
  };
  
  // aftering creating the wireframe, create the wireframe timeline, then play it
  let galleryTimeline = createGalleryTimeline();
  galleryTimeline.restart();

  // add the modal close button functionality
  for(let galleryCloseButton of galleryCloseButtons) {
    galleryCloseButton.addEventListener("click", () => {
      gsap.timeline()
        .to(".gallery-modal-images", {opacity: 0})
        .to(".gallery-close-button", {opacity: 0}, "<")
        .to(".gallery-modal", {backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)"}, "<0.2")
        .call(() => {
          // reset the scroll position
          galleryModalContainer.scrollTop = 0;
  
          // hide modal
          galleryModal.classList.remove("active");
          galleryModalImagesContainer.classList.remove("gallery");
  
          // remove images in gallery
          galleryModalImagesContainer.innerHTML = "";
        })
        .set(".gallery-modal-images", {opacity: 1})
        .set(".gallery-close-button", {opacity: 1}, "<")
        .set(".gallery-modal", {backdropFilter: "blur(8px)", backgroundColor: "rgba(0, 0, 0, 0.4)"}, "<")
      
      // stop the animation (if a user closes the modal while the animation is still playing)
      galleryTimeline.kill();
  
      // allow user to scroll again
      body.style.overflow = "visible";
    });
  };
};


// ---------- Add eventListener to gallery buttons (for wireframes and final designs) ----------
for(let galleryButton of galleryButtons) {
  galleryButton.addEventListener("click", (event) => {
    // see which button was pressed, call galleryCreation function with the appropriate image array
    if(event.target.id === "paper-wireframes") {
      galleryModalImagesContainer.classList.add("gallery");
      galleryCreation(paperWireframes);
    };

    if(event.target.id === "digital-wireframes") {
      galleryModalImagesContainer.classList.add("gallery");
      galleryCreation(digitalWireframes);
    };

    if(event.target.id === "final-designs") {
      galleryModalImagesContainer.classList.add("gallery");
      galleryCreation(finalDesigns);
    };
    
    // show the wireframe modal
    galleryModal.classList.add("active");

    // prevent user from scrolling the body when the modal is open
    body.style.overflow = "hidden";
  });
};


// ------------------------------------------------------------------
//                  Before and after modal animation 
// ------------------------------------------------------------------
// ---------- Gallery elements ----------
const beforeAndAfterButtons = document.querySelectorAll(".before-and-after");

// timeline
const createBeforeAfterTl = () => {
  let beforeAfterTl = gsap.timeline()
    .from(".gallery-modal", {opacity: 0, duration: 1})
    .from(".before-figure", {opacity: 0, duration: 0.4})
    .from(".arrow", {opacity: 0, duration: 0.4}, "<0.5")
    .from(".after-figure", {opacity: 0, duration: 0.4}, "<0.5")

  // return the timeline to be used elsewhere
  return beforeAfterTl;
};

// ---------- Images to use for the before and afters ----------
const navigationImages = [
  {
    before: "../assets/images/kumiko-music-redesign/main-landing-page.png",
    beforeAlt: "The previous navigation page for Kumiko Music",
    beforeText: "The previous design had a single page that served as the main point for navigation.  Other pages didn't have a way to navigate around.",
    after: "../assets/images/kumiko-music-redesign/pianist-page.png",
    afterAlt: "Screenshot of the 'Pianist' page",
    afterText: "The new designs incorporate a navbar at the top of every page allowing users to easily navigate the site.",
  }
];

const designAndLayoutImages = [
  {
    before: "../assets/images/kumiko-music-redesign/about-page-old.png",
    beforeAlt: "About page, previous design",
    beforeText: "About page (before)",
    after: "../assets/images/kumiko-music-redesign/about-page-new.png",
    afterAlt: "About page, new design",
    afterText: "About page (after)",
  },
  {
    before: "../assets/images/kumiko-music-redesign/contact-page-old.png",
    beforeAlt: "Contact page, previous design",
    beforeText: "Contact page (before)",
    after: "../assets/images/kumiko-music-redesign/contact-page-new.png",
    afterAlt: "Contact page, new design",
    afterText: "Contact page (after)",
  },
];

const ethnoImages = [
  {
    before: "../assets/images/kumiko-music-redesign/conference-papers-old.png",
    beforeAlt: "Conference papers, previous design",
    beforeText: "Conference papers (before)",
    after: "../assets/images/kumiko-music-redesign/conference-papers-new.png",
    afterAlt: "Conference papers, new design",
    afterText: "Conference papers (after)",
  }
];

// ---------- Create before and after modal ----------
// beforeAfterCreation
const beforeAfterCreation = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    // create the before, after, and arrow elements
    const beforeFigure = document.createElement("figure");
    const afterFigure = document.createElement("figure");
    const rightArrow = document.createElement("div");

    // add classes to the before and after figures and the arrow
    beforeFigure.classList.add("before-figure");
    afterFigure.classList.add("after-figure");
    rightArrow.classList.add("arrow");

    // images
    const beforeImage = document.createElement("img");
    const afterImage = document.createElement("img");

    // append the images to the figures
    beforeFigure.appendChild(beforeImage);
    afterFigure.appendChild(afterImage);

    // add src and alt to images
    beforeImage.src = arr[i].before;
    afterImage.src = arr[i].after;

    // create figcaptions to append to the images
    const beforeCaption = document.createElement("figcaption");
    const afterCaption = document.createElement("figcaption");

    // set the text of the captions
    beforeCaption.textContent = arr[i].beforeText;
    rightArrow.innerHTML = "&rarr;";
    afterCaption.textContent = arr[i].afterText;

    // append the captions to the figures
    beforeFigure.appendChild(beforeCaption);
    afterFigure.appendChild(afterCaption);

    // append the figures to the gallery-modal-images container
    galleryModalImagesContainer.appendChild(beforeFigure);
    galleryModalImagesContainer.appendChild(rightArrow);
    galleryModalImagesContainer.appendChild(afterFigure);
  };

  // create the timeline
  let beforeAndAfterTl = createBeforeAfterTl();
  beforeAndAfterTl.restart();

  // add the modal close button functionality
  for(let galleryCloseButton of galleryCloseButtons) {
    galleryCloseButton.addEventListener("click", () => {
      gsap.timeline()
        .to(".gallery-modal-images", {opacity: 0})
        .to(".gallery-close-button", {opacity: 0}, "<")
        .to(".gallery-modal", {backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)"}, "<0.2")
        .call(() => {
          // reset the scroll position
          galleryModalContainer.scrollTop = 0;

          // hide modal
          galleryModal.classList.remove("active");
  
          // remove navigation class for styling
          galleryModalImagesContainer.classList.remove("before-and-after");
  
          // remove images in gallery
          galleryModalImagesContainer.innerHTML = "";
        })
        .set(".gallery-modal-images", {opacity: 1})
        .set(".gallery-close-button", {opacity: 1}, "<")
        .set(".gallery-modal", {backdropFilter: "blur(8px)", backgroundColor: "rgba(0, 0, 0, 0.4)"}, "<")
  
      // stop the animation (if a user closes the modal while the animation is still playing)
      beforeAndAfterTl.kill();
  
      // allow user to scroll again
      body.style.overflow = "visible";
    });
  }
};


// ----- Before and after buttons -----
for(let button of beforeAndAfterButtons) {
  button.addEventListener("click", (event) => {
    // ---------- navigation ----------
    if(event.target.id === "navigation") {
      // add class for styling
      galleryModalImagesContainer.classList.add("before-and-after");

      // create elements for section
      beforeAfterCreation(navigationImages);
    };

    // ---------- Design and layout -----------
    if(event.target.id === "design-and-layout") {
      // add class for styling
      galleryModalImagesContainer.classList.add("before-and-after");

      // create elements for section
      beforeAfterCreation(designAndLayoutImages);
    };

    // ---------- Ethnomusicology ----------
    if(event.target.id === "ethnomusicology") {
      // add class for styling
      galleryModalImagesContainer.classList.add("before-and-after");

      // create elements for section
      beforeAfterCreation(ethnoImages);
    };

    // show the gallery modal
    galleryModal.classList.add("active");

    // prevent user from scrolling the body when the modal is open
    body.style.overflow = "hidden";
  });
};


// ------------------------------------------------------------------
//               Findings - Participants button modal 
// ------------------------------------------------------------------
// participant elements
const participantsButton = document.querySelector(".participants");

// participant images 
const participantImages = [
  {
    participantImage: "../assets/images/kumiko-music-redesign/participant-1.jpg",
    participantAlt: "Silhouette of a woman",
    quote: "<span class='quote'>I like how her biography is split into different parts.</span> - Participant A",
    attribution: "Photo by <a href='https://unsplash.com/@mollyblackbird?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>Molly Blackbird</a> on <a href='https://unsplash.com/photos/a-black-silhouette-of-a-woman-a-xEUwYSPLw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>Unsplash</a>", 
  },
  {
    participantImage: "../assets/images/kumiko-music-redesign/participant-2.jpg",
    participantAlt: "Silhouette of a man",
    quote: "<span class='quote'>It was a little confusing to have links to her work (abstracts, conference paper, etc.) on the 'About page' - this felt like it should be an entirely separate page.</span> - Participant B",
    attribution: "Photo by <a href='https://unsplash.com/@benjaminsweet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>Ben Sweet</a> on <a href='https://unsplash.com/photos/silhouette-of-man-illustration-2LowviVHZ-E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>Unsplash</a>",
  },
  {
    participantImage: "../assets/images/kumiko-music-redesign/participant-3.jpg",
    quote: "<span class='quote'>It’s much more uniform, there’s a running a theme.</span> - Participant C",
    participantAlt: "Silhouette of a man",
    attribution: "Photo by <a href='https://unsplash.com/@mattbass?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>Mateo Avila Chinchilla</a> on <a href='https://unsplash.com/photos/persons-silhouette-during-golden-hour-x_8oJhYU31k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>Unsplash</a>",
  },
];

// create a function that creates a timeline, then return it to be used elsewhere
const createParticipantTl = () => {
  let participantTl = gsap.timeline()
    .from(".gallery-modal", {opacity: 0, duration: 1})
    .from(".participants img", {opacity: 0, stagger: 0.8, duration: 1})
    .from(".participants p", {opacity: 0, x: -8, stagger: 0.8, duration: 1}, "<0.5")

  return participantTl;
};

participantsButton.addEventListener("click", () => {
  // ----- create the participants modal -----
  // add class for styling
  galleryModalImagesContainer.classList.add("participants");

  // create the participant elements
  for(let participant of participantImages) {
    // create the participant image and quote
    const participantFigure = document.createElement("figure");
    const participantImage = document.createElement("img");
    const attribution = document.createElement("figcaption");
    const participantQuote = document.createElement("p");

    // add the src of the image, add the attribution, set the participant quote
    participantImage.src = participant.participantImage;
    participantImage.alt = participant.participantAlt;
    participantQuote.innerHTML = participant.quote;
    attribution.innerHTML = participant.attribution;

    // append the image and attribution to the figure
    participantFigure.appendChild(participantImage);
    participantFigure.appendChild(attribution);
   

    // append the image and quote to the gallery modal images container
    galleryModalImagesContainer.appendChild(participantFigure);
    galleryModalImagesContainer.appendChild(participantQuote);
  };

  // show the gallery modal
  galleryModal.classList.add("active");

  // prevent user from scrolling the body when the modal is open
  body.style.overflow = "hidden";

  // play the timeline
  let participantTl = createParticipantTl();
  participantTl.restart();

  // ----- Close button -----
  for(let galleryCloseButton of galleryCloseButtons) {
    galleryCloseButton.addEventListener("click", () => {
      gsap.timeline()
        .to(".gallery-modal-images", {opacity: 0})
        .to(".gallery-close-button", {opacity: 0}, "<")
        .to(".gallery-modal", {backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)"}, "<0.2")
        .call(() => {
          // reset the scroll position
          galleryModalContainer.scrollTop = 0;

          // hide modal
          galleryModal.classList.remove("active");
  
          // remove navigation class for styling
          galleryModalImagesContainer.classList.remove("participants");
  
          // remove images in gallery
          galleryModalImagesContainer.innerHTML = "";
        })
        .set(".gallery-modal-images", {opacity: 1})
        .set(".gallery-close-button", {opacity: 1}, "<")
        .set(".gallery-modal", {backdropFilter: "blur(8px)", backgroundColor: "rgba(0, 0, 0, 0.4)"}, "<")
  
      // stop animation if user clicks on close button
      participantTl.kill();
  
      // allow user to scroll again
      body.style.overflow = "visible";
    });
  }
});
