function focusEdgeStyle(e) {
  e.target.nextSibling.classList.remove("hidden");
  e.target.nextSibling.classList.add("inline-block");
}
function blurEdgeStyle(e) {
  e.target.nextSibling.classList.remove("inline-block");
  // e.target.nextSibling.classList.add("hidden");
}
export { focusEdgeStyle, blurEdgeStyle };
