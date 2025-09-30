document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    // Create error message elements dynamically
    const inputs = contactForm.querySelectorAll('[required]');
    inputs.forEach(input => {
        const errorId = `${input.id}-error`;
        const errorSpan = document.createElement('span');
        errorSpan.id = errorId;
        errorSpan.className = 'error-message';
        errorSpan.setAttribute('aria-live', 'polite'); // Announce changes to screen readers
        input.insertAdjacentElement('afterend', errorSpan);
        input.setAttribute('aria-describedby', errorId);
    });

    /**
     * Shows an error message for a given input field.
     * @param {HTMLInputElement|HTMLTextAreaElement} input The input element.
     * @param {string} message The error message to display.
     */
    const showError = (input, message) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.setAttribute('aria-invalid', 'true');
        input.classList.add('is-invalid');
    };



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

    /**
     * Hides the error message for a given input field.
     * @param {HTMLInputElement|HTMLTextAreaElement} input The input element.
     */
    const hideError = (input) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        input.removeAttribute('aria-invalid');
        input.classList.remove('is-invalid');
    };

    contactForm.addEventListener('submit', (e) => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        let isValid = true;

        // Reset previous validation states
        inputs.forEach(hideError);

        // Basic client-side validation (more robust validation should happen server-side)
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required.');
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        if (!subjectInput.value.trim()) {
            showError(subjectInput, 'Subject is required.');
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required.');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault(); // Prevent submission ONLY if validation fails
            const firstInvalid = document.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
        // If the form is valid, the default submission will proceed and redirect to thank-you.html
    });
});