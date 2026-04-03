import { Slideshow } from "./Slideshow.js";

// get the images for the "inspiration" slideshow
const inspirationSlides = document.querySelectorAll(".inspiration .slideshow img");

// create a new slideshow
const inspirationSlidesshow = new Slideshow(inspirationSlides);

// run the slideshow
inspirationSlidesshow.startSlideshow();
