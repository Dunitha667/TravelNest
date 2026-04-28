/* HERO AUTO ROTATE */
const heroData = [
    {
    title: "France",
    desc: "Famous landmarks, rich culture, and world-class cuisine",
    img: "images/France.webp"
    },
    {
        title: "Japan",
        desc: "Ancient temples, modern cities, and rich traditions",
        img: "images/Japan.webp"
    },
    {
        title: "Tanzania ",
        desc: "Serengeti safaris, Zanzibar beaches, and Africa’s highest peak",
        img: "images/Tanzania.jpg"
    },
    {
        title: "Canada",
        desc: "Vast wilderness, snowy mountains, and vibrant multicultural cities",
        img: "images/Canada.jpg"
    },
    {
        title: "Colombia",
        desc: "Coffee, culture, and Caribbean coast",
        img: "images/Colombia.webp"
    },
    {
    title: "Australia",
    desc: "Iconic landmarks, beaches, and unique wildlife",
    img: "images/Australia.jpg"
    },
    {
    title: "Antarctica",
    desc: "Frozen landscapes, massive ice sheets, and unique wildlife",
    img: "images/Antarctica.webp"
    }
];

let index = 0;

function updateHero() {
    document.getElementById("hero-title").innerText = heroData[index].title;
    document.getElementById("hero-desc").innerText = heroData[index].desc;
    document.getElementById("hero-img").src = heroData[index].img;

    index = (index + 1) % heroData.length;
}

setInterval(updateHero, 3000);


/* DESTINATION OF THE DAY */
    function getTodayDestination() {
        const today = new Date().getDate();
        const selected = heroData[today % heroData.length]; 
        
        const dailyTitle = document.getElementById("daily-title");
        const dailyImg = document.getElementById("daily-img");

        if (dailyTitle && dailyImg) {
            dailyTitle.innerText = selected.title;
            dailyImg.src = selected.img;
            dailyImg.alt = selected.title;
        }
    }

getTodayDestination();

/*Responsive Navigation */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("open");
});


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

