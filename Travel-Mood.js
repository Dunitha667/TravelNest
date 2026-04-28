/*Responsive Navigation */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("open");
});

/* Travel Mood Start */
// --- Audio Toggle Logic ---
const audioButtons = document.querySelectorAll('.audio-toggle');

audioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const soundId = btn.getAttribute('data-sound');
        const audio = document.getElementById(`${soundId}-audio`);

        // Stop all other sounds first (Optional, but cleaner)
        document.querySelectorAll('audio').forEach(track => {
            if (track !== audio) {
                track.pause();
                track.nextElementSibling?.classList.remove('playing'); // Update UI
            }
        });

        if (audio.paused) {
            audio.play();
            btn.innerText = "Pause";
            btn.classList.add('playing');
        } else {
            audio.pause();
            btn.innerText = "Play";
            btn.classList.remove('playing');
        }
    });
});

// --- Journey Tracker Logic ---
const addBtn = document.getElementById('add-track-btn');
addBtn.addEventListener('click', saveJourney);

function saveJourney() {
    const destSelect = document.getElementById('track-dest');
    const name = destSelect.value; // Gets the selected country name
    const status = document.getElementById('track-status').value;

    // Check if they left it on the placeholder
    if (!name) {
        alert("Please select a destination from the list!");
        return;
    }

    let journey = JSON.parse(localStorage.getItem('myJourney')) || [];
    
    // Optional: Prevent adding the same country twice
    if (journey.some(item => item.name === name)) {
        alert("This destination is already in your tracker!");
        return;
    }

    journey.push({ name, status });
    localStorage.setItem('myJourney', JSON.stringify(journey));
    
    // Reset the dropdown to the placeholder
    destSelect.selectedIndex = 0; 
    renderJourney();
}

function renderJourney() {
    const list = document.getElementById('tracker-list');
    const journey = JSON.parse(localStorage.getItem('myJourney')) || [];
    
    // Update Stats
    const visitedCount = journey.filter(item => item.status === 'visited').length;
    document.getElementById('visit-count').innerText = visitedCount;

    list.innerHTML = journey.map((item, index) => `
        <div class="tracker-item ${item.status}">
            <span>${item.status === 'visited' ? '✅' : '📍'} ${item.name}</span>
            <button onclick="deleteJourney(${index})">🗑️</button>
        </div>
    `).join('');
}

function deleteJourney(index) {
    let journey = JSON.parse(localStorage.getItem('myJourney'));
    journey.splice(index, 1);
    localStorage.setItem('myJourney', JSON.stringify(journey));
    renderJourney();
}

window.onload = renderJourney;
/* Travel Mood End */

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

