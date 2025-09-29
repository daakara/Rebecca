document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    /**
     * A simple sanitizer to escape HTML.
     * This prevents XSS by converting special characters to their HTML entities.
     * @param {string} str The string to sanitize.
     * @returns {string} The sanitized string.
     */
    const sanitizeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const submitBtn = contactForm.querySelector('.submit-btn');

        // Sanitize all text-based inputs
        const sanitizedData = {
            name: sanitizeHTML(name.value),
            email: email.value, // Email type input has its own validation
            subject: sanitizeHTML(subject.value),
            message: sanitizeHTML(message.value)
        };

        console.log('Sanitized Form Data:', sanitizedData);

        // Here you would typically send the `sanitizedData` to your server
        // For demonstration, we'll just show a success message.
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate a network request
        setTimeout(() => {
            // Create a success message element
            const successMessage = document.createElement('p');
            successMessage.className = 'form-success-message';
            successMessage.textContent = 'Thank you! Your message has been sent.';
            
            // Replace the form with the success message
            contactForm.parentNode.replaceChild(successMessage, contactForm);

        }, 1500);
    });
});