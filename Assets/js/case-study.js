// targeted elements
let tableOfContentsBtn = document.getElementById("table-of-contents-btn");
let tableOfContents = document.getElementById("mobile-table-of-contents");
let downArrow = document.getElementById("down-arrow");
let upArrow = document.getElementById("up-arrow");

// ---------- Table of contents mobile functionality ----------
tableOfContentsBtn.addEventListener("click", () => {
  // alert("you clicked on the button!");

  // on click, show the menu
  tableOfContents.classList.toggle("show");

  // hide the down arrow, show the up arrow
  downArrow.classList.toggle("hide");
  upArrow.classList.toggle("show");

});
