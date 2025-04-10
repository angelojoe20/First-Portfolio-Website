document.addEventListener("DOMContentLoaded", function() {
  // AOS initialization
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 800, once: false });
  } else {
    console.warn("AOS failed to load.");
  }

  // Typed.js initialization
  if (typeof Typed !== "undefined") {
    new Typed("#typed-text", {
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

  // Particles.js initialization
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: window.innerWidth > 768 ? 80 : 40,
          density: { enable: true, value_area: 800 }
        },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
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
          onhover: { enable: window.innerWidth > 768, mode: "grab" },
          onclick: { enable: window.innerWidth > 768, mode: "push" }
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  } else {
    console.warn("Particles.js failed to load.");
  }

  // Debounce utility
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Grab navbar and key sections
  const nav             = document.querySelector(".navbar");
  const heroSection     = document.getElementById("home");
  const aboutSection    = document.getElementById("about-me");
  const projectsSection = document.getElementById("projects");

  if (!nav || !heroSection || !aboutSection || !projectsSection) {
    console.warn("Navbar or one of the observed sections not found (#home, #about-me, #projects).");
    return;
  }

  // 1) Hero Observer: hide navbar whenever Hero is in view
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.classList.remove("visible");
      }
    });
  }, { root: null, threshold: 0 });
  heroObserver.observe(heroSection);

  // 2) About Me Observer: show navbar when About Me enters view
  const aboutObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.classList.add("visible");
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "-80px 0px 0px 0px"
  });
  aboutObserver.observe(aboutSection);

  // 3) Projects Observer: hide navbar when Projects fully exit view
  const projectsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        nav.classList.remove("visible");
      }
    });
  }, {
    root: null,
    threshold: 0,
    rootMargin: "0px 0px -100% 0px"
  });
  projectsObserver.observe(projectsSection);

  // Dynamic Duration Calculation (unchanged)
  function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate === "Present" ? new Date() : new Date(endDate);
    let months = (end.getFullYear() - start.getFullYear()) * 12 +
                 (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    months = months % 12;
    let result = "";
    if (years > 0) result += years + " yr" + (years > 1 ? "s" : "");
    if (months > 0) result += (years > 0 ? " " : "") + months + " mos";
    return result || "Less than 1 mo";
  }

  document.querySelectorAll('.calc-duration').forEach(span => {
    const start = span.getAttribute('data-start');
    const end   = span.getAttribute('data-end');
    span.textContent = "· " + calculateDuration(start, end);
  });

  document.querySelectorAll('.calc-overall-duration').forEach(span => {
    const start = span.getAttribute('data-start');
    span.textContent = calculateDuration(start, "Present");
  });
});
