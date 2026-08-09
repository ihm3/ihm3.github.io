// ============ Navbar: scroll state ============
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  if (document.getElementById("toTop")) {
    document.getElementById("toTop").classList.toggle("visible", window.scrollY > 600);
  }
}, { passive: true });

// ============ Mobile menu toggle ============
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
  });
}

// Close menu when a link is clicked
if (navLinks) {
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    })
  );
}

// ============ Footer year ============
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============ Hero: typing effect ============
const typedEl = document.getElementById("typed");
if (typedEl) {
  const phrases = ["ECU software", "ISOBUS stacks", "CAN / J1939", "Embedded Linux", "HMI dashboards"];
  let p = 0, i = 0, deleting = false;

  function type() {
    const current = phrases[p];
    typedEl.textContent = current.slice(0, i);
    if (!deleting && i < current.length) {
      i++;
      setTimeout(type, 85);
    } else if (!deleting) {
      deleting = true;
      setTimeout(type, 1600);
    } else if (i > 0) {
      i--;
      setTimeout(type, 45);
    } else {
      deleting = false;
      p = (p + 1) % phrases.length;
      setTimeout(type, 300);
    }
  }
  type();
}
