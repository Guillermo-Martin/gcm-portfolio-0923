console.log("in bakery board");

import { Slideshow } from "./Slideshow.js";

// get the images for each slideshow
const readabilitySlides = document.querySelectorAll(".readability .slideshow img");
const clearLanguageSlides = document.querySelectorAll(".clearer-language .slideshow img");
const homepageSlides = document.querySelectorAll(".homepage .slideshow img");
const responsiveSlides = document.querySelectorAll(".responsive-design .slideshow img");
const dashboardSlides = document.querySelectorAll(".user-dashboard .slideshow img");
const easierNavSlides = document.querySelectorAll(".easier-nav .slideshow img");
const quickAddSlides = document.querySelectorAll(".quick-add .slideshow img");

// create a new slideshow
const readabilitySlideshow = new Slideshow(readabilitySlides);
const clearLanguageSlideshow = new Slideshow(clearLanguageSlides);
const homepageSlideshow = new Slideshow(homepageSlides);
const responsiveSlideshow = new Slideshow(responsiveSlides);
const dashboardSlideshow = new Slideshow(dashboardSlides);
const easierNavSlideshow = new Slideshow(easierNavSlides);
const quickAddSlideshow = new Slideshow(quickAddSlides);

// run the slideshow
readabilitySlideshow.startSlideshow();
clearLanguageSlideshow.startSlideshow();
homepageSlideshow.startSlideshow();
responsiveSlideshow.startSlideshow();
dashboardSlideshow.startSlideshow();
easierNavSlideshow.startSlideshow();
quickAddSlideshow.startSlideshow();
