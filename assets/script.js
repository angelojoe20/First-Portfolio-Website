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

  // Mouse Movement-Based Parallax for the background shape
  document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    const bgShape = document.querySelector('.hero-bg-shape');
    if (bgShape) {
      bgShape.style.transform = `translate(${x}px, ${y}px)`;
    }
  });

  // Tab Switching for the Experience Section
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove 'active' class from all tabs and content panels
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add 'active' class to clicked tab and its corresponding content
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });
});
