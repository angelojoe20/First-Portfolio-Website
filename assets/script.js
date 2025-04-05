document.addEventListener("DOMContentLoaded", function() {
  // Initialize AOS for scroll-triggered animations
  AOS.init({
    duration: 800,
    once: false
  });

  // Initialize Typed.js for the hero text effect
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

  // Initialize Particles.js for background particle effects
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5,
        "random": false
      },
      "size": {
        "value": 3,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#504B38",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out"
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        }
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });

  // Intersection Observer for showing/hiding the navbar
  const nav = document.querySelector(".navbar");
  const heroSection = document.querySelector(".hero");
  const observerOptions = {
    root: null,      // viewport
    threshold: 0.5   // when 50% of the hero is visible
  };
  const observer = new IntersectionObserver((entries) => {
    const heroEntry = entries[0];
    if (heroEntry.isIntersecting) {
      nav.classList.add("hidden-nav");
    } else {
      nav.classList.remove("hidden-nav");
    }
  }, observerOptions);
  observer.observe(heroSection);

  // Tab Switching for the Experience Section (generic tab switching)
  const tabs = document.querySelectorAll('.tab:not(.org-tabs .tab)');
  const contents = document.querySelectorAll('.tab-content:not(.org-tabs .tab-content)');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

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

  // Update durations for elements with the class "calc-duration"
  document.querySelectorAll('.calc-duration').forEach(span => {
    const start = span.getAttribute('data-start');
    const end = span.getAttribute('data-end');
    span.textContent = "· " + calculateDuration(start, end);
  });

  // Update overall durations for elements with "calc-overall-duration"
  document.querySelectorAll('.calc-overall-duration').forEach(span => {
    const start = span.getAttribute('data-start');
    span.textContent = calculateDuration(start, "Present");
  });
});
