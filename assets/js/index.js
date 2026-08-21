// elements
const formContainer = document.querySelector(".form-container");
const contactForm = document.getElementById("contact-form");

// ---------- EmailJS ----------
// load the EmailJS SDK and initialize with our public key
(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
      publicKey: "7Tt9BC3adNIPZZy5v",
    });
})();

window.onload = function() {
  contactForm.addEventListener("submit", function(event) {
    // prevent default form submission behavior
    event.preventDefault();

    // ----- Creating the timestamp for the email -----
    // get the current date and time, then format it
    const sentTime = new Date();
    const formattedTime = sentTime.toLocaleString();

    // set the hidden time input's time value
    document.getElementById("sent-time").value = formattedTime;

    // ----- EmailJS setup -----
    // "seviceId" is found in the EmailJS dashboard under "Email Services" and under the email service you want to use.
    // "templateId" is found in the EmailJS dashboard under "Email Templates" 
    const serviceId = "service_7gefbvh";
    const templateId = "template_azf2xa5";

    // ----- Sending an email via EmailJS -----
    // send the info to EmailJS, who will then forward the info via email
    emailjs.sendForm(serviceId, templateId, this)
      .then(() => {
          console.log('SUCCESS!');

          // relay a message to the user that their message was received
          // 1. hide the contact form (#contact-form)
          contactForm.classList.add("hide");

          // 2. create a "p" tag, give it a class for styling
          const submitMsg = document.createElement("p");
          submitMsg.classList.add("submit-success-msg");

          // 3. give it a message
          submitMsg.textContent = "Thank you! Your message has been received. I'll connect with you soon!";

          // 4. append it to the container
          formContainer.appendChild(submitMsg);
      }, (error) => {
          console.log('FAILED...', error);

          // relay a message to the user that something went wrong
          // 1. hide the contact form (#contact-form)
          contactForm.classList.add("hide");

          // 2. create a "p" tag, give it a class for styling
          const submitMsg = document.createElement("p");
          submitMsg.classList.add("submit-fail-msg");

          // 3. give it a message
          submitMsg.textContent = "Something went wrong. Please try again later. If this continues, please email me at gscalica@gmail.com.";

          // 4. append it to the container
          formContainer.appendChild(submitMsg);
      });
  });
};
