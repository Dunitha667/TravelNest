/*Responsive Navigation */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("open");
});

/* Generator start*/
const tripData = [
    { name: "France", type: "cultural", budget: "high", desc: "Art, history, and the Eiffel Tower.", img: "images/France.webp" },
    { name: "Japan", type: "relaxation", budget: "medium", desc: "Ancient traditions meet neon lights.", img: "images/Japan.webp" },
    { name: "Tanzania", type: "nature", budget: "low", desc: "Unforgettable safaris and wild beauty.", img: "images/Tanzania.jpg" },
    { name: "Canada", type: "cultural", budget: "medium", desc: "Majestic mountains and crystal lakes.", img: "images/Canada.jpg" },
    { name: "Colombia", type: "adventure", budget: "medium", desc: "Colorful streets and jungle coffee farms.", img: "images/Colombia.webp" },
    { name: "Australia", type: "relaxation", budget: "high", desc: "Surfing, outback, and the Great Barrier Reef.", img: "images/Australia.jpg" },
    { name: "Antarctica", type: "nature", budget: "high", desc: "The final frontier of ice and penguins.", img: "images/Antarctica.webp" }
];

document.getElementById("surprise-btn").addEventListener("click", generateTrip);
document.getElementById("retry-btn").addEventListener("click", generateTrip);
document.getElementById("wishlist-btn").addEventListener("click", addToWishlist);

let currentSuggestion = null;

function generateTrip() {
    const type = document.getElementById("travel-type").value;
    const budget = document.getElementById("budget-range").value;

    const filtered = tripData.filter(t => t.type === type && t.budget === budget);

    const finalOptions = filtered.length > 0 ? filtered : tripData.filter(t => t.type === type);
    
    const randomTrip = finalOptions[Math.floor(Math.random() * finalOptions.length)];
    currentSuggestion = randomTrip;

    displaySuggestion(randomTrip);
}

function displaySuggestion(trip) {
    const display = document.getElementById("suggestion-display");
    const content = document.getElementById("dest-content");

    content.classList.remove("pop-animation");
    void content.offsetWidth;
    content.classList.add("pop-animation");

    document.getElementById("suggested-dest").innerText = trip.name;
    document.getElementById("suggested-img").src = trip.img;
    document.getElementById("suggested-desc").innerText = trip.desc;
    
    display.style.display = "block";
}

function addToWishlist() {
    if (!currentSuggestion) return;

    let wishlist = JSON.parse(localStorage.getItem("travelWishlist")) || [];
    
    if (wishlist.some(item => item.name === currentSuggestion.name)) {
        alert("This destination is already in your wishlist!");
        return;
    }

    wishlist.push(currentSuggestion);
    localStorage.setItem("travelWishlist", JSON.stringify(wishlist));
    renderWishlist();
}

function renderWishlist() {
    const grid = document.getElementById("wishlist-grid");
    const wishlist = JSON.parse(localStorage.getItem("travelWishlist")) || [];

    grid.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
        </div>
    `).join('');
}

window.onload = renderWishlist;
/* Generator end */

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

