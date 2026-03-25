console.log("on the case study page!")



// elements
let finalDesignsDesktopThumbnails = document.body.querySelectorAll(".final-designs .desktop-version img");
let finalDesignImage = document.body.querySelector(".final-design-image");
let finalDesignsMobileThumbnails = document.body.querySelectorAll(".final-designs .mobile-version img");

// add an event listener to each thumbnail
// desktop version
for(let thumbnail of finalDesignsDesktopThumbnails){
  // when you click on a thumbnail, change the src and alt of the main image
  thumbnail.addEventListener("click", () => {
    finalDesignImage.src = thumbnail.src;
    finalDesignImage.alt = thumbnail.alt;

    // remove any active states
    for(let thumbnail of finalDesignsDesktopThumbnails){
      thumbnail.classList.remove("active");
    };

    // add an active state to the button you clicked on
    thumbnail.classList.add("active");
  });
};

// mobile version
for(let thumbnail of finalDesignsMobileThumbnails){
  // when you click on a thumbnail, change the src and alt of the main image
  thumbnail.addEventListener("click", () => {
    finalDesignImage.src = thumbnail.src;
    finalDesignImage.alt = thumbnail.alt;

    // remove any active states
  for(let thumbnail of finalDesignsMobileThumbnails){
    thumbnail.classList.remove("active");
  };

  // add an active state to the button you clicked on
  thumbnail.classList.add("active");
  });
};

// ----------------------------------------------------------------------
// // targeted elements
// let tableOfContentsBtn = document.getElementById("table-of-contents-btn");
// let tableOfContents = document.getElementById("mobile-table-of-contents");
// let tableOfContentsLinks = document.querySelectorAll(".mobile-table-of-contents-links li")
// let downArrow = document.getElementById("down-arrow");
// let upArrow = document.getElementById("up-arrow");


// // ---------- Table of contents mobile functionality ----------
// tableOfContentsBtn.addEventListener("click", () => {
//   // on click, show the menu
//   tableOfContents.classList.toggle("show");

//   // hide the down arrow, show the up arrow
//   downArrow.classList.toggle("hide");
//   upArrow.classList.toggle("show");
// });

// // ---------- Table of contents link functionality ----------
// // loop through the table of contents links and add an eventlistener
// for(let i = 0; i < tableOfContentsLinks.length; i++) {
//   tableOfContentsLinks[i].addEventListener("click", () => {
//     // alert('you clicked on a link!');

//     // hide the table of contents
//     tableOfContents.classList.remove("show");

//     // hide the up arrow, show the down arrow
//     upArrow.classList.remove("show");
//     downArrow.classList.remove("hide");
//   })
// }