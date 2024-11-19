console.log("connected to kumiko music redesign!");

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
