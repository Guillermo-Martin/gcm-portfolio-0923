// targeted elements
let tableOfContentsBtn = document.getElementById("table-of-contents");
let tableOfContents = document.getElementById("mobile-table-of-contents");

// ---------- Table of contents mobile functionality ----------
tableOfContentsBtn.addEventListener("click", () => {
  // alert("you clicked on the button!");

  // on click, show the menu
  tableOfContents.classList.add("show");

});
