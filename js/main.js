// ---------- Level (project) data ----------
var LEVELS = {
  chagas: {
    tag: "LEVEL 01 · BOSS FIGHT · DIFFICULTY ★★★★★",
    title: "ChagasVision",
    body: [
      "A hybrid Multi-Scale CNN + Transformer encoder (ChagasNet) that detects Chagas disease from 12-lead ECG recordings, trained as a 5-fold stratified cross-validation ensemble across the SaMi-Trop, CODE-15, and PTB-XL datasets.",
      "Deployed as a Streamlit app on Community Cloud with a clinical scanner interface and an admin panel, with Grad-CAM explainability for lead-level importance. Final model: AUROC 0.837, Sensitivity 0.684, Specificity 0.806 — trained against a severe ~1:34.6 class imbalance. My final-year project."
    ],
    stack: ["Python", "PyTorch", "Streamlit", "Grad-CAM"]
  },
  iot: {
    tag: "LEVEL 02 · CO-OP MAP · DIFFICULTY ★★★★☆",
    title: "Multi-Site IoT Sensor Dashboard",
    body: [
      "A Raspberry Pi Pico W reads temperature and pressure via I2C and serves a styled live web dashboard over TCP, while a Google Apps Script logs timestamped readings to Sheets for longer-term tracking.",
      "Built and tested across four university sites, with handling for connection loss and multi-location comparison. Six MicroPython scripts plus the logging script, written with a clear global/helper/main structure. Coursework 6NTCM009W."
    ],
    stack: ["MicroPython", "Raspberry Pi Pico W", "Google Sheets API", "I2C"]
  }
};

var CONFIG = {
  roles: ['ML models', 'IoT systems', 'clean software', 'DevOps pipelines'],
  contact: {
    email: '',     // example: 'name@example.com'
    github: '',    // example: 'https://github.com/your-username'
    linkedin: ''   // example: 'https://www.linkedin.com/in/your-name'
  },
  allowedHosts: {
    github: ['github.com', 'www.github.com'],
    linkedin: ['linkedin.com', 'www.linkedin.com']
  },
  xpPerLevel: 40,
  gameSeconds: 20,
  gameHoles: 9
};

// ---------- Theme toggle ----------
(function initTheme() {
  var body = document.body;
  var btn = document.getElementById('themeToggle');
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved === 'light' || saved === 'dark') body.setAttribute('data-theme', saved);
  btn.addEventListener('click', function () {
    var next = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// ---------- Typing effect for hero name ----------
(function typeName() {
  var el = document.getElementById('typed-name');
  var full = 'Kaveesha Punchihewa';
  var i = 0;
  function tick() {
    if (i <= full.length) {
      el.textContent = full.slice(0, i);
      i++;
      setTimeout(tick, 55);
    }
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = full;
  } else {
    tick();
  }
})();

/* =========================================================
   6. HERO: ROLE TYPER, COUNTERS, AVATAR
   ========================================================= */

function initRoleTyper() {
  var target = byId('roleText');
  if (prefersReducedMotion()) { return; }

  var roleIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function tick() {
    var word = CONFIG.roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    target.textContent = word.slice(0, charIndex);

    var delay = deleting ? 40 : 85;
    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1400;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % CONFIG.roles.length;
      delay = 350;
    }
    window.setTimeout(tick, delay);
  }

  target.textContent = '';
  tick();
}

// ---------- Scroll reveal ----------
(function scrollReveal() {
  var items = document.querySelectorAll('.reveal');
  var statBlocks = document.querySelectorAll('.stat-block');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function (item) { observer.observe(item); });

  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-row').forEach(function (row) {
          var val = row.getAttribute('data-value');
          var fill = row.querySelector('.stat-fill');
          requestAnimationFrame(function () { fill.style.width = val + '%'; });
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  statBlocks.forEach(function (b) { statObserver.observe(b); });
})();

// ---------- Level card modal ----------
(function levelModal() {
  var overlay = document.getElementById('modalOverlay');
  var content = document.getElementById('modalContent');
  var closeBtn = document.getElementById('modalClose');
  var cards = document.querySelectorAll('.level-card');

  function open(key) {
    var d = LEVELS[key];
    if (!d) return;
    content.innerHTML =
      '<span class="m-tag">' + d.tag + '</span>' +
      '<h3>' + d.title + '</h3>' +
      d.body.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
      '<div class="m-stack">' + d.stack.map(function (s) { return '<span>' + s + '</span>'; }).join('') + '</div>';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () { open(card.getAttribute('data-level')); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card.getAttribute('data-level')); }
    });
  });
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();

// ---------- Cursor glow ----------
(function cursorGlow() {
  var glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) return;
  window.addEventListener('mousemove', function (e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

// ---------- Particle background canvas ----------
(function particles() {
  var canvas = document.getElementById('bg-canvas');
  var ctx = canvas.getContext('2d');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var w, h, dots = [];
  var COUNT = 60;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function initDots() {
    dots = [];
    for (var i = 0; i < COUNT; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6
      });
    }
  }
  function isDark() {
    return document.body.getAttribute('data-theme') !== 'light';
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    var dotColor = isDark() ? 'rgba(110,86,255,0.55)' : 'rgba(81,56,224,0.35)';
    var lineColor = isDark() ? 'rgba(110,86,255,' : 'rgba(81,56,224,';
    dots.forEach(function (d) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();
    });
    for (var i = 0; i < dots.length; i++) {
      for (var j = i + 1; j < dots.length; j++) {
        var dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = lineColor + (1 - dist / 130) * 0.25 + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    if (!reduced) requestAnimationFrame(draw);
  }

  resize();
  initDots();
  window.addEventListener('resize', function () { resize(); initDots(); });
  if (reduced) { draw(); } else { requestAnimationFrame(draw); }
})();
