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

// ============ Grid canvas background ============
const canvas = document.getElementById("gridCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h, nodes = [], raf;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    const count = Math.min(70, Math.floor((w * h) / 16000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(61, 220, 151, 0.18)";
    ctx.lineWidth = 1;
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < 130) {
          ctx.globalAlpha = 1 - d / 130;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(61, 220, 151, 0.5)";
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", () => { cancelAnimationFrame(raf); resize(); });
}
