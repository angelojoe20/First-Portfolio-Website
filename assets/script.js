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

  // 5) VanillaTilt for any [data-tilt]
  if (window.VanillaTilt) {
    const tiltElems = document.querySelectorAll("[data-tilt]");
    if (tiltElems.length) {
      VanillaTilt.init(tiltElems, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2
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
    const end   = endDate === "Present" ? new Date() : new Date(endDate);
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
    if (typeof AOS !== "undefined" && !prefersReducedMotion()) AOS.refresh();
  }, 200));

  // 10) Draggable & Snap‑to‑Center for .experience-carousel + pagination dots
  const carousel = document.querySelector(".experience-carousel");
  if (carousel) {
    // enable drag control
    carousel.style.userSelect = "none";
    carousel.style.cursor     = "grab";

    let isDown     = false;
    let startX     = 0;
    let scrollLeft = 0;

    // helper to get x relative to carousel
    const getX = e => {
      const rect = carousel.getBoundingClientRect();
      return e.clientX - rect.left;
    };

    // Pointer down
    carousel.addEventListener("pointerdown", e => {
      isDown = true;
      carousel.setPointerCapture(e.pointerId);
      carousel.classList.add("dragging");
      carousel.style.cursor = "grabbing";
      startX     = getX(e);
      scrollLeft = carousel.scrollLeft;
    });

    // Pointer up / cancel / leave
    ["pointerup","pointercancel","pointerleave"].forEach(evt =>
      carousel.addEventListener(evt, e => {
        if (!isDown) return;
        isDown = false;
        carousel.releasePointerCapture(e.pointerId);
        carousel.classList.remove("dragging");
        carousel.style.cursor = "grab";
        snapToCard();
      })
    );

    // Pointer move
    carousel.addEventListener("pointermove", e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = getX(e);
      const walk = (x - startX) * 2; // adjust speed
      carousel.scrollLeft = scrollLeft - walk;
    });

    // collect cards
    const cards = Array.from(carousel.querySelectorAll(".experience-card"));

    // snap function
    function snapToCard() {
      const center = carousel.scrollLeft + carousel.clientWidth/2;
      let closest = null, minDist = Infinity;
      cards.forEach(card => {
        const cardCenter = card.offsetLeft + card.clientWidth/2;
        const d = Math.abs(cardCenter - center);
        if (d < minDist) {
          minDist = d;
          closest = card;
        }
      });
      if (closest) {
        const target = closest.offsetLeft + closest.clientWidth/2
                     - carousel.clientWidth/2;
        carousel.scrollTo({ left: target, behavior: "smooth" });
      }
      updateActiveDot();
    }

    // also snap after normal scroll
    carousel.addEventListener("scroll", debounce(() => {
      if (!isDown) snapToCard();
    }, 100));

    // — Pagination dots setup —
    const dotContainer = document.querySelector(".carousel-dots");
    function updateActiveDot() {
      if (!dotContainer) return;
      const center = carousel.scrollLeft + carousel.clientWidth/2;
      let bestIdx = 0, bestDist = Infinity;
      cards.forEach((c, i) => {
        const cCenter = c.offsetLeft + c.clientWidth/2;
        const dist = Math.abs(cCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      dotContainer.querySelectorAll(".carousel-dot")
        .forEach((d,i) => d.classList.toggle("active", i === bestIdx));
    }

    if (dotContainer) {
      cards.forEach((card, idx) => {
        const dot = document.createElement("div");
        dot.className = "carousel-dot";
        dot.dataset.index = idx;
        if (idx === 0) dot.classList.add("active");
        dotContainer.append(dot);

        dot.addEventListener("click", () => {
          const target = card.offsetLeft + card.clientWidth/2
                       - carousel.clientWidth/2;
          carousel.scrollTo({ left: target, behavior: "smooth" });
        });
      });
    }
  }
});
