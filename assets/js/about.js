console.log("connected to about!!!");

window.onload = () => {
  gsap.timeline()
    .set("body", {overflow: "hidden"})
    .from("h1", {opacity: 0, duration: 1, delay: 1.5})
    .from(".table-of-contents li", {pointerEvents: "none", opacity: 0, x: -10, stagger: 0.1, duration: 1}, "<1")
    .from(".main-content", {height: 0, duration: 1.5}, )
    .from(".main-content-section", {opacity: 0, duration: 1}, "<")
    .from(".navbar", {opacity: 0, duration: 1}, "<0.5")
    .from(".footer", {opacity: 0, duration: 1}, "<")
    .set("body", {overflow: "scroll"}, "<")
}
