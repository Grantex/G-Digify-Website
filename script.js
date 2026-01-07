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


// Testimonials dynamism for touch and drag
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".testimonials-slider");
  const cards = slider.querySelectorAll(".testimonial-card");
  const total = cards.length;
  let current = 0;
  const intervalTime = 4000; // 4 seconds per slide
  let sliderInterval;

  // --- Function to display current slide ---
  function showSlide(index) {
    cards.forEach((card, i) => {
      card.style.transform = `translateX(${100 * (i - index)}%)`;
    });
  }

  // --- Auto-slide ---
  function startSlider() {
    sliderInterval = setInterval(() => {
      current = (current + 1) % total;
      showSlide(current);
    }, intervalTime);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  // --- Prev / Next Buttons ---
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      stopSlider();
      current = (current - 1 + total) % total;
      showSlide(current);
      startSlider();
    });

    nextBtn.addEventListener("click", () => {
      stopSlider();
      current = (current + 1) % total;
      showSlide(current);
      startSlider();
    });
  }

  // --- Touch Swipe Support ---
  let startX = 0;
  let isDragging = false;

  slider.addEventListener("touchstart", (e) => {
    stopSlider();
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    // Optional: could implement visual drag effect here
  });

  slider.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (Math.abs(diffX) > 50) { // Minimum swipe distance
      if (diffX > 0) {
        // Swipe right → prev
        current = (current - 1 + total) % total;
      } else {
        // Swipe left → next
        current = (current + 1) % total;
      }
      showSlide(current);
    }

    isDragging = false;
    startSlider(); // Restart auto-slide
  });

  // --- Initialize ---
  showSlide(current);
  startSlider();
});
