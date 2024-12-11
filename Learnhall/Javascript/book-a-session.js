// Shared object to store form values
let sharedFormValues = {};

document.addEventListener("DOMContentLoaded", () => {
  const blurSectionElement = document.querySelector(".thank-you-background");
  const closeHamburgerElement = document.querySelector(".close-hamburger img");
  const inputsElement = document.querySelectorAll("input");
  const textareaElement = document.querySelector("textarea");

  document
    .querySelector(".book-a-session-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      // Store form values in the shared object
      sharedFormValues = {
        firstName: document.getElementById("first-name").value || "N/A",
        lastName: document.getElementById("last-name").value || "N/A",
        email: document.getElementById("email").value || "N/A",
        phone: document.getElementById("phone").value || "N/A",
        location: document.getElementById("location").value || "N/A",
        zipCode: document.getElementById("zip-code").value || "N/A",
        studentGrade: document.getElementById("student-grade").value || "N/A",
        studentSubject:
          document.getElementById("student-subject").value || "N/A",
        textarea: document.getElementById("textarea").value || "N/A",
      };

      // Clear form fields
      inputsElement.forEach((input) => (input.value = ""));
      textareaElement.value = "";
    });

  closeHamburgerElement.addEventListener("click", () => {
    blurSectionElement.classList.add("none");
  });
});

$(document).ready(function () {
  emailjs.init("t_Ula836MT-Gtn7Nz"); // Initialize EmailJS with your public key

  $(".book-a-session-form").submit(function (event) {
    event.preventDefault(); // Prevent default form submission

    sendForm(sharedFormValues); // Use the shared form values to send an email
  });
});

function sendForm(formData) {
  const serviceID = "service_vfuyurx";
  const templateID = "template";

  emailjs.send(serviceID, templateID, formData).then(
    function (response) {
      const blurSectionElement = document.querySelector(
        ".thank-you-background"
      );
      blurSectionElement.classList.remove("none");
    },
    function (error) {
      alert("There was an error sending your request. Please try again.");
    }
  );
}
