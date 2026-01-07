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

  // Set speed: desktop vs mobile
  const desktopSpeed = 4000; // 4s
  const mobileSpeed = 2000;  // 2s faster for mobile
  let intervalTime = window.innerWidth <= 768 ? mobileSpeed : desktopSpeed;
  let sliderInterval;

  function showSlide(index) {
    cards.forEach((card, i) => {
      card.style.transform = `translateX(${100 * (i - index)}%)`;
    });
  }

  function startSlider() {
    stopSlider(); // ensure no double intervals
    sliderInterval = setInterval(() => {
      current = (current + 1) % total;
      showSlide(current);
    }, intervalTime);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  // --- Hover Pause (desktop) ---
  slider.addEventListener("mouseenter", stopSlider);
  slider.addEventListener("mouseleave", startSlider);

  // --- Prev / Next Buttons (optional) ---
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

  // --- Touch Swipe Support (mobile) ---
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
    // Optional: visual drag effect here
  });

  slider.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        current = (current - 1 + total) % total; // swipe right
      } else {
        current = (current + 1) % total; // swipe left
      }
      showSlide(current);
    }

    isDragging = false;

    // Restart auto-slide with mobile speed if on mobile
    intervalTime = window.innerWidth <= 768 ? mobileSpeed : desktopSpeed;
    setTimeout(startSlider, 500); // slight delay to allow reading
  });

  // --- Handle window resize to adjust speed ---
  window.addEventListener("resize", () => {
    intervalTime = window.innerWidth <= 768 ? mobileSpeed : desktopSpeed;
  });

  // --- Initialize ---
  showSlide(current);
  startSlider();
});
