/*Responsive Navigation */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("open");
});

document.getElementById("calculate-btn").addEventListener("click", function() {
    const dest = document.getElementById("dest-name").value;
    const days = parseInt(document.getElementById("num-days").value);
    const daily = parseFloat(document.getElementById("daily-budget").value);

    if (!dest || !days || !daily) {
        alert("Please fill in all fields!");
        return;
    }

    const total = days * daily;
    displayResults(dest, total);
    saveToStorage(dest, total);
});

function displayResults(dest, total) {
    const resultCard = document.getElementById("result-display");
    const statusText = document.getElementById("res-status");
    const progressBar = document.getElementById("budget-progress-bar");
    
    resultCard.style.display = "block";
    document.getElementById("res-dest").innerText = dest;
    document.getElementById("res-total").innerText = total.toLocaleString();

    // Determine Status and Progress Bar color
    let status = "";
    let width = "";
    let color = "";

    if (total < 1000) {
        status = "Low Budget";
        width = "30%";
        color = "#28a745"; // Green
    } else if (total <= 3000) {
        status = "Moderate Budget";
        width = "60%";
        color = "#ffc107"; // Yellow/Gold
    } else {
        status = "Luxury Budget";
        width = "100%";
        color = "#d9534f"; // Red
    }

    statusText.innerText = status;
    statusText.style.color = color;
    
    // Animate the progress bar
    setTimeout(() => {
        progressBar.style.width = width;
        progressBar.style.backgroundColor = color;
    }, 100);
}

function saveToStorage(dest, total) {
    let trips = JSON.parse(localStorage.getItem("savedTrips")) || [];
    const newTrip = { destination: dest, cost: total, date: new Date().toLocaleDateString() };
    
    trips.push(newTrip);
    localStorage.setItem("savedTrips", JSON.stringify(trips));
    renderSavedTrips();
}

function renderSavedTrips() {
    const list = document.getElementById("saved-list");
    const trips = JSON.parse(localStorage.getItem("savedTrips")) || [];
    
    list.innerHTML = trips.map(t => `
        <div class="saved-item">
            <span><strong>${t.destination}</strong>: $${t.cost.toLocaleString()}</span>
            <small>${t.date}</small>
        </div>
    `).join('');
}

// Show saved trips on page load
window.onload = renderSavedTrips;

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

