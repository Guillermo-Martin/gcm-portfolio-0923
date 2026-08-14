import { Slideshow } from "./Slideshow.js";

// ------------------- Elements -------------------
// for the slideshows
const highFidelitySlides = document.querySelectorAll(".high-fidelity-text .slideshow img");
const wireframesSlides = document.querySelectorAll(".wireframes .slideshow img");
const digitalWireframesSlides = document.querySelectorAll(".digital-wireframes .slideshow img");

// for the "final designs" gallery
let finalDesignsDesktopThumbnails = document.body.querySelectorAll(".final-designs .desktop-version img");
let finalDesignImage = document.body.querySelector(".final-design-image");
let finalDesignsMobileThumbnails = document.body.querySelectorAll(".final-designs .mobile-version img");


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
    // 1. remove the "active" class on the finalDesignImage (will cause the image to fade out)
    finalDesignImage.classList.remove("active");

    // transitionend:  https://jh3y.medium.com/using-transition-events-in-javascript-883f2e8588d9
    // transitionend:  https://www.brucebrotherton.com/blog/transitions-and-event-listeners/#:~:text=TL;DR,Read%20on.
    finalDesignImage.addEventListener("transitionend", (event) => {
      // 2. check to see see if the opacity transition has finished (we only care about the "opacity" property)
      if(event.propertyName === "opacity"){

        // 3. if it has, change the image and alt tag
        finalDesignImage.src = thumbnail.src;
        finalDesignImage.alt = thumbnail.alt;

        // 4. then add the "active" class to fade in the image
        finalDesignImage.classList.add("active");
      } else {
        // otherwise, do nothing
        return;
      };
    }, { once: true });

    // 5. remove any active states fom the thumbnails
    for(let thumbnail of finalDesignsDesktopThumbnails){
      thumbnail.classList.remove("active");
    };

    // 6. add an "active" state to the thumbnail you clicked on
    thumbnail.classList.add("active");
  });
};

// mobile version
for(let thumbnail of finalDesignsMobileThumbnails){
  // when you click on a thumbnail, change the src and alt of the main image
  thumbnail.addEventListener("click", () => {
    // 1. remove the "active" class on the finalDesignImage (will cause the image to fade out)
    finalDesignImage.classList.remove("active");

    // transitionend:  https://jh3y.medium.com/using-transition-events-in-javascript-883f2e8588d9
    // transitionend:  https://www.brucebrotherton.com/blog/transitions-and-event-listeners/#:~:text=TL;DR,Read%20on.
    finalDesignImage.addEventListener("transitionend", (event) => {
      // 2. check to see see if the opacity transition has finished (we only care about the "opacity" property)
      if(event.propertyName === "opacity"){

        // 3. if it has, change the image and alt tag
        finalDesignImage.src = thumbnail.src;
        finalDesignImage.alt = thumbnail.alt;

        // 4. then add the "active" class to fade in the image
        finalDesignImage.classList.add("active");
      } else {
        // otherwise, do nothing
        return;
      };
    }, { once: true });

    // 5. remove any active states fom the thumbnails
    for(let thumbnail of finalDesignsMobileThumbnails){
      thumbnail.classList.remove("active");
    };

    // 6. add an "active" state to the thumbnail you clicked on
    thumbnail.classList.add("active");
  });
};
