console.log("in weathertrends");

import { Slideshow } from "./Slideshow.js";

// get the images for each slideshow
const userOnboardingSlides = document.querySelectorAll(".user-onboarding .slideshow img");
const improvingNavigationSlides = document.querySelectorAll(".improving-navigation .slideshow img");
const responsiveExperiencesSlides = document.querySelectorAll(".responsive-experiences .slideshow.responsive-screens img");
const watchDesignSlides = document.querySelectorAll(".watch-design .slideshow img");
const mapsAndControlsSlides = document.querySelectorAll(".maps-and-controls .slideshow img");
const historicalDataSlides = document.querySelectorAll(".historical-data .slideshow img");

console.log(responsiveExperiencesSlides)

// create a new slideshow
const userOnboardingSlideshow = new Slideshow(userOnboardingSlides);
const improvingNavigationSlideshow = new Slideshow(improvingNavigationSlides);
const responsiveExperiencesSlideshow = new Slideshow(responsiveExperiencesSlides);
const watchDesignSlideshow = new Slideshow(watchDesignSlides);
const mapsAndControlsSlideshow = new Slideshow(mapsAndControlsSlides);
const historicalDataSlideshow = new Slideshow(historicalDataSlides);

// run the slideshow
userOnboardingSlideshow.startSlideshow();
improvingNavigationSlideshow.startSlideshow();
responsiveExperiencesSlideshow.startSlideshow();
watchDesignSlideshow.startSlideshow();
mapsAndControlsSlideshow.startSlideshow();
historicalDataSlideshow.startSlideshow();
