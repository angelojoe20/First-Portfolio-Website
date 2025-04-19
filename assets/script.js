document.addEventListener("DOMContentLoaded", () => {
  // 1) Reduced‑motion helper
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 2) Initialize AOS (Animate on Scroll)
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
    const el = document.getElementById("typed-text");
    if (el) el.textContent = "I'm a Computer Engineering Student.";
  }

  // 4) tsParticles interactive background
  if (window.tsParticles && !prefersReducedMotion()) {
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
        modes: {
          grab: { distance: 140, links: { opacity: 1 } },
          push: { quantity: 4 }
        }
      },
      detectRetina: true
    });
  } else {
    console.warn("tsParticles failed to load or reduced motion is enabled.");
  }

  // 5) VanillaTilt for any timeline cards
  if (window.VanillaTilt) {
    const tiltElems = document.querySelectorAll(".timeline-content[data-tilt]");
    if (tiltElems.length) {
      VanillaTilt.init(tiltElems, {
        max: 8,
        speed: 400,
        scale: 1.02,
        glare: false
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

  // 7) Navbar show/hide via IntersectionObserver
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
  } else {
    console.warn("Navbar or key sections missing.");
  }

  // 8) Calculate durations for .calc-duration spans
  function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate === "Present" ? new Date() : new Date(endDate);
    let months = (end.getFullYear() - start.getFullYear()) * 12 +
                 (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    months %= 12;
    let result = "";
    if (years)  result += `${years} yr${years > 1 ? "s" : ""}`;
    if (months) result += `${years ? " " : ""}${months} mo${months > 1 ? "s" : ""}`;
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
    if (typeof AOS !== "undefined" && !prefersReducedMotion()) {
      AOS.refresh();
    }
  }, 200));
});
