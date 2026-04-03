// alert("on post op")
import { Slideshow } from "./Slideshow.js";

const highFidelitySlides = document.querySelectorAll(".high-fidelity-text .slideshow img");

const highFidelitySlideshow = new Slideshow(highFidelitySlides);

highFidelitySlideshow.startSlideshow();