document.addEventListener("DOMContentLoaded", function() {
  // Fallback for AOS initialization
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: false
    });
  } else {
    console.warn("AOS failed to load.");
  }

  // Fallback for Typed.js initialization
  if (typeof Typed !== "undefined") {
    var typed = new Typed("#typed-text", {
      strings: [
        "I build things for the web.",
        "I'm a Computer Engineering Student specializing in Cloud Engineering & Data Engineering.",
        "I love building solutions that look great, feel fantastic, and function correctly."
      ],
      typeSpeed: 90,
      backSpeed: 10,
      backDelay: 10000,
      loop: true
    });
  } else {
    console.warn("Typed.js failed to load.");
    document.getElementById("typed-text").textContent = "I'm a Computer Engineering Student.";
  }

  // Optimize Particles.js for performance
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: window.innerWidth > 768 ? 80 : 40,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5,
          random: false
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#504B38",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: window.innerWidth > 768,
            mode: "grab"
          },
          onclick: {
            enable: window.innerWidth > 768,
            mode: "push"
          }
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  } else {
    console.warn("Particles.js failed to load.");
  }

  // Debounce function for scroll performance
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Intersection Observer for navbar sliding effect
  const nav = document.querySelector(".navbar");
  const heroSection = document.querySelector(".hero");
  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const observer = new IntersectionObserver(
    debounce((entries) => {
      const heroEntry = entries[0];
      if (heroEntry.isIntersecting) {
        nav.classList.add("hidden-nav");
      } else {
        nav.classList.remove("hidden-nav");
      }
    }, 100),
    observerOptions
  );

  if (heroSection) {
    observer.observe(heroSection);
  }

  // New logic for navbar visibility (show/hide based on About Me section)
  const aboutMeSection = document.querySelector(".about-me-section");
  const footer = document.querySelector(".footer");

  // Ensure navbar is hidden on page load
  if (nav) {
    nav.classList.remove("visible");
  }

  // Function to toggle navbar visibility
  const toggleNavbarVisibility = debounce(() => {
    if (!aboutMeSection || !footer || !nav) {
      console.warn("Required elements not found: .about-me-section, .footer, or .navbar");
      return;
    }

    const aboutMeTop = aboutMeSection.offsetTop;
    const footerTop = footer.offsetTop;
    const scrollPosition = window.scrollY;

    // Show navbar if the scroll position is at or past the About Me section and before the Footer
    if (scrollPosition >= aboutMeTop && scrollPosition < footerTop + footer.offsetHeight - window.innerHeight) {
      nav.classList.add("visible");
    } else {
      nav.classList.remove("visible");
    }
  }, 100);

  // Initial check for navbar visibility
  toggleNavbarVisibility();

  // Check on scroll for navbar visibility
  window.addEventListener("scroll", toggleNavbarVisibility);

  // Dynamic Duration Calculation Function
  function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate === "Present" ? new Date() : new Date(endDate);
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    months = months % 12;
    let result = "";
    if (years > 0) result += years + " yr" + (years > 1 ? "s" : "");
    if (months > 0) result += (years > 0 ? " " : "") + months + " mos";
    return result || "Less than 1 mo";
  }

  // Update durations (if applicable, though no elements use this yet)
  document.querySelectorAll('.calc-duration').forEach(span => {
    const start = span.getAttribute('data-start');
    const end = span.getAttribute('data-end');
    span.textContent = "· " + calculateDuration(start, end);
  });

  document.querySelectorAll('.calc-overall-duration').forEach(span => {
    const start = span.getAttribute('data-start');
    span.textContent = calculateDuration(start, "Present");
  });
});