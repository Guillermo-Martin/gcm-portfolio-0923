console.log("in bakery board");

import { Slideshow } from "./Slideshow.js";

// get the images for each slideshow
const readabilitySlides = document.querySelectorAll(".readability .slideshow img");
const clearLanguageSlides = document.querySelectorAll(".clearer-language .slideshow img");
const homepageSlides = document.querySelectorAll(".homepage .slideshow img");
const responsiveSlides = document.querySelectorAll(".responsive-design .slideshow img");

// create a new slideshow
const readabilitySlideshow = new Slideshow(readabilitySlides);
const clearLanguageSlideshow = new Slideshow(clearLanguageSlides);
const homepageSlideshow = new Slideshow(homepageSlides);
const responsiveSlideshow = new Slideshow(responsiveSlides);

// run the slideshow
readabilitySlideshow.startSlideshow();
clearLanguageSlideshow.startSlideshow();
homepageSlideshow.startSlideshow();
responsiveSlideshow.startSlideshow();
