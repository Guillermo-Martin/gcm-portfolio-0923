// ------------------- slideshow -------------------
export class Slideshow {
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
