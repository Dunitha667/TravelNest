/* 1. DESTINATION DATA (Stored as a JS Object Array) */
const destinationData = [
    {
        id: 1,
        name: "Paris",
        country: "France",
        continent: "Europe",
        image: "images/France.webp",
        description: "The City of Light is famous for its art, fashion, and gastronomy. It is home to world-renowned landmarks and a rich cultural history.",
        attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
        costs: { flight: "$500", hotel: "$150/night", food: "$60/day" }
    },
    {
        id: 2,
        name: "Tokyo",
        country: "Japan",
        continent: "Asia",
        image: "images/Japan.webp",
        description: "A neon-lit metropolis blending ancient temples with futuristic technology and incredible street food.",
        attractions: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Tower"],
        costs: { flight: "$900", hotel: "$120/night", food: "$40/day" }
    },
    {
        id: 3,
        name: "Serengeti",
        country: "Tanzania",
        continent: "Africa",
        image: "images/Tanzania.jpg",
        description: "A world-famous safari destination known for wildlife, vast plains, and the Great Migration.",
        attractions: ["Serengeti National Park", "Ngorongoro Crater", "Mount Kilimanjaro"],
        costs: { flight: "$1000", hotel: "$120/night", food: "$50/day" }
    },
    {
        id: 4,
        name: "Toronto",
        country: "Canada",
        continent: "North America",
        image: "images/Canada.jpg",
        description: "A vibrant city known for its diverse culture, stunning architecture, and world-class museums.",
        attractions: ["CN Tower", "Royal Ontario Museum", "Ripley's Aquarium"],
        costs: { flight: "$800", hotel: "$100/night", food: "$50/day" }
    },
    {
        id: 5,
        name: "Cartagena",
        country: "Colombia",
        continent: "South America",
        image: "images/Colombia.webp",
        description: "A historic coastal city known for its colorful streets, colonial architecture, and Caribbean beaches.",
        attractions: ["Walled City", "Castillo San Felipe de Barajas", "Rosario Islands"],
        costs: { flight: "$900", hotel: "$80/night", food: "$40/day" }
    },
    {
        id: 6,
        name: "Sydney",
        country: "Australia",
        continent: "Australia",
        image: "images/Australia.jpg",
        description: "A coastal city known for its iconic landmarks, beaches, and vibrant lifestyle.",
        attractions: ["Sydney Opera House", "Sydney Harbour Bridge", "Bondi Beach"],
        costs: { flight: "$1200", hotel: "$120/night", food: "$60/day" }
    },
    {
        id: 7,
        name: "Antarctica",
        country: "Antarctica",
        continent: "Antarctica",
        image: "images/Antarctica.webp",
        description: "A remote icy wilderness known for glaciers, unique wildlife, and extreme landscapes.",
        attractions: ["Penguin colonies", "Icebergs and glaciers", "Research stations"],
        costs: { flight: "$1500", hotel: "Expedition cruise", food: "Included" }
    }

];

/* 2. SELECTORS */
const grid = document.getElementById("destination-grid");
const searchInput = document.getElementById("searchName");
const continentSelect = document.getElementById("filterContinent");
const modal = document.getElementById("destination-modal");
const modalDetails = document.getElementById("modal-details");
const closeBtn = document.querySelector(".close-btn");

/* 3. RESPONSIVE NAVIGATION (Hamburger Menu) */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("open");
});

/* 4. CORE FUNCTIONS */

// Function to render cards to the HTML grid
function displayDestinations(data) {
    const container = document.createDocumentFragment();
    grid.innerHTML = "";

    data.forEach(dest => {
        const card = document.createElement("div");
        card.className = "card";
        card.onclick = () => openModal(dest); 
        
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}">
            <div style="padding:15px;">
                <h3>${dest.name}</h3>
                <p>${dest.country} (${dest.continent})</p>
            </div>
        `;
        container.appendChild(card);

        grid.appendChild(container);
    });
}

// Function to handle Search and Continent Filtering
function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedContinent = continentSelect.value;

    const filtered = destinationData.filter(dest => {
        const matchesName = dest.name.toLowerCase().includes(searchTerm);
        const matchesContinent = selectedContinent === "all" || dest.continent === selectedContinent;
        return matchesName && matchesContinent;
    });

    displayDestinations(filtered);
}

// Function to Open Modal and Build the Cost Table
function openModal(dest) {
    modalDetails.innerHTML = `
        <h2>${dest.name}, ${dest.country}</h2>
        <p>${dest.description}</p>
        
        <h4>Popular Attractions:</h4>
        <ul>
            ${dest.attractions.map(attr => `<li>${attr}</li>`).join('')}
        </ul>

        <h4>Travel Cost Comparison:</h4>
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Estimated Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Flight</td><td>${dest.costs.flight}</td></tr>
                <tr><td>Hotel</td><td>${dest.costs.hotel}</td></tr>
                <tr><td>Food & Drink</td><td>${dest.costs.food}</td></tr>
            </tbody>
        </table>
    `;
    modal.style.display = "block";
}

/* 5. EVENT LISTENERS */
searchInput.addEventListener("input", filterData);
continentSelect.addEventListener("change", filterData);

closeBtn.onclick = () => {
    modal.style.display = "none";
};

// Close modal if user clicks outside the white box
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

/* 6. NEWSLETTER & LOCAL STORAGE */
const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmailInput = document.getElementById("newsletterEmail");
const newsletterPopup = document.getElementById("newsletter-popup");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = newsletterEmailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email!");
            return;
        }

        let savedEmails = JSON.parse(localStorage.getItem("newsletterEmails")) || [];
        savedEmails.push(email);
        localStorage.setItem("newsletterEmails", JSON.stringify(savedEmails));

        newsletterPopup.classList.add("show");
        setTimeout(() => newsletterPopup.classList.remove("show"), 2000);
        newsletterForm.reset();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    displayDestinations(destinationData);
});