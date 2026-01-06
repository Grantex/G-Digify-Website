const services = [
    "Websites",
    "Applications",
    "POS & Business Systems",
    "SEO & Online Visibility",
    "Content & Social Media",
    "Digital Growth Solutions"
];

const textElement = document.getElementById("rotating-text");
let index = 0;

// Ensure initial text
textElement.textContent = services[index];

setInterval(() => {
    // Fade out
    textElement.classList.add("hidden");

    // Change text after fade-out
    setTimeout(() => {
        index = (index + 1) % services.length;
        textElement.textContent = services[index];

        // Fade in
        textElement.classList.remove("hidden");
    }, 500);

}, 3000);
