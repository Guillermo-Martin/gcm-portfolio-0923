console.log("connected to kumiko music redesign!");

const allSections = document.querySelectorAll(".main-content-section");

allSections.forEach(section => {
  // get the section's h2
  const sectionHeader = document.querySelector(`#${section.id} h2`).textContent;
  const sectionId = section.id;

  // console.log(sectionHeader);
  // console.log(sectionId);

  // create a scrollTrigger for each of the sections
  ScrollTrigger.create({
    trigger: `#${sectionId}`,
    markers: true,
    start: "top 26.4%",
    end: "bottom 26.4%", // <-- refine this
    onEnter: () => {
      console.log(`${sectionHeader}`);
      // get current section
      const currentSectionTitle = document.querySelector(".current-section");

      // change it's textcontent
      currentSectionTitle.textContent = sectionHeader;
    },
    onEnterBack: () => {
      console.log(`${sectionHeader}`);
      // get current section
      const currentSectionTitle = document.querySelector(".current-section");

      // change it's textcontent
      currentSectionTitle.textContent = sectionHeader;
    },
  })
})

// for(let i = 0; i < allSections.lengt)

// ScrollTrigger.create({
//   trigger: ".main-content-section",
//   markers: true,
//   start: "top 26.4%"
// })

// scrollTrigger function
// const changeSectionTitle = () => {
//   // get the current section title
//   // const currentSection = document.querySelector(".current-section");


//   // console.log(currentSection);
// }

// gsap.to(".current-section", {
//   scrollTrigger: {
//     trigger: ".main-content-section",
//     markers: true,
//     start: "top 16.4%",
//     onEnter: () => console.log(section)
//   },
//   color: "red",
//   duration: 1
// })