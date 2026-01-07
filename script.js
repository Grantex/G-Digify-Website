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


// HOW WE WORK - Scroll Animation
const steps = document.querySelectorAll(".work-step");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.15 }
);

steps.forEach(step => {
    step.style.opacity = "0";
    step.style.transform = "translateY(30px)";
    step.style.transition = "all 0.6s ease";
    observer.observe(step);
});
