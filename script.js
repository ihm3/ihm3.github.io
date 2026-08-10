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

// ============ Scroll reveal ============
function initReveals() {
  document.querySelectorAll(".reveal:not(.observed)").forEach((el) => {
    el.classList.add("observed");
    revealObserver.observe(el);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

initReveals();

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
    { title: "Languages", items: ["C", "C++", "Embedded C", "Python", "Bash"] },
    { title: "Embedded Platforms", items: ["STM32", "TI", "ESP32", "Nuvoton", "Custom ECUs"] },
    { title: "Fieldbus & Protocols", items: ["ISOBUS (ISO 11783)", "CAN", "J1939", "CANopen", "SPI", "I2C", "UART"] },
    { title: "Embedded Linux", items: ["Yocto", "Buildroot", "BSP Development"] },
    { title: "HMI & Visualization", items: ["Qt", "LVGL", "BT81X Series"] },
    { title: "Off-Highway Systems", items: ["ECU Software", "RTK GNSS", "IMU", "Path Tracking"] },
    { title: "Quality & Debugging", items: ["MISRA-C", "Bootloaders", "JTAG", "GDB"] },
    { title: "Tools", items: ["Git", "CMake", "KiCad", "Jira"] },
  ];
  skillsGrid.innerHTML = skills
    .map(
      (s, i) => `
      <div class="card tilt skill-card reveal delay-${(i % 3)}">
        <div class="skill-head"><h3 class="card-title">${s.title}</h3></div>
        <div class="skill-tags">${s.items.map((t) => `<span class="badge">${t}</span>`).join("")}</div>
      </div>`
    )
    .join("");
  initReveals();
}

// ============ Experience timeline render ============
const timeline = document.getElementById("timeline");
if (timeline) {
  const jobs = [
    {
      role: "Embedded Software Engineer",
      company: "Doken Teknoloji ve Makine",
      period: "2023 â€” Present",
      loc: "Konya, TÃ¼rkiye",
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
      period: "2022 â€” 2023",
      loc: "TÃ¼rkiye",
      pts: [
        "Developed embedded applications with BLE, Zigbee, and Raspberry Pi.",
        "Integrated wireless communication for IoT-enabled embedded systems.",
      ],
    },
    {
      role: "Embedded Software Engineer Intern",
      company: "Atiker YazÄ±lÄ±m",
      period: "2022",
      loc: "TÃ¼rkiye",
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
          <p class="tl-company">${j.company} Â· ${j.loc}</p>
          <ul class="tl-list">${j.pts.map((p) => `<li>${p}</li>`).join("")}</ul>
        </div>
      </div>`
    )
    .join("");
  initReveals();
}
