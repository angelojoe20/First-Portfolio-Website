document.addEventListener("DOMContentLoaded", () => {
  // Utility: Check for reduced motion preference
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize AOS if animations are allowed
  if (typeof AOS !== "undefined" && !prefersReducedMotion()) {
    AOS.init({ duration: 800, once: false });
  } else {
    console.warn("AOS failed to load or reduced motion is enabled.");
  }

  // Typed.js subtitle
  if (typeof Typed !== "undefined") {
    new Typed("#typed-text", {
      strings: [
        "A student innovator with passion for tech.",
        "I'm a Computer Engineering student who's interested in Cloud Engineering and DevOps",
        "Let's connect – just say hello."
      ],
      typeSpeed: 90,
      backSpeed: 10,
      backDelay: 10000,
      loop: true,
      showCursor: true,
      cursorChar: "|"
    });
  } else {
    console.warn("Typed.js failed to load.");
    const typedElem = document.getElementById("typed-text");
    if (typedElem) {
      typedElem.textContent = "I'm a Computer Engineering Student.";
    }
  }

  // tsParticles init for interactive background
  if (window.tsParticles && !prefersReducedMotion()) {
    tsParticles.load("particles-js", {
      particles: {
        number: {
          value: window.innerWidth > 768 ? 80 : 40,
          density: { enable: true, value_area: 800 }
        },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        links: {
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
          outModes: "out"
        }
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: {
            enable: window.innerWidth > 768,
            mode: "grab"
          },
          onClick: {
            enable: window.innerWidth > 768,
            mode: "push"
          }
        },
        modes: {
          grab: {
            distance: 140,
            links: { opacity: 1 }
          },
          push: {
            quantity: 4
          }
        }
      },
      detectRetina: true
    });
  } else {
    console.warn("tsParticles failed to load or reduced motion is enabled.");
  }

  if (window.VanillaTilt) {
    const aboutImg = document.querySelectorAll("[data-tilt]");
    if (aboutImg.length) {
      VanillaTilt.init(aboutImg, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2
      });
    }
  } else {
    console.warn("VanillaTilt failed to load.");
  }

  // Debounce utility for performance
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Navbar & Section Observers using IntersectionObserver for dynamic UI behavior
  const nav = document.querySelector(".navbar");
  const heroSection = document.getElementById("home");
  const aboutSection = document.getElementById("about-me");
  const projectsSection = document.getElementById("projects");

  if (!nav || !heroSection || !aboutSection || !projectsSection) {
    console.warn("One or more key sections are missing.");
    return;
  }

  // Hide the navbar when the hero section is in view
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.classList.remove("visible");
      }
    });
  }, { root: null, threshold: 0 });
  heroObserver.observe(heroSection);

  // Show navbar when the About Me section enters view
  const aboutObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.classList.add("visible");
      }
    });
  }, { root: null, threshold: 0.1, rootMargin: "-80px 0px 0px 0px" });
  aboutObserver.observe(aboutSection);

  // Hide navbar when the Projects section fully exits view
  const projectsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        nav.classList.remove("visible");
      }
    });
  }, { root: null, threshold: 0, rootMargin: "0px 0px -100% 0px" });
  projectsObserver.observe(projectsSection);

  // Dynamic Duration Calculation for experience sections
  function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate === "Present" ? new Date() : new Date(endDate);
    let months = (end.getFullYear() - start.getFullYear()) * 12 +
                 (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    months %= 12;
    let result = "";
    if (years > 0) result += years + " yr" + (years > 1 ? "s" : "");
    if (months > 0) result += (years > 0 ? " " : "") + months + " mos";
    return result || "Less than 1 mo";
  }

  document.querySelectorAll('.calc-duration').forEach(span => {
    const start = span.getAttribute('data-start');
    const end = span.getAttribute('data-end');
    span.textContent = "· " + calculateDuration(start, end);
  });

  document.querySelectorAll('.calc-overall-duration').forEach(span => {
    const start = span.getAttribute('data-start');
    span.textContent = calculateDuration(start, "Present");
  });

  // Optional: Refresh AOS on window resize using debounce for performance
  window.addEventListener('resize', debounce(() => {
    if (typeof AOS !== "undefined" && !prefersReducedMotion()) {
      AOS.refresh();
    }
  }, 200));
});
