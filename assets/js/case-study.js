console.log("on the case study page!")

// ------------------- Elements -------------------
// for the slideshows
const wireframesSlides = document.querySelectorAll(".wireframes .slideshow img");
const digitalWireframesSlides = document.querySelectorAll(".digital-wireframes .slideshow img");
const highFidelitySlides = document.querySelectorAll(".high-fidelity-text .slideshow img");

// for the "final designs" gallery
let finalDesignsDesktopThumbnails = document.body.querySelectorAll(".final-designs .desktop-version img");
let finalDesignImage = document.body.querySelector(".final-design-image");
let finalDesignsMobileThumbnails = document.body.querySelectorAll(".final-designs .mobile-version img");


// ------------------- slideshow -------------------
class Slideshow {
  // ---------- constructor ----------
  // "arr" is an array of images
  constructor(arr) {
    this.slideNum = 0;
    this.slides = arr;
  };

  // ---------- methods ----------
  cycleSlides() {
    // Creating a slideshow: https://stackoverflow.com/questions/32222545/fade-transition-in-javascript-slide-show
    // 1. remove the "active" class from the current slide
    this.slides[this.slideNum].classList.remove("active");

    // 2. increase the slide number by 1
    this.slideNum++;

    // 3. check: if "slideNum" === the array's length, you're at the end of the array,
    // so start over at 0;
    if(this.slideNum === this.slides.length) {
      this.slideNum = 0;
    };
    
    this.slides[this.slideNum].classList.add("active");
  };

  // 4. add the "active" class to the current slide
  startSlideshow() {
    setInterval(() => this.cycleSlides(), 4500);
  };
};

// create instances of the slideshow for the "Starting the design" section
const wireframesSlideshow = new Slideshow(wireframesSlides);
const digitalSlideshow = new Slideshow(digitalWireframesSlides);
const highFidelitySlideshow = new Slideshow(highFidelitySlides);

// play the slideshow for each section
wireframesSlideshow.startSlideshow();
digitalSlideshow.startSlideshow();
highFidelitySlideshow.startSlideshow();


// ------------------- "Final Designs" gallery funtionality -------------------
// add an event listener to each thumbnail
// desktop version
for(let thumbnail of finalDesignsDesktopThumbnails){
  // when you click on a thumbnail, change the src and alt of the main image
  thumbnail.addEventListener("click", () => {
    // fadeout the previous image...
    finalDesignImage.classList.remove("active");

    // ...then swap in image and fade in
    setTimeout(() => {
      // swap image
      finalDesignImage.src = thumbnail.src;
      finalDesignImage.alt = thumbnail.alt;

      // fade in
      finalDesignImage.classList.add("active");
    }, 200);
    

    // remove any active states
    for(let thumbnail of finalDesignsDesktopThumbnails){
      thumbnail.classList.remove("active");
    };

    // add an active state to the button you clicked on
    thumbnail.classList.add("active");
  });
};

// mobile version
for(let thumbnail of finalDesignsMobileThumbnails){
  // when you click on a thumbnail, change the src and alt of the main image
  thumbnail.addEventListener("click", () => {
    finalDesignImage.src = thumbnail.src;
    finalDesignImage.alt = thumbnail.alt;

    // remove any active states
  for(let thumbnail of finalDesignsMobileThumbnails){
    thumbnail.classList.remove("active");
  };

  // add an active state to the button you clicked on
  thumbnail.classList.add("active");
  });
};







// ----------------------------------------------------------------------
// // targeted elements
// let tableOfContentsBtn = document.getElementById("table-of-contents-btn");
// let tableOfContents = document.getElementById("mobile-table-of-contents");
// let tableOfContentsLinks = document.querySelectorAll(".mobile-table-of-contents-links li")
// let downArrow = document.getElementById("down-arrow");
// let upArrow = document.getElementById("up-arrow");


// // ---------- Table of contents mobile functionality ----------
// tableOfContentsBtn.addEventListener("click", () => {
//   // on click, show the menu
//   tableOfContents.classList.toggle("show");

//   // hide the down arrow, show the up arrow
//   downArrow.classList.toggle("hide");
//   upArrow.classList.toggle("show");
// });

// // ---------- Table of contents link functionality ----------
// // loop through the table of contents links and add an eventlistener
// for(let i = 0; i < tableOfContentsLinks.length; i++) {
//   tableOfContentsLinks[i].addEventListener("click", () => {
//     // alert('you clicked on a link!');

//     // hide the table of contents
//     tableOfContents.classList.remove("show");

//     // hide the up arrow, show the down arrow
//     upArrow.classList.remove("show");
//     downArrow.classList.remove("hide");
//   })
// }