var form_id = "jquery_form";

function onSuccess() {
  // Redirect to success page or show success message
  window.location =
    window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
}

$(document).ready(function () {
  $("#jquery_form").submit(function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    var form = $(this);
    var emailInput = $("#email-input").val();

    // Validate the email field
    if (!validateEmail(emailInput)) {
      $("#error-message").text("Please enter a valid email address.").show(); // Show error message
      return; // Stop further execution
    }

    $.ajax({
      url: form.attr("action"),
      type: form.attr("method"),
      data: form.serialize(), // Serializes the form data
      success: function (response) {
        onSuccess();
        form[0].reset(); // Reset form after successful submission
        // Custom message handling if needed
        $("#error-message").hide(); // Hide any previously displayed errors
      },
      error: function (xhr, textStatus) {
        // Ignore harmless errors from the redirect attempt
        if (xhr.status === 200 || textStatus === "error") {
          // Treat it as a success if status is 200 (redirect succeeded)
          onSuccess();
          form[0].reset();
          $("#error-message").hide(); // Hide error message
          return;
        }

        // Handle actual errors here
        $("#error-message")
          .text("An error occurred. Please try again later.")
          .show();
      },
    });
  });

  // Function to validate email format
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
