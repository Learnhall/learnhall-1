$(function () {
  $("#radio-1").prop("checked", true);

  let context;
  const maxId = 8; // Total number of reviews
  let reviewsPerGroup = 3; // Default group size for large screens
  let currentGroupIndex = 0; // Track the current group index
  let useFastDelay = false; // Tracks whether to use fast delay for animations

  // Define boundaries for each button (button1 shows reviews 0,1,2; button2 shows 3,4,5; etc.)
  const buttonRanges = [
    { start: 0, end: 2 }, // Button 1: reviews 0, 1, 2
    { start: 3, end: 5 }, // Button 2: reviews 3, 4, 5
    { start: 6, end: 8 }, // Button 3: reviews 6, 7, 8
  ];

  // Function to determine screen size context
  function determineContext() {
    const width = $(window).width();
    if (width >= 1440) return "large-desktop";
    if (width >= 960) return "desktop";
    if (width >= 576) return "tablet";
    return "mobile";
  }

  // Function to calculate reviews per group based on the screen context
  function calculateReviewsPerGroup() {
    context = determineContext();

    if (context === "large-desktop" || context === "desktop") {
      reviewsPerGroup = 3;
    } else if (context === "tablet") {
      reviewsPerGroup = 2; // Randomizer when showing 2 reviews
    } else {
      reviewsPerGroup = 1; // Randomizer for mobile when showing 1 review
    }
  }

  // Function to randomize the review selection
  function randomizeReviews() {
    const startIndex = buttonRanges[currentGroupIndex].start;
    const endIndex = buttonRanges[currentGroupIndex].end;

    let reviewsToShow = [];
    if (reviewsPerGroup === 3) {
      let randomizedIds = [];

      // Select reviews within the specified range for the current button
      for (let i = startIndex; i <= endIndex; i++) {
        randomizedIds.push(i);
      }

      // Randomize reviews within the selected range
      randomizedIds = shuffle(randomizedIds);
      reviewsToShow = randomizedIds.slice(0, 3); // Ensure 3 reviews are selected per button
    } else if (reviewsPerGroup === 2 || reviewsPerGroup === 1) {
      // Handle mobile and tablet views (1 or 2 reviews)
      let randomizedIds = [];
      for (let i = startIndex; i <= endIndex; i++) {
        randomizedIds.push(i);
      }

      randomizedIds = shuffle(randomizedIds);
      reviewsToShow = randomizedIds.slice(0, reviewsPerGroup);
    }

    // Show the selected reviews and apply animation with individual delays
    $(".content").each(function () {
      const currentId = parseInt($(this).attr("id"));

      if (reviewsToShow.includes(currentId)) {
        $(this)
          .show()
          .css("opacity", "1")
          .addClass("visible")
          .get(0).style.animationDelay = useFastDelay
          ? `${currentId * 0.0}s`
          : `calc(${currentId * 0.4}s + 0.3s)`; // Individual delay for animation
      } else {
        $(this).css("opacity", "0").hide().removeClass("visible");
      }
    });
  }

  // Function to reload the content on page resize or context change
  function reload() {
    calculateReviewsPerGroup();
    $(window).resize(function () {
      const newContext = determineContext();
      if (newContext !== context) {
        calculateReviewsPerGroup();
        randomizeReviews();
      }
    });
  }

  reload();

  // Button click event for selecting reviews per group and applying randomization
  $(".radio-buttons .custom-radio-btn input").click(function () {
    const radioIndex = $(".radio-buttons .custom-radio-btn input").index(this);
    currentGroupIndex = radioIndex;
    useFastDelay = true; // Enable fast delay for animations
    randomizeReviews();
  });

  // Helper function to shuffle the review IDs array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
    return array;
  }

  // Function to check if an element is in the viewport for animation triggers
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle scroll events for when content becomes visible
  function handleParentReviewsScroll() {
    const textElements = document.querySelectorAll(
      ".parent-reviews .text-1 h2, .parent-reviews .text-1 p"
    );
    textElements.forEach((el, index) => {
      if (isInViewport(el) && !el.classList.contains("visible")) {
        el.classList.add("visible");
        el.style.animationDelay = `${index * 0.0}s`;
      }
    });

    const reviewContents = document.querySelectorAll(
      ".parent-reviews .content"
    );
    reviewContents.forEach((content, index) => {
      if (isInViewport(content) && !content.classList.contains("visible")) {
        content.classList.add("visible");
        content.style.setProperty("--review-index", index);
        content.style.animationDelay = useFastDelay
          ? `${index * 0.0}s`
          : `calc(${index * 0.4}s + 0.3s)`;
      }
    });
  }

  document.addEventListener("scroll", handleParentReviewsScroll);
});
