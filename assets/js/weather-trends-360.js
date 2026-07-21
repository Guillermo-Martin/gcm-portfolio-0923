console.log("in weathertrends");

import { Slideshow } from "./Slideshow.js";

// get the images for each slideshow
const userOnboardingSlides = document.querySelectorAll(".user-onboarding .slideshow img");
const responsiveExperiencesSlides = document.querySelectorAll(".responsive-experiences .slideshow img");
const watchDesignSlides = document.querySelectorAll(".watch-design .slideshow img");
const mapsAndControlsSlides = document.querySelectorAll(".maps-and-controls .slideshow img");
const historicalDataSlides = document.querySelectorAll(".historical-data .slideshow img");

// create a new slideshow
const userOnboardingSlideshow = new Slideshow(userOnboardingSlides);
const responsiveExperiencesSlideshow = new Slideshow(responsiveExperiencesSlides);
const watchDesignSlideshow = new Slideshow(watchDesignSlides);
const mapsAndControlsSlideshow = new Slideshow(mapsAndControlsSlides);
const historicalDataSlideshow = new Slideshow(historicalDataSlides);

// run the slideshow
userOnboardingSlideshow.startSlideshow();
responsiveExperiencesSlideshow.startSlideshow();
watchDesignSlideshow.startSlideshow();
mapsAndControlsSlideshow.startSlideshow();
historicalDataSlideshow.startSlideshow();
