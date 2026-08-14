console.log("on kumi page")

import { Slideshow } from "./Slideshow.js";

// get the images for the "navigation" slideshow
const navigationSlides = document.querySelectorAll(".navigation .slideshow img");
const designSlides = document.querySelectorAll(".design-and-layout .slideshow img");
const readabilitySlides = document.querySelectorAll(".readability .slideshow img");

// create a new slideshow
const navSlideshow = new Slideshow(navigationSlides);
const designSlideshow = new Slideshow(designSlides);
const readabilitySlideshow = new Slideshow(readabilitySlides);

// run the slideshow
navSlideshow.startSlideshow();
designSlideshow.startSlideshow();
readabilitySlideshow.startSlideshow();
