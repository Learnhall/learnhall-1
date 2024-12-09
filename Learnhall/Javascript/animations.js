// Scroll detection
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Handle animations for the choose-us-info section
function handleChooseUsScroll() {
  const section = document.querySelector(".choose-us-info");
  const widgets = document.querySelectorAll(".widget-box");
  const textElements = document.querySelectorAll(".text h2, .text p");

  if (isInViewport(section)) {
    section.classList.add("active");

    // Animate text elements
    textElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.3}s`;
    });

    // Animate widgets with staggered delay
    widgets.forEach((widget, index) => {
      widget.style.setProperty("--widget-index", index);
    });

    // Remove scroll event listener for this section
    window.removeEventListener("scroll", handleChooseUsScroll);
  }
}

// Handle animations for the parent-reviews section
function handleParentReviewsScroll() {
  const section = document.querySelector(".parent-reviews");
  const textElements = document.querySelectorAll(
    ".parent-reviews .text-1 h2, .parent-reviews .text-1 p"
  );
  const reviewContents = document.querySelectorAll(".parent-reviews .content");

  if (isInViewport(section)) {
    section.classList.add("active");

    // Animate text elements
    textElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.3}s`;
    });

    // Animate reviews with staggered delay
    reviewContents.forEach((content, index) => {
      content.style.setProperty("--review-index", index);
    });

    // Remove scroll event listener for this section
    window.removeEventListener("scroll", handleParentReviewsScroll);
  }
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
  const section = document.querySelector(".service-works");
  const steps = document.querySelectorAll(".service-works .step-box");

  if (isInViewport(section) && !section.classList.contains("active")) {
    // Mark section as active to prevent re-triggering
    section.classList.add("active");

    // Apply staggered animations to steps
    steps.forEach((step, index) => {
      step.style.setProperty("--step-index", index); // Assign stagger delay
    });
  }
}

// Attach the scroll event listeners for all sections
window.addEventListener("scroll", handleChooseUsScroll);
window.addEventListener("scroll", handleParentReviewsScroll);
window.addEventListener("scroll", handleVideoScroll);
window.addEventListener("scroll", handleServiceWorksScroll);
