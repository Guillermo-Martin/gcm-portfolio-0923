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


// ------------------------------------------------------------------
//                    Persona modal animation 
// ------------------------------------------------------------------
// ---------- Persona elements ----------
const personaButtons = document.querySelectorAll(".persona-button");
const personaModal = document.querySelector(".persona-modal");
const personaCloseButton = document.querySelector(".persona-close-icon");
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
    // set the src
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
  });
};

// ---------- Adding persona creation function to "learn more" persona buttons ----------
for(let button of personaButtons) {
  button.addEventListener("click", (event) => {
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


// ------------------------------------------------------------------
//                    Gallery modal animation 
// ------------------------------------------------------------------
// ---------- Gallery elements ----------
const galleryButtons = document.querySelectorAll(".gallery-link-button");
const galleryModal = document.querySelector(".gallery-modal");
const galleryModalImagesContainer = document.querySelector(".gallery-modal-images");
const galleryCloseButton = document.querySelector(".gallery-close-icon");

// ---------- Gallery images and information ----------
const paperWireframes = {
  images: [
    {filepath: "../assets/images/kumiko-music-redesign/shawn-watts-1.jpg", alt: "Picture of Shawn"},
    {filepath: "../assets/images/kumiko-music-redesign/shawn-watts-2.jpg", alt: "Picture of Shawn"},
    {filepath: "../assets/images/kumiko-music-redesign/shawn-watts-3.jpg", alt: "Picture of Shawn"}
  ]
};

const digitalWireframes = {
  images: [
    {filepath: "../assets/images/kumiko-music-redesign/louella-washington-1.jpg", alt: "Picture of Louella"},
    {filepath: "../assets/images/kumiko-music-redesign/louella-washington-2.jpg", alt: "Picture of Louella"},
    {filepath: "../assets/images/kumiko-music-redesign/louella-washington-3.jpg", alt: "Picture of Louella"}
  ]
};


// ---------- Gallery intro timeline ----------
const createGalleryTimeline = () => {
  let galleryTimeline = gsap.timeline({paused: true})
    .from(".gallery-modal", {opacity: 0, duration: 1})
    .from(".gallery-modal img", {opacity: 0, stagger: 0.5, duration: 0.5})

  return galleryTimeline;
};


// ---------- Gallery creation function ----------
const galleryCreation = (galleryObj) => {
  // for every image in the "images" array, create an image element, set its src and alt
  for(let image of galleryObj.images){
    // create an image element
    let galleryImage = document.createElement("img");

    // set its src an alt
    galleryImage.src = image.filepath;
    galleryImage.alt = image.alt;

    // append the images to the container
    galleryModalImagesContainer.appendChild(galleryImage);
  };
  
  // aftering creating the gallery, create the gallery timeline, then play it
  let galleryTimeline = createGalleryTimeline();
  galleryTimeline.restart();

  // add the modal close button functionality
  galleryCloseButton.addEventListener("click", () => {
    gsap.timeline()
      .to(".gallery-modal-images", {opacity: 0})
      .to(".gallery-close-button", {opacity: 0}, "<")
      .to(".gallery-modal", {backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)"}, "<")
      .call(() => {
        // hide modal
        galleryModal.classList.remove("active");

        // remove images in gallery
        galleryModalImagesContainer.innerHTML = "";
      })
      .set(".gallery-modal-images", {opacity: 1})
      .set(".gallery-close-button", {opacity: 1}, "<")
      .set(".gallery-modal", {backdropFilter: "blur(8px)", backgroundColor: "rgba(0, 0, 0, 0.4)"}, "<")

    // stop the animation (if a user closes the modal while the animation is still playing)
    galleryTimeline.kill();
  });
};


// ---------- Add eventListener to gallery buttons ----------
for(let galleryButton of galleryButtons) {
  galleryButton.addEventListener("click", (event) => {
    // see which button was pressed, call galleryCreation function with the appropriate object
    if(event.target.id === "paper-wireframes") {
      galleryCreation(paperWireframes);
    };

    if(event.target.id === "digital-wireframes") {
      galleryCreation(digitalWireframes);
    };
    
    // show the gallery modal
    galleryModal.classList.add("active");
  });
};


// ------------------------------------------------------------------
//                    Before and after modal animation 
// ------------------------------------------------------------------
// ---------- Gallery elements ----------
const beforeAndAfterButtons = document.querySelectorAll(".before-and-after");

// console.log(beforeAndAfterButtons);
const beforeAndAfterModalTimeline = gsap.timeline({paused: true})
  .from(".gallery-modal", {opacity: 0, duration: 1})

// buttons
for(let button of beforeAndAfterButtons) {
  button.addEventListener("click", (event) => {
    // ---------- navigation ----------
    if(event.target.id === "navigation") {
      // ----- add all elements ------
      // create a div containing an image and text
      const beforeFigure = document.createElement("figure");
      const afterFigure = document.createElement("figure");

      // images
      const beforeImage = document.createElement("img");
      const afterImage = document.createElement("img");

      // append the images to the figures
      beforeFigure.appendChild(beforeImage);
      afterFigure.appendChild(afterImage);

      // add src and alt to images
      beforeImage.src = "../assets/images/kumiko-music-redesign/shawn-watts-1.jpg";
      afterImage.src = "../assets/images/kumiko-music-redesign/louella-washington-1.jpg";

      // create figcaptions to append to the images
      const beforeCaption = document.createElement("figcaption");
      const afterCaption = document.createElement("figcaption");

      // set the text of the captions
      beforeCaption.textContent = "before";
      afterCaption.textContent = "after";

      // append the captions to the figures
      beforeFigure.appendChild(beforeCaption);
      afterFigure.appendChild(afterCaption);

      // append the figures to the gallery-modal-images container
      galleryModalImagesContainer.appendChild(beforeFigure);
      galleryModalImagesContainer.appendChild(afterFigure);

      // play animation
      beforeAndAfterModalTimeline.restart();
    };

    // ---------- Design and layout -----------
    if(event.target.id === "design-and-layout") {
      // alert("design and layout");
      beforeAndAfterModalTimeline.restart();
    };

    // ---------- Ethnomusicology
    if(event.target.id === "ethnomusicology") {
      // alert("ethnomusicology");
      beforeAndAfterModalTimeline.restart();
    };

    // show the gallery modal
    galleryModal.classList.add("active");
  });
};

// add the modal close button functionality
galleryCloseButton.addEventListener("click", () => {
  gsap.timeline()
    .to(".gallery-modal-images", {opacity: 0})
    .to(".gallery-close-button", {opacity: 0}, "<")
    .to(".gallery-modal", {backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)"}, "<")
    .call(() => {
      // hide modal
      galleryModal.classList.remove("active");

      // remove images in gallery
      galleryModalImagesContainer.innerHTML = "";
    })
    .set(".gallery-modal-images", {opacity: 1})
    .set(".gallery-close-button", {opacity: 1}, "<")
    .set(".gallery-modal", {backdropFilter: "blur(8px)", backgroundColor: "rgba(0, 0, 0, 0.4)"}, "<")

  // stop the animation (if a user closes the modal while the animation is still playing)
  beforeAndAfterModalTimeline.kill();
});
