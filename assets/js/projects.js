console.log("connected to projects!!!");

// ---------- Page load animation function ----------
const init = () => {
  gsap.timeline()
    .set("body", {overflow: "hidden"})
    .from("body", {autoAlpha: 0}, "<")
    .from("h1", {opacity: 0, y: 10, duration: 0.7})
    .from(".table-of-contents li", {pointerEvents: "none", opacity: 0, x: -10, stagger: 0.1, duration: 1}, "<1")
    .from(".main-content", {opacity: 0, duration: 0.5})
    .from(".main-content-section", {opacity: 0, duration: 0.5}, "<0.4")
    .from(".navbar", {opacity: 0, duration: 1}, "<0.5")
    .from(".mobile-nav-icon", {opacity: 0, pointerEvents: "none", duration: 0.7}, "<")
    .from(".footer", {opacity: 0, duration: 1}, "<")
    .set("body", {overflow: "scroll"}, "<")
}

// ----- Do animation when page elements load -----
window.addEventListener("load", () => {
  init();
});
