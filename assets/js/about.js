console.log("connected!!!");

// register scrollToPlugin
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// gsap.to(window, { duration: 2, scrollTo: 400 });

// get all of the table of contents link
const tocLinkArr = document.querySelectorAll(".table-of-contents-link");

// loop through the table of contents links and add an eventlistener
for(let i = 0; i < tocLinkArr.length; i++) {
  // add event listener
  tocLinkArr[i].addEventListener("click", () => {
    // get the section id to scroll to
    let sectionId = tocLinkArr[i].dataset.section;

    // when user clicks on the link, scroll to that section
    gsap.to(window, { duration: 1, scrollTo: `#${sectionId}` });
  });

  // add the scrollTrigger animation
};

// scrolltrigger animations
gsap.to(".table-of-contents-link[data-section='experience']", {
  scrollTrigger: {
    trigger: "#experience",
    start: "top 35%",
    end: "bottom 50%",
    markers: true,
    toggleClass: {targets: ".table-of-contents-link[data-section='experience']", className: "active"}
  }
})