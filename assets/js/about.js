console.log("connected!!!");

// register scrollToPlugin
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// get all of the table of contents link
const tocLinkArr = document.querySelectorAll(".table-of-contents-link");

// loop through the table of contents links and add an eventlistener
for(let i = 0; i < tocLinkArr.length; i++) {
  // get the section id to scroll to and define the scrollTrigger target
  let sectionId = tocLinkArr[i].dataset.section;
  let scrollTriggerTarget = `.table-of-contents-link[data-section='${sectionId}']`;

  // add event listener
  tocLinkArr[i].addEventListener("click", () => {
    // when user clicks on the link, scroll to that section
    gsap.to(window, { duration: 1, scrollTo: `#${sectionId}` });
  });

  // add the scrollTrigger "active" link animation
  gsap.to(scrollTriggerTarget, {
    scrollTrigger: {
      trigger: `#${sectionId}`,
      start: "top 35%",
      end: "bottom 50%",
      toggleClass: {targets: scrollTriggerTarget, className: "active"}
    }
  });
};