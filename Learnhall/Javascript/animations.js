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

// Handle animations for the parent-reviews section
function handleParentReviewsScroll() {
  const textElements = document.querySelectorAll(
    ".parent-reviews .text-1 h2, .parent-reviews .text-1 p"
  );
  const reviewContents = document.querySelectorAll(".parent-reviews .content");

  // Animate text elements only when they come into the viewport
  textElements.forEach((el, index) => {
    if (isInViewport(el) && !el.classList.contains("visible")) {
      el.classList.add("visible");
      el.style.animationDelay = `${index * 0.3}s`;
    }
  });

  // Animate review contents only when they come into the viewport
  reviewContents.forEach((content, index) => {
    if (isInViewport(content) && !content.classList.contains("visible")) {
      content.classList.add("visible");
      content.style.setProperty("--review-index", index);
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
window.addEventListener("scroll", handleParentReviewsScroll);
window.addEventListener("scroll", handleVideoScroll);
window.addEventListener("scroll", handleServiceWorksScroll);
