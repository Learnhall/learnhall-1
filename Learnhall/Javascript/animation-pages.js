//Clones review cards automatically for the slider
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("Tigard.html")) {
    const row = document.querySelector(".row-reviews");
    if (row) {
      const clone = row.innerHTML;
      row.innerHTML += clone;
    }
  }
});