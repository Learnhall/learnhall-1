// Scroll detection
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Handle animations for the choose-us-info section
function handleChooseUsScroll() {
  const widgets = document.querySelectorAll(".choose-us-info .widget-box");
  const textElements = document.querySelectorAll(
    ".choose-us-info .text h2, .choose-us-info .text p"
  );

  // Check for visibility of each widget-box and text element individually
  widgets.forEach((widget, index) => {
    if (isInViewport(widget) && !widget.classList.contains("visible")) {
      widget.classList.add("visible"); // Trigger widget animation
      widget.style.setProperty("--widget-index", index); // Apply staggered delay
    }
  });

  textElements.forEach((el, index) => {
    if (isInViewport(el) && !el.classList.contains("visible")) {
      el.classList.add("visible"); // Trigger text animation
      el.style.animationDelay = `${index * 0.3}s`; // Apply staggered delay
    }
  });
}

// Handle animations for the video-testimonial section
function handleVideoScroll() {
  const section = document.querySelector(".video-testemonial");

  if (isInViewport(section)) {
    section.classList.add("active");

    // Remove scroll event listener for this section
    window.removeEventListener("scroll", handleVideoScroll);
  }
}

function handleServiceWorksScroll() {
  const steps = document.querySelectorAll(".service-works .step-box");

  steps.forEach((step, index) => {
    if (isInViewport(step) && !step.classList.contains("visible")) {
      // Add 'visible' class to start animation
      step.classList.add("visible");

      // Assign staggered delay
      step.style.setProperty("--step-index", index);
    }
  });
}

// Attach the scroll event listeners for all sections
window.addEventListener("scroll", handleChooseUsScroll);
window.addEventListener("scroll", handleVideoScroll);
window.addEventListener("scroll", handleServiceWorksScroll);
