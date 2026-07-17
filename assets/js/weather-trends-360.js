console.log("in weathertrends");

import { Slideshow } from "./Slideshow.js";

// get the images for each slideshow
const readabilitySlides = document.querySelectorAll(".readability .slideshow img");
const clearLanguageSlides = document.querySelectorAll(".clearer-language .slideshow img");
const homepageSlides = document.querySelectorAll(".homepage .slideshow img");
const responsiveSlides = document.querySelectorAll(".responsive-design .slideshow img");
const dashboardSlides = document.querySelectorAll(".user-dashboard .slideshow img");
const easierNavSlides = document.querySelectorAll(".easier-nav .slideshow img");
const quickAddSlides = document.querySelectorAll(".quick-add .slideshow img");
const finalHifiPrototypeSlides = document.querySelectorAll(".final-hifi-prototype .slideshow img");

// ---------------------------------------------------
const userOnboardingSlides = document.querySelectorAll(".user-onboarding .slideshow img");

// console.log("useronboarding", userOnboardingSlides)



// ---------------------------------------------------





// create a new slideshow
const readabilitySlideshow = new Slideshow(readabilitySlides);
const clearLanguageSlideshow = new Slideshow(clearLanguageSlides);
const homepageSlideshow = new Slideshow(homepageSlides);
const responsiveSlideshow = new Slideshow(responsiveSlides);
const dashboardSlideshow = new Slideshow(dashboardSlides);
const easierNavSlideshow = new Slideshow(easierNavSlides);
const quickAddSlideshow = new Slideshow(quickAddSlides);
const finalHifiPrototypeSlideshow = new Slideshow(finalHifiPrototypeSlides);


// ---------------------------------------------------
const userOnboardingSlideshow = new Slideshow(userOnboardingSlides);


// ---------------------------------------------------

// run the slideshow
readabilitySlideshow.startSlideshow();
clearLanguageSlideshow.startSlideshow();
homepageSlideshow.startSlideshow();
responsiveSlideshow.startSlideshow();
dashboardSlideshow.startSlideshow();
easierNavSlideshow.startSlideshow();
quickAddSlideshow.startSlideshow();
finalHifiPrototypeSlideshow.startSlideshow();


// ---------------------------------------------------
userOnboardingSlideshow.startSlideshow();


// ---------------------------------------------------