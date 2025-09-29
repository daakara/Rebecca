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
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Reset previous validation states
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.removeAttribute('aria-invalid');
            input.classList.remove('is-invalid'); // Assuming you might add CSS for this
        });

        let isValid = true;

        // Basic client-side validation (more robust validation should happen server-side)
        if (!nameInput.value.trim()) {
            nameInput.setAttribute('aria-invalid', 'true');
            nameInput.classList.add('is-invalid');
            isValid = false;
        }
        // Simple email regex for client-side, server-side should be more thorough
        if (!emailInput.value.trim() || !/\S+@\S+\.\S+/.test(emailInput.value)) {
            emailInput.setAttribute('aria-invalid', 'true');
            emailInput.classList.add('is-invalid');
            isValid = false;
        }
        if (!subjectInput.value.trim()) {
            subjectInput.setAttribute('aria-invalid', 'true');
            subjectInput.classList.add('is-invalid');
            isValid = false;
        }
        if (!messageInput.value.trim()) {
            messageInput.setAttribute('aria-invalid', 'true');
            messageInput.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault(); // Prevent submission ONLY if validation fails
            // Optionally, display a general error message or focus on the first invalid field
            const firstInvalid = document.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
        // If the form is valid, the default submission will proceed and redirect to thank-you.html
    });
});