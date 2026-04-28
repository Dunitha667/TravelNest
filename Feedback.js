/*Responsive Navigation */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("open");
});

/* Feedback Form start */
const feedbackForm = document.getElementById('feedback-form');
const confirmationMsg = document.getElementById('form-confirmation');

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh

    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const message = document.getElementById('user-message').value;

    // Create feedback object
    const feedbackData = {
        name,
        email,
        message,
        date: new Date().toLocaleString()
    };

    // Store in localStorage
    let allFeedback = JSON.parse(localStorage.getItem('userFeedback')) || [];
    allFeedback.push(feedbackData);
    localStorage.setItem('userFeedback', JSON.stringify(allFeedback));

    // Show success message and reset form
    feedbackForm.style.display = 'none';
    confirmationMsg.style.display = 'block';

    setTimeout(() => {
        feedbackForm.reset();
        feedbackForm.style.display = 'block';
        confirmationMsg.style.display = 'none';
    }, 4000);
});

// --- FAQ Accordion Logic ---
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const span = header.querySelector('span');

        // Close other open items (Optional)
        document.querySelectorAll('.accordion-content').forEach(item => {
            if (item !== content) {
                item.style.maxHeight = null;
                item.previousElementSibling.querySelector('span').innerText = '+';
            }
        });

        // Toggle current item
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            span.innerText = '+';
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            span.innerText = '-';
        }
    });
});
/* Feedback Form end */

/* Newsletter Popup + LocalStorage */
const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmailInput = document.getElementById("newsletterEmail");
const newsletterPopup = document.getElementById("newsletter-popup");

newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = newsletterEmailInput.value.trim();

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email!");
        return;
    }

    // Save to localStorage
    let savedEmails = JSON.parse(localStorage.getItem("newsletterEmails")) || [];
    savedEmails.push(email);
    localStorage.setItem("newsletterEmails", JSON.stringify(savedEmails));

    // Show popup
    newsletterPopup.classList.add("show");
    setTimeout(() => newsletterPopup.classList.remove("show"), 2000);

    newsletterForm.reset();
});

