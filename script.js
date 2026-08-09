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

// ============ Scroll reveal ============
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
}

// ============ Card hover tilt ============
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ============ Stat counters ============
const counters = document.querySelectorAll(".stat-num");
if (counters.length) {
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(timer); }
          el.textContent = cur;
        }, 24);
        cio.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => cio.observe(c));
}

// ============ Back to top ============
const toTop = document.getElementById("toTop");
if (toTop) {
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ============ Skills render ============
const skillsGrid = document.getElementById("skillsGrid");
if (skillsGrid) {
  const skills = [
    { icon: "▣", title: "Languages", items: ["C", "C++", "Embedded C", "Python", "Bash"] },
    { icon: "◈", title: "Embedded Platforms", items: ["STM32", "TI", "ESP32", "Nuvoton", "Custom ECUs"] },
    { icon: "⇄", title: "Fieldbus & Protocols", items: ["ISOBUS (ISO 11783)", "CAN", "J1939", "CANopen", "SPI", "I2C", "UART"] },
    { icon: "◉", title: "Embedded Linux", items: ["Yocto", "Buildroot", "BSP Development"] },
    { icon: "▤", title: "HMI & Visualization", items: ["Qt", "LVGL", "BT81X Series"] },
    { icon: "✚", title: "Off-Highway Systems", items: ["ECU Software", "RTK GNSS", "IMU", "Path Tracking"] },
    { icon: "⚒", title: "Quality & Debugging", items: ["MISRA-C", "Bootloaders", "JTAG", "GDB"] },
    { icon: "⚙", title: "Tools", items: ["Git", "CMake", "KiCad", "Jira"] },
  ];
  skillsGrid.innerHTML = skills
    .map(
      (s, i) => `
      <div class="card tilt skill-card reveal delay-${(i % 3)}">
        <div class="skill-head"><span class="skill-icon">${s.icon}</span><h3 class="card-title">${s.title}</h3></div>
        <div class="skill-tags">${s.items.map((t) => `<span class="badge">${t}</span>`).join("")}</div>
      </div>`
    )
    .join("");
}

// ============ Experience timeline render ============
const timeline = document.getElementById("timeline");
if (timeline) {
  const jobs = [
    {
      role: "Embedded Software Engineer",
      company: "Doken Teknoloji ve Makine",
      period: "2023 — Present",
      loc: "Konya, Türkiye",
      pts: [
        "Developed ECU software for agricultural machinery using C/C++.",
        "Implemented ISOBUS (ISO 11783) stacks incl. Virtual Terminal (VT) and Task Controller (TC).",
        "Designed multi-ECU communication using CAN and J1939 protocols.",
        "Built custom embedded Linux systems using Yocto and Buildroot.",
        "Developed HMI applications with Qt, LVGL, and BT81X.",
        "Collaborated on drivers, system bring-up, and real-time optimization.",
      ],
    },
    {
      role: "Embedded Systems Engineer",
      company: "Lamptime Elektrik",
      period: "2022 — 2023",
      loc: "Türkiye",
      pts: [
        "Developed embedded applications with BLE, Zigbee, and Raspberry Pi.",
        "Integrated wireless communication for IoT-enabled embedded systems.",
      ],
    },
    {
      role: "Embedded Software Engineer Intern",
      company: "Atiker Yazılım",
      period: "2022",
      loc: "Türkiye",
      pts: [
        "Worked on Embedded Linux systems and Qt-based industrial HMI applications.",
        "Assisted in real-time Linux integration and system-level debugging.",
      ],
    },
  ];
  timeline.innerHTML = jobs
    .map(
      (j, i) => `
      <div class="timeline-item reveal">
        <div class="timeline-dot"></div>
        <div class="card">
          <div class="tl-head">
            <h3 class="card-title">${j.role}</h3>
            <span class="tl-period">${j.period}</span>
          </div>
          <p class="tl-company">${j.company} · ${j.loc}</p>
          <ul class="tl-list">${j.pts.map((p) => `<li>${p}</li>`).join("")}</ul>
        </div>
      </div>`
    )
    .join("");
}
