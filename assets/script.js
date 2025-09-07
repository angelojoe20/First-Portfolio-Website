document.addEventListener("DOMContentLoaded", () => {
  // 1) Reduced‑motion helper
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 2) Initialize AOS
  if (typeof AOS !== "undefined" && !prefersReducedMotion()) {
    AOS.init({ duration: 800, once: false });
  } else {
    console.warn("AOS failed to load or reduced motion is enabled.");
  }

  // 3) Typed.js rotating subtitle
  if (typeof Typed !== "undefined") {
    new Typed("#typed-text", {
      strings: [
        "A student innovator with passion for tech.",
        "I'm a Computer Engineering student interested in Cloud & DevOps.",
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
    const el = document.getElementById("typed-text");
    if (el) el.textContent = "I'm a Computer Engineering student.";
  }

  // 4) tsParticles interactive backgrounds
  if (window.tsParticles && !prefersReducedMotion()) {
    // Hero
    tsParticles.load("particles-js", {
      particles: {
        number: { value: window.innerWidth > 768 ? 80 : 40, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3, random: true },
        links: { enable: true, distance: 150, color: "#504B38", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, outModes: "out" }
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: { enable: window.innerWidth > 768, mode: "grab" },
          onClick: { enable: window.innerWidth > 768, mode: "push" }
        },
        modes: { grab: { distance: 140, links: { opacity: 1 } }, push: { quantity: 4 } }
      },
      detectRetina: true
    });

    // Certifications Section
    tsParticles.load("certparticles", {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 4, random: true },
        move: { enable: true, speed: 0.8, outModes: "out" }
      },
      interactivity: { detectsOn: "canvas", events: { onHover: { enable: false }, onClick: { enable: false } } },
      detectRetina: true
    });

    // Experience Section
    tsParticles.load("expparticles", {
      particles: {
        number: { value: 20, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 0.5, outModes: "out" }
      },
      interactivity: { detectsOn: "canvas", events: { onHover: { enable: false }, onClick: { enable: false } } },
      detectRetina: true
    });
    
    // Leadership Section
    tsParticles.load("leadershipparticles", {
      particles: {
        number: { value: 15, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.25, random: true },
        size: { value: 2, random: true },
        move: { enable: true, speed: 0.6, direction: "none", outModes: "out" }
      },
      interactivity: { 
        detectsOn: "canvas", 
        events: { 
          onHover: { enable: true, mode: "connect" }, 
          onClick: { enable: false } 
        },
        modes: {
          connect: {
            distance: 150,
            links: {
              opacity: 0.3
            },
            radius: 120
          }
        }
      },
      detectRetina: true
    });
  } else {
    console.warn("tsParticles failed to load or reduced motion is enabled.");
  }

  // 5) VanillaTilt
  if (window.VanillaTilt) {
    const tiltElems = document.querySelectorAll("[data-tilt]");
    if (tiltElems.length) {
      VanillaTilt.init(tiltElems, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02
      });
    }
  } else {
    console.warn("VanillaTilt failed to load.");
  }

  // 6) Debounce helper
  const debounce = (fn, ms) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  };

  // 7) Navbar show/hide
  const nav = document.querySelector(".navbar");
  const heroSection = document.getElementById("home");
  const aboutSection = document.getElementById("about-me");
  const projectsSection = document.getElementById("projects");
  if (nav && heroSection && aboutSection && projectsSection) {
    new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && nav.classList.remove("visible")),
      { threshold: 0 }
    ).observe(heroSection);
    new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && nav.classList.add("visible")),
      { threshold: 0.1, rootMargin: "-80px 0px 0px 0px" }
    ).observe(aboutSection);
    new IntersectionObserver(
      entries => entries.forEach(e => !e.isIntersecting && nav.classList.remove("visible")),
      { threshold: 0, rootMargin: "0px 0px -100% 0px" }
    ).observe(projectsSection);
  }

  // 8) Calculate durations
  function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end   = endDate === "Present" ? new Date() : new Date(endDate);
    let months = (end.getFullYear() - start.getFullYear()) * 12 +
                 (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    months %= 12;
    let result = "";
    if (years)  result += `${years} yr${years>1?"s":""}`;
    if (months) result += `${years?" ":""}${months} mo${months>1?"s":""}`;
    return result || "Less than 1 mo";
  }
  document.querySelectorAll(".calc-duration").forEach(span => {
    span.textContent = "· " + calculateDuration(span.dataset.start, span.dataset.end);
  });
  document.querySelectorAll(".calc-overall-duration").forEach(span => {
    span.textContent = calculateDuration(span.dataset.start, "Present");
  });

  // 9) Refresh AOS on resize
  window.addEventListener("resize", debounce(() => {
    if (typeof AOS !== "undefined" && !prefersReducedMotion()) AOS.refresh();
  }, 200));
});
