$(".become-a-tutor-form").submit(function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  var form = $(this);
  var isValid = true;

  // Clear all error messages before validation
  $(".error-messages").text("").addClass("hidden"); // Hide and clear previous error messages

  // Validate each field
  isValid &= validateField("#first-name-1", /^.+$/, "First name is required."); // Allows any non-empty value
  isValid &= validateField("#last-name-1", /^.+$/, "Last name is required."); // Allows any non-empty value
  isValid &= validateField(
    "#email-1",
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email address."
  );
  isValid &= validateField(
    "#phone-1",
    /^[0-9+\-\s()]{6,}$/,
    "Please enter a valid phone number."
  ); // Accepts international phone numbers with at least 6 characters
  isValid &= validateField("#location-1", /^.+$/, "Location is required."); // Allows any non-empty value
  isValid &= validateField(
    "#zip-code-1",
    /^[0-9a-zA-Z\s\-]{3,}$/,
    "Please enter a valid postal code."
  ); // Handles alphanumeric postal codes globally (e.g., UK, Canada)
  isValid &= validateField("#student-grade-1", /^.+$/, "Grade is required."); // Allows any non-empty value
  isValid &= validateField("#about-yourself-1", /^.+$/, "Subject is required."); // Allows any non-empty value
  isValid &= validateField("#experience-1", /^.+$/, "Experience is required."); // Allows any non-empty value

  // Stop the form submission if the form is invalid
  if (!isValid) {
    const blurSectionElement = document.querySelector(".error-background");
    blurSectionElement.classList.remove("none"); // Show the thank-you section
    return; // Stop further processing
  }

  // Proceed with AJAX request to submit form
  $.ajax({
    url: form.attr("action"), // Endpoint to send data
    type: form.attr("method"), // Request type (GET/POST)
    data: form.serialize(), // Serialize form data for submission
    success: function (response) {
      // Show thank-you message and blur background
      const blurSectionElement = document.querySelector(
        ".thank-you-background"
      );
      blurSectionElement.classList.remove("none"); // Show the thank-you section

      form[0].reset(); // Reset the form after successful submission
    },
    error: function (xhr, textStatus) {
      if (xhr.status === 200 || textStatus === "error") {
        const blurSectionElement = document.querySelector(
          ".thank-you-background"
        );
        blurSectionElement.classList.remove("none"); // Show the thank-you section
        form[0].reset();
      } else {
        alert("There was an error processing your request. Please try again.");
      }
    },
  });
});

// Close thank-you and error message on clicking the close button
const closeHamburgerElement = document.querySelector(".close-hamburger img");
const blurSectionElement1 = document.querySelector(".thank-you-background");
const blurSectionElement2 = document.querySelector(".error-background");

document.querySelectorAll(".close-hamburger img").forEach((closeElement) => {
  closeElement.addEventListener("click", () => {
    document.querySelector(".thank-you-background").classList.add("none");
    document.querySelector(".error-background").classList.add("none");
  });
});

// Field validation function
function validateField(selector, regex, errorMessage) {
  var field = $(selector);
  var value = field.val().trim();
  var errorElement = $(`${selector}-error`);

  // If validation fails
  if (!regex.test(value)) {
    errorElement.text(errorMessage).removeClass("hidden"); // Display error message
    field.addClass("error-field"); // Add red border to the field
    return false;
  }

  // If validation passes
  errorElement.text("").addClass("hidden"); // Hide error message
  field.removeClass("error-field"); // Remove red border
  return true;
}
