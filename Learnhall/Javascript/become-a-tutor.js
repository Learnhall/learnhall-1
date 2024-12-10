// Shared object to store form values
let sharedFormValues = {};

document.addEventListener("DOMContentLoaded", () => {
  const blurSectionElement = document.querySelector(".thank-you-background");
  const closeHamburgerElement = document.querySelector(".close-hamburger img");
  const inputsElement = document.querySelectorAll("input");
  const textareaElement = document.querySelectorAll("textarea");

  document
    .querySelector(".become-a-tutor-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      // Store form values in the shared object
      sharedFormValues = {
        firstName: document.getElementById("first-name-1").value || "N/A",
        lastName: document.getElementById("last-name-1").value || "N/A",
        email: document.getElementById("email-1").value || "N/A",
        phone: document.getElementById("phone-1").value || "N/A",
        location: document.getElementById("location-1").value || "N/A",
        zipCode: document.getElementById("zip-code-1").value || "N/A",
        studentGrade: document.getElementById("student-grade-1").value || "N/A",
        studentSubject:
          document.getElementById("student-subject-1").value || "N/A",
        aboutYourself:
          document.getElementById("about-yourself-1").value || "N/A",
        experience: document.getElementById("experience-1").value || "N/A",
      };

      // Clear form fields
      inputsElement.forEach((input) => (input.value = ""));
      textareaElement.forEach((textarea) => (textarea.value = ""));
    });

  closeHamburgerElement.addEventListener("click", () => {
    blurSectionElement.classList.add("none");
  });
});

$(document).ready(function () {
  emailjs.init("t_Ula836MT-Gtn7Nz"); // Initialize EmailJS with your public key

  $(".become-a-tutor-form").submit(function (event) {
    event.preventDefault(); // Prevent default form submission

    sendForm(sharedFormValues); // Use the shared form values to send an email
  });
});

function sendForm(formData) {
  const serviceID = "service_vfuyurx";
  const templateID = "template_book_a_form";

  emailjs.send(serviceID, templateID, formData).then(
    function (response) {
      const blurSectionElement = document.querySelector(
        ".thank-you-background"
      );
      blurSectionElement.classList.remove("none");
    },
    function (error) {
      alert("There was an error sending your application. Please try again.");
    }
  );
}
