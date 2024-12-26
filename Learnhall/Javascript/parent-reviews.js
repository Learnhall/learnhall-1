$(function () {
  let useFastDelay = false; // Tracks whether to use fast delay for animations
  let context;
  let nextId, previouseId, maxId;

  function determineContext() {
    const width = $(window).width();
    if (width >= 1440) return "large-desktop";
    if (width >= 960) return "desktop";
    if (width >= 576) return "tablet";
    return "mobile";
  }

  function reload() {
    context = determineContext();

    $(window).resize(function () {
      const newContext = determineContext();

      if (newContext !== context) {
        context = newContext;
        location.reload();
      }
    });
  }

  reload();

  function show_content() {
    if ($(window).width() >= 960) {
      nextId = 2;
      previouseId = 0;
      maxId = 8; // Adjust based on content
    } else if ($(window).width() >= 576) {
      nextId = 1;
      previouseId = 0;
      maxId = 8; // Adjust based on content
    } else {
      nextId = 0;
      previouseId = 0;
      maxId = 8; // Adjust based on content
    }
  }

  show_content();

  $(".next").click(function () {
    if (nextId >= maxId - 1) return;

    useFastDelay = true; // Enable fast delay for animations

    $(".content").each(function () {
      const currentId = parseInt($(this).attr("id"));

      if (currentId === previouseId) {
        $(this).css("opacity", "0").hide().removeClass("visible");
      }

      if (currentId === nextId + 1) {
        $(this).show().css("opacity", "1").addClass("visible");
        $(this).get(0).style.animationDelay = `${(nextId + 1) * 0.0}s`;
      }
    });

    previouseId++;
    nextId++;
  });

  $(".previous").click(function () {
    if (previouseId <= 0) return;

    useFastDelay = true; // Enable fast delay for animations

    $(".content").each(function () {
      const currentId = parseInt($(this).attr("id"));

      if (currentId === nextId) {
        $(this).css("opacity", "0").hide().removeClass("visible");
      }

      if (currentId === previouseId - 1) {
        $(this).show().css("opacity", "1").addClass("visible");
        $(this).get(0).style.animationDelay = `${(previouseId - 1) * 0.0}s`;
      }
    });

    previouseId--;
    nextId--;
  });

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
