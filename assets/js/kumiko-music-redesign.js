console.log("connected to kumiko music redesign!");

// get all sections
const allSections = document.querySelectorAll(".main-content-section");

// function to run when section is observed
const observerFunction = (entries) => {
  // for each section, check to see if it is intersecting the viewport
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      // Do something when the section enters the viewport
      console.log('Section entered:', entry.target);
    };
  });
};

// create an intersection observer
const observer = new IntersectionObserver(observerFunction);

// for each section, observe when it enters the viewport
allSections.forEach(section => {
  observer.observe(section);
});