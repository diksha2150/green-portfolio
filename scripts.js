const hamburgerButton = document.getElementById("hamburger-button");
const mobileMenu = document.getElementById("mobile-menu");

hamburgerButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// ---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle-progress");

  const animateCircle = (circleElement) => {
    const percentage = parseInt(circleElement.dataset.percentage);
    const textElement = circleElement.querySelector(
      ".circle-text div:first-child"
    );
    const progressCircle = circleElement.querySelector("circle:nth-of-type(2)");

    let current = 0;
    const duration = 1000;
    const intervalTime = duration / percentage;
    const step = 314 / 100;

    const animate = setInterval(() => {
      if (current >= percentage) {
        clearInterval(animate);
      } else {
        current++;
        textElement.textContent = `${current}%`;
        progressCircle.style.strokeDashoffset = 314 - step * current;
      }
    }, intervalTime);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCircle(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  circles.forEach((circle) => observer.observe(circle));
});
// ------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill");

  const animateSkill = (skill) => {
    const counter = skill.querySelector(".counter");
    const progressBar = skill.querySelector(".progress");
    const percent = parseInt(skill.getAttribute("data-percent"));

    let current = 0;
    const step = percent / 50;

    const updateCounter = () => {
      if (current < percent) {
        current += step;
        counter.innerText = `${Math.min(Math.floor(current), percent)}%`;
        progressBar.style.width = `${Math.min(current, percent)}%`;
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkill(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skills.forEach((skill) => observer.observe(skill));
});
// ---------------------------------------------------------------------------------

const categoryButtons = document.querySelectorAll(".category-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

const defaultTab = document.querySelector('[data-category="all"]');
defaultTab.classList.add("text-gray-800", "border-b-2", "border-green-500");

const portfolioContainer = document.querySelector(".container");
portfolioContainer.classList.add(
  "border-b-4",
  "border-green-500",
  "transition-all",
  "duration-300"
);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) =>
      btn.classList.remove("text-gray-800", "border-b-2", "border-green-500")
    );

    button.classList.add("text-gray-800", "border-b-2", "border-green-500");

    const category = button.getAttribute("data-category");

    portfolioItems.forEach((item) => {
      if (
        category === "all" ||
        item.getAttribute("data-category") === category
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// ---------------------------------------

const topBtn = document.getElementById("backToTop");
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ----------------------------------------corousle-------------------------------

const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

// Ensure carousel initializes correctly
showSlide(currentSlide);

// Prevent errors if buttons do not exist
if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });
}
