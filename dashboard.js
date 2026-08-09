// ============ Vehicle Dashboard ============
const needle = document.getElementById("speedNeedle");
const arc = document.getElementById("speedArc");
const speedValue = document.getElementById("speedValue");
const rtkEl = document.getElementById("rtk");
const imuEl = document.getElementById("imu");
const pathEl = document.getElementById("pathDev");
const canEl = document.getElementById("canBus");

const ARC_LENGTH = 251; // full visible arc path length

function setGauge(pct) {
  const clamped = Math.max(0, Math.min(1, pct));
  if (arc) arc.style.strokeDashoffset = ARC_LENGTH * (1 - clamped);
  if (needle) needle.style.transform = `rotate(${-90 + clamped * 180}deg)`;
}

function animateGaugeTo(targetPct) {
  const start = performance.now();
  const duration = 900;
  const from = currentPct;

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = from + (targetPct - from) * eased;
    currentPct = val;
    setGauge(val);
    if (speedValue) speedValue.textContent = Math.round(val * 60);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

let currentPct = 0;

function updateTelemetry(speedKmh) {
  const roll = (Math.random() * 4 - 2).toFixed(1);
  const dev = (Math.random() * 0.08 - 0.04).toFixed(2);

  if (imuEl) imuEl.textContent = `${roll}°`;
  if (pathEl) pathEl.textContent = `±${dev} m`;
  if (rtkEl) {
    const fix = speedKmh > 0 && Math.random() > 0.15 ? "FIX" : "FLOAT";
    rtkEl.textContent = fix;
    rtkEl.classList.toggle("crit", fix === "FLOAT");
  }
  if (canEl) {
    const active = speedKmh > 0;
    canEl.textContent = active ? "ACTIVE" : "IDLE";
    canEl.classList.toggle("warn", !active);
  }
}

// Dashboard appears -> drive the needle
const dash = document.querySelector(".dashboard");
if (dash && needle) {
  let started = false;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          animateGaugeTo(0.85); // cruise ~51 km/h
          setInterval(() => {
            const target = 0.5 + Math.random() * 0.45;
            animateGaugeTo(target);
            updateTelemetry(Math.round(target * 60));
          }, 2600);
        }
      });
    },
    { threshold: 0.35 }
  );
  io.observe(dash);
}
