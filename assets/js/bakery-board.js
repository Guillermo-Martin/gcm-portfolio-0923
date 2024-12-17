console.log("connected to bakery board");

// ---------- Page load animation function ----------
const init = () => {
  gsap.timeline()
    .set(".sidenav", {backgroundColor: "transparent"})
    .from("body", {autoAlpha: 0})
    .to("body", {backgroundColor: "#904D42", duration: 1})
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
const personaCloseButtons = document.querySelectorAll(".persona-close-icon");
const personaImagesDiv = document.querySelector(".persona-images");
const personaProblem = document.querySelector(".problem-statement p");
const personaGoalsList = document.querySelector(".persona-goals ul");
const personaFrustrationsList = document.querySelector(".persona-frustrations ul");
const attributionElement = document.querySelector(".attribution a");
const attributionHandle = document.querySelector(".attribution-handle");

// ---------- Personas information ----------
const persona1 = {
  name: "Hi, I'm Kibum!",
  intro: "I’m 47 and I have my own bakery in San Francisco.  At my bakery, I like to make a lot of food so that I don’t sell out like other bakeries.  The downside is that I often have unsold food like bread and other pastries at the end of the day.  I wish I could find a way to sell these; I would hate for them to go to waste!  It might also help recoup the cost of some of the ingredients.",
  problem: "Kibum Lee is a professional baker who needs a way to sell unsold baked goods because he wants to reduce food waste and recoup the cost of ingredients.",
  goals: ["Reduce food waste", "Would like to sell as many of their baked goods as possible"],
  frustrations: ["Doesn’t know what to do with unsold baked goods at the end of the day", "Loses money when he doesn’t sell everything"],
  images: [
    {filepath: "../assets/images/bakery-board/kibum-lee-1.jpg", alt: "Picture of Kibum"},
    {filepath: "../assets/images/bakery-board/kibum-lee-2.jpg", alt: "Picture of Kibum"},
    {filepath: "../assets/images/bakery-board/kibum-lee-3.jpg", alt: "Picture of Kibum"}
  ],
  attributionName: "@benzoix",
  attributionLink: "https://www.freepik.com/author/benzoix"
};

const persona2 = {
  name: "Hi, I'm Isabella!",
  intro: "I’m 35 and recently quit my job to start my own bakery in San Diego, where I sell artisanal breads and pastries.  I want to start advertising and getting my name out there, but I often spend a lot of time filling out information about my items.  I’d rather spend time experimenting with new recipes instead of spending time filling out information!  I’d love for an easy way to sell my food online, as well!.",
  problem: "Isabella Carrillo is a pastry chef who needs to easily sell her food online because she wants to spend more time creating and experimenting with new recipes.",
  goals: ["Spend more time creating and experimenting with recipes", "Easily sell things online"],
  frustrations: ["Selling something online is cumbersome because of all the little things you have to do", "Buyers have been unreliable in the past"],
  images: [
    {filepath: "../assets/images/bakery-board/isabella-carrillo-1.jpg", alt: "Picture of Isabella"},
    {filepath: "../assets/images/bakery-board/isabella-carrillo-2.jpg", alt: "Picture of Isabella"},
    {filepath: "../assets/images/bakery-board/isabella-carrillo-3.jpg", alt: "Picture of Isabella"}
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
    setTimeout(() => typingEffect(str, element), 10);
  };
};

// ---------- Persona animation (for createPersona function) ----------
const createTimeline = (strName, strIntro) => {
  let personaTimeline = gsap.timeline({paused: true})
    // .set(".persona-intro", {opacity: 0})
    .set(".persona-goals h3", {opacity: 0})
    .set(".persona-goals li", {opacity: 0})
    .set(".persona-frustrations h3", {opacity: 0})
    .set(".persona-frustrations li", {opacity: 0})
    .set(".problem-statement h3", {opacity: 0})
    .set(".problem-statement p", {opacity: 0})
    .set(".attribution", {opacity: 0})
    .set(".persona-image-1", {rotateY: 90})
    .set(".persona-image-2", {rotateX: 90})
    .set(".persona-image-3", {rotateY: 90, duration: 0.5})
    .from(".persona-modal", {opacity: 0, duration: 1})
    // .to(".persona-image-1", {rotateX: 0, duration: 0.5})
    .to(".persona-image-2", {rotateX: 0, duration: 0.5})
    .to(".persona-image-1", {rotateY: 0, duration: 0.5}, "<")
    .to(".persona-image-3", {rotateY: 180, duration: 0.5}, "<")
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
    // .to(".persona-intro", {opacity: 1})
    .to(".persona-goals h3", {opacity: 1, duration: 0.5}, "<6.5")
    .to(".persona-goals li", {opacity: 1, duration: 0.5}, "<")
    .to(".persona-frustrations h3", {opacity: 1, duration: 0.5}, "<")
    .to(".persona-frustrations li", {opacity: 1, duration: 0.5}, "<")
    .to(".problem-statement h3", {opacity: 1, duration: 0.5})
    .to(".problem-statement p", {opacity: 1, duration: 0.5}, "<")
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
  attributionElement.href = attributionLink;
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
      personaCreation(persona1);
    };

    // if persona 2 is clicked on
    if(event.target.id === "persona-2") {
      personaCreation(persona2);
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
const persona1UserJourney = [
  {filepath: "../assets/images/bakery-board/homepage-paper.png", alt: "Homepage"},
];

const persona2UserJourney = [
  {filepath: "../assets/images/bakery-board/post-item-screen-paper.png", alt: "Post item screen"},
];

const paperWireframes = [
  {filepath: "../assets/images/bakery-board/homepage-paper.png", alt: "Homepage"},
  {filepath: "../assets/images/bakery-board/post-item-screen-paper.png", alt: "Post item screen"},
  {filepath: "../assets/images/bakery-board/review-screen-paper.png", alt: "Review screen"},
  {filepath: "../assets/images/bakery-board/sign-in-paper.png", alt: "Sign in screen"},
  {filepath: "../assets/images/bakery-board/success-screen-paper.png", alt: "Success screen"},
  {filepath: "../assets/images/bakery-board/user-dashboard-paper.png", alt: "User dashboard"},
];

const digitalWireframes = [
  {filepath: "../assets/images/bakery-board/homepage-digital.png", alt: "Homepage"},
  {filepath: "../assets/images/bakery-board/sign-in-digital.png", alt: "Sign in screen"},
  {filepath: "../assets/images/bakery-board/quick-add-digital.png", alt: "Quick add screen"},
  {filepath: "../assets/images/bakery-board/review-digital.png", alt: "Review screen"},
  {filepath: "../assets/images/bakery-board/post-item-digital.png", alt: "Post item screen"},
  {filepath: "../assets/images/bakery-board/success-digital.png", alt: "Success screen"},
  {filepath: "../assets/images/bakery-board/user-dashboard-digital.png", alt: "User dashboard"},
  {filepath: "../assets/images/bakery-board/add-item-modal-digital.png", alt: "Add item modal"},
];

const finalAppDesigns = [
  {filepath: "../assets/images/bakery-board/camera-app-final.png", alt: "Camera app"},
  {filepath: "../assets/images/bakery-board/homescreen-app-final.png", alt: "Homescreen"},
  {filepath: "../assets/images/bakery-board/new-item-form-app-final-1.png", alt: "New item form screen 1"},
  {filepath: "../assets/images/bakery-board/new-item-form-app-final-2.png", alt: "New item form screen 2"},
  {filepath: "../assets/images/bakery-board/new-item-form-app-final-3.png", alt: "New item form screen 3"},
  {filepath: "../assets/images/bakery-board/picture-gallery-app-final.png", alt: "Picture gallery"},
  {filepath: "../assets/images/bakery-board/quick-add-app-final.png", alt: "Quick add"},
  {filepath: "../assets/images/bakery-board/review-pic-app-final.png", alt: "Review picture"},
  {filepath: "../assets/images/bakery-board/review-screen-app-final.png", alt: "Review screen"},
  {filepath: "../assets/images/bakery-board/success-screen-app-final.png", alt: "Success screen"},
  {filepath: "../assets/images/bakery-board/user-dashboard-app-final.png", alt: "User dashboard"},
];

const finalWebDesigns = [
  {filepath: "../assets/images/bakery-board/add-picture-screen-web-final.png", alt: "\"Add picture\""},
  {filepath: "../assets/images/bakery-board/homescreen-web-final.png", alt: "Homescreen"},
  {filepath: "../assets/images/bakery-board/new-item-form-web-final-1.png", alt: "\"New item\" form 1"},
  {filepath: "../assets/images/bakery-board/new-item-form-web-final-2.png", alt: "\"New item\" form 2"},
  {filepath: "../assets/images/bakery-board/quick-add-web-final.png", alt: "Quick add"},
  {filepath: "../assets/images/bakery-board/review-pic-web-final.png", alt: "Review picture"},
  {filepath: "../assets/images/bakery-board/review-screen-web-final.png", alt: "Review screen"},
  {filepath: "../assets/images/bakery-board/success-screen-web-final.png", alt: "Success screen"},
  {filepath: "../assets/images/bakery-board/user-dashboard-web-final.png", alt: "User dashboard"},
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
          galleryModalImagesContainer.classList.remove("gallery", "persona-user-journey");
  
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

    if(event.target.id === "final-app-designs") {
      galleryModalImagesContainer.classList.add("gallery");
      galleryCreation(finalAppDesigns);
    };

    if(event.target.id === "final-website-designs") {
      galleryModalImagesContainer.classList.add("gallery");
      galleryCreation(finalWebDesigns);
    };
    

    if(event.target.id === "persona-1-journey") {
      galleryModalImagesContainer.classList.add("gallery", "persona-user-journey");
      galleryCreation(persona1UserJourney);
    };
    

    if(event.target.id === "persona-2-journey") {
      galleryModalImagesContainer.classList.add("gallery", "persona-user-journey");
      galleryCreation(persona2UserJourney);
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
    before: "../assets/images/bakery-board/bottom-nav-before.png",
    beforeAlt: "The previous navigation bar for the Bakery Board app",
    beforeText: "The text was very small in the initial design.",
    after: "../assets/images/bakery-board/bottom-nav-after.png",
    afterAlt: "The new navbar with larger font size",
    afterText: "I made the font size larger to make it easier to read.",
  }
];

const addItemModalImages = [
  {
    before: "../assets/images/bakery-board/add-item-modal-before.png",
    beforeAlt: "\"Add item\" modal (before)",
    beforeText: "\"Add item\" modal (before)",
    after: "../assets/images/bakery-board/add-item-modal-after.png",
    afterAlt: "\"Add item\" modal (after)",
    afterText: "\"Add item\" modal (after)",
  },
];

const homepageImages = [
  {
    before: "../assets/images/bakery-board/homepage-app-before.png",
    beforeAlt: "Homepage (before)",
    beforeText: "Homepage (before)",
    after: "../assets/images/bakery-board/homepage-app-after.png",
    afterAlt: "Homepage (after)",
    afterText: "Homepage (after)",
  }
];

const appToDesktopImages = [
  {
    before: "../assets/images/bakery-board/item-info-mobile.png",
    beforeAlt: "High-fidelity mockup of mobile item info screen",
    beforeText: "\"Item info\" screen on the app",
    after: "../assets/images/bakery-board/item-info-website.png",
    afterAlt: "High-fidelity mockup of the desktop item info screen",
    afterText: "\"Item info\" screen on a desktop",
  }
];

const userDashboardImages = [
  {
    before: "../assets/images/bakery-board/user-dashboard-before.png",
    beforeAlt: "High-fidelity mockup of mobile user dashboard (before)",
    beforeText: "\"User dashboard\" screen (before)",
    after: "../assets/images/bakery-board/user-dashboard-after.png",
    afterAlt: "High-fidelity mockup of mobile user dashboard (after)",
    afterText: "\"User dashboard\" screen (after)",
  }
];

const easierNavigationImages = [
  {
    before: "../assets/images/bakery-board/item-info-mobile.png",
    beforeAlt: "High-fidelity mockup of 'Item info' screen",
    beforeText: "The \"Start over\" button previously took you to the new item form.",
    after: "../assets/images/bakery-board/user-dashboard-hifi-final.png",
    afterAlt: "High-fidelity mockup of mobile user dashboard",
    afterText: "Now, the button takes you to the \"User dashboard\" screen.",
  }
];

const quickAddImages = [
  {
    before: "../assets/images/bakery-board/add-item-modal-after.png",
    beforeAlt: "High-fidelity mockup of the 'Add item' modal (before)",
    beforeText: "\"Quick add\" modal (before)",
    after: "../assets/images/bakery-board/hifi-final-add-modal.png",
    afterAlt: "High-fidelity mockup of the 'Add item' modal (after)",
    afterText: "\"Quick add\" modal (before)",
  }
];

// ---------- Create before and after modal ----------
// beforeAfterCreation
const beforeAfterCreation = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    // create the before, after, and arrow elements
    const beforeFigure = document.createElement("figure");
    const afterFigure = document.createElement("figure");
    const arrowContainer = document.createElement("div");
    const rightArrow = document.createElement("div");

    // add classes to the before and after figures and the arrow
    beforeFigure.classList.add("before-figure");
    afterFigure.classList.add("after-figure");
    arrowContainer.classList.add("arrow-container");
    rightArrow.classList.add("arrow");

    // images
    const beforeImage = document.createElement("img");
    const afterImage = document.createElement("img");

    // create figcaptions to append to the images
    const beforeCaption = document.createElement("figcaption");
    const afterCaption = document.createElement("figcaption");

    // set the text of the captions
    beforeCaption.textContent = arr[i].beforeText;
    rightArrow.innerHTML = "&rarr;";
    afterCaption.textContent = arr[i].afterText;

    // append the images to the figures
    beforeFigure.appendChild(beforeImage);
    afterFigure.appendChild(afterImage);

    // append the arrow to the arrow container
    arrowContainer.appendChild(rightArrow);

    // add src and alt to images
    beforeImage.src = arr[i].before;
    afterImage.src = arr[i].after;

    // append the captions to the figures
    beforeFigure.appendChild(beforeCaption);
    afterFigure.appendChild(afterCaption);

    // append the figures to the gallery-modal-images container
    galleryModalImagesContainer.appendChild(beforeFigure);
    // galleryModalImagesContainer.appendChild(rightArrow);
    galleryModalImagesContainer.appendChild(arrowContainer);
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

    // ---------- "Add item" modal -----------
    if(event.target.id === "add-item-modal") {
      // add class for styling
      galleryModalImagesContainer.classList.add("before-and-after");

      // create elements for section
      beforeAfterCreation(addItemModalImages);
    };

    // ---------- Homepage ----------
    if(event.target.id === "homepage") {
      // add class for styling
      galleryModalImagesContainer.classList.add("before-and-after");

      // create elements for section
      beforeAfterCreation(homepageImages);
    };

    // ---------- App to desktop ----------
    if(event.target.id === "app-to-desktop") {
      // add class for styling
      galleryModalImagesContainer.classList.add("before-and-after");

      // create elements for section
      beforeAfterCreation(appToDesktopImages);
    };

    // ---------- User dashboard ----------
    if(event.target.id === "user-dashboard") {
      // add class for styling
      galleryModalImagesContainer.classList.add("before-and-after");

      // create elements for section
      beforeAfterCreation(userDashboardImages);
    };

    // ---------- Easier navigation ----------
    if(event.target.id === "easier-navigation") {
      // add class for styling
      galleryModalImagesContainer.classList.add("before-and-after");

      // create elements for section
      beforeAfterCreation(easierNavigationImages);
    };

    // ---------- Quick add ----------
    if(event.target.id === "quick-add") {
      // add class for styling
      galleryModalImagesContainer.classList.add("before-and-after");

      // create elements for section
      beforeAfterCreation(quickAddImages);
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
const participantsButtons = document.querySelectorAll(".participants");

// ----- participant images -----
const participantImages1 = [
  {
    participantImage: "../assets/images/kumiko-music-redesign/participant-1-flip.jpg",
    participantAlt: "Silhouette of a woman",
    quote: "<span class='quote'>\"The dashboard is a better homepage than the list of other bakeries.\"</span>&nbsp;- Participant&nbsp;A",
    attribution: "<p class='attribution'>Photo by <a href='https://unsplash.com/@mollyblackbird?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Molly Blackbird</a> on <a href='https://unsplash.com/photos/a-black-silhouette-of-a-woman-a-xEUwYSPLw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Unsplash</a></p>", 
  },
  {
    participantImage: "../assets/images/kumiko-music-redesign/participant-2.jpg",
    participantAlt: "Silhouette of a man",
    quote: "<span class='quote'>\"I wasn’t entirely sure that ‘Add new item’ would be how you would sell an item.\"</span>&nbsp;- Participant&nbsp;B",
    attribution: "<p class='attribution'>Photo by <a href='https://unsplash.com/@benjaminsweet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Ben Sweet</a> on <a href='https://unsplash.com/photos/silhouette-of-man-illustration-2LowviVHZ-E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Unsplash</a></p>",
  },
  {
    participantImage: "../assets/images/kumiko-music-redesign/participant-3.jpg",
    quote: "<span class='quote'>\"The homepage was confusing...my confusion may be just because I don’t see enough.\"</span>&nbsp;- Participant&nbsp;C",
    participantAlt: "Silhouette of a man",
    attribution: "<p class='attribution'>Photo by <a href='https://unsplash.com/@mattbass?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Mateo Avila Chinchilla</a> on <a href='https://unsplash.com/photos/persons-silhouette-during-golden-hour-x_8oJhYU31k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Unsplash</a></p>",
  },
];

const participantImages2 = [
  {
    participantImage: "../assets/images/kumiko-music-redesign/participant-1-flip.jpg",
    participantAlt: "Silhouette of a woman",
    quote: "<span class='quote'>\"I'm a participant!\"</span>&nbsp;- Participant&nbsp;A",
    attribution: "<p class='attribution'>Photo by <a href='https://unsplash.com/@mollyblackbird?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Molly Blackbird</a> on <a href='https://unsplash.com/photos/a-black-silhouette-of-a-woman-a-xEUwYSPLw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Unsplash</a></p>", 
  },
  {
    participantImage: "../assets/images/kumiko-music-redesign/participant-2.jpg",
    participantAlt: "Silhouette of a man",
    quote: "<span class='quote'>\"I'm a participant!\"</span>&nbsp;- Participant&nbsp;B",
    attribution: "<p class='attribution'>Photo by <a href='https://unsplash.com/@benjaminsweet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Ben Sweet</a> on <a href='https://unsplash.com/photos/silhouette-of-man-illustration-2LowviVHZ-E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Unsplash</a></p>",
  },
  {
    participantImage: "../assets/images/kumiko-music-redesign/participant-3.jpg",
    quote: "<span class='quote'>\"I'm a participant!!\"</span>&nbsp;- Participant&nbsp;C",
    participantAlt: "Silhouette of a man",
    attribution: "<p class='attribution'>Photo by <a href='https://unsplash.com/@mattbass?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Mateo Avila Chinchilla</a> on <a href='https://unsplash.com/photos/persons-silhouette-during-golden-hour-x_8oJhYU31k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' target='_blank' rel='noopener noreferrer'>Unsplash</a></p>",
  },
];


// ----- create the participant elements -----
const createParticipant = (participantArr) => {
  for(let participant of participantArr) {
    // create the participant image and quote
    const participantFigure = document.createElement("figure");
    const participantImage = document.createElement("img");
    const attribution = document.createElement("figcaption");
    const participantQuote = document.createElement("p");

    // add a class to the participant quote p tag
    participantQuote.classList.add("participant-quote");

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
}


// create a function that creates a timeline, then return it to be used elsewhere
const createParticipantTl = () => {
  let participantTl = gsap.timeline()
    .from(".gallery-modal", {opacity: 0, duration: 1})
    .from(".participants figure", {opacity: 0, duration: 1})
    .from(".participant-quote", {opacity: 0, duration: 1}, "<0.5")

  return participantTl;
};

for(let button of participantsButtons) {
  button.addEventListener("click", (event) => {
    // ----- create the participants modal -----
    console.log(event.target.id);

    if(event.target.id === "study-participants-1") {
      // add class for styling
      galleryModalImagesContainer.classList.add("participants");
      createParticipant(participantImages1);
    };

    if(event.target.id === "study-participants-2") {
      // add class for styling
      galleryModalImagesContainer.classList.add("participants");
      createParticipant(participantImages2);
    };
  });
}


