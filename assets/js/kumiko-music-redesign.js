console.log("connected to kumiko music redesign!");

// ---------- Page load animation function ----------
const init = () => {
  gsap.timeline()
    .from("body", {autoAlpha: 0})
    .to("body", {backgroundColor: "#000", duration: 1})
    .set("body", {overflow: "hidden"})
    .from("h1", {opacity: 0, y: 10, duration: 0.7})
    .from(".table-of-contents li", {pointerEvents: "none", opacity: 0, x: -10, stagger: 0.1, duration: 1}, "<1")
    .from(".additional-info", {opacity: 0, y: 10, duration: 0.7}, "<1")
    .from(".main-content-section", {opacity: 0, stagger: 0.1, duration: 1})
    .from(".navbar", {opacity: 0, duration: 1}, "<0.5")
    .from(".mobile-nav-icon", {opacity: 0, pointerEvents: "none", duration: 0.7}, "<")
    .from(".footer", {opacity: 0, duration: 1}, "<")
    .set("body", {overflow: "scroll"}, "<")
}

// ----- Do animation when page elements load -----
window.addEventListener("load", () => {
  init();
});


// ---------- Fade in section animation (767px and below) ----------
mm.add("(max-width: 767px", () => {
  // scrollTrigger fadeIn animation (for mobile)
  const allSections = document.querySelectorAll(".main-content-section");

  allSections.forEach(section => {
    // get the section's h2 and section id
    const sectionHeader = document.querySelector(`#${section.id} h2`).textContent;
    const sectionId = section.id;

    // fade in animation function
    const fadeInLeft = () => {
      // get current section
      const currentSectionTitle = document.querySelector(".current-section");

      // change it's textcontent
      currentSectionTitle.textContent = sectionHeader;

      // fade in animation
      gsap.timeline()
        .set(".current-section", {opacity: 0, x: -10})
        .to(".current-section", {opacity: 1, x: 0, duration: 0.8})
    };

    // create a scrollTrigger for each of the sections
    ScrollTrigger.create({
      trigger: `#${sectionId}`,
      markers: true,
      start: "top 26.4%",
      end: "bottom 75%",
      onEnter: fadeInLeft,
      onEnterBack: fadeInLeft
    });
  });
}); 
