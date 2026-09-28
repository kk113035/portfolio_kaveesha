// // ---------- Level (project) data ----------
// var LEVELS = {
//   chagas: {
//     tag: "LEVEL 01 · BOSS FIGHT · DIFFICULTY ★★★★★",
//     title: "ChagasVision",
//     body: [
//       "A hybrid Multi-Scale CNN + Transformer encoder (ChagasNet) that detects Chagas disease from 12-lead ECG recordings, trained as a 5-fold stratified cross-validation ensemble across the SaMi-Trop, CODE-15, and PTB-XL datasets.",
//       "Deployed as a Streamlit app on Community Cloud with a clinical scanner interface and an admin panel, with Grad-CAM explainability for lead-level importance. Final model: AUROC 0.837, Sensitivity 0.684, Specificity 0.806 — trained against a severe ~1:34.6 class imbalance. My final-year project."
//     ],
//     stack: ["Python", "PyTorch", "Streamlit", "Grad-CAM"]
//   },
//   iot: {
//     tag: "LEVEL 02 · CO-OP MAP · DIFFICULTY ★★★★☆",
//     title: "Multi-Site IoT Sensor Dashboard",
//     body: [
//       "A Raspberry Pi Pico W reads temperature and pressure via I2C and serves a styled live web dashboard over TCP, while a Google Apps Script logs timestamped readings to Sheets for longer-term tracking.",
//       "Built and tested across four university sites, with handling for connection loss and multi-location comparison. Six MicroPython scripts plus the logging script, written with a clear global/helper/main structure. Coursework 6NTCM009W."
//     ],
//     stack: ["MicroPython", "Raspberry Pi Pico W", "Google Sheets API", "I2C"]
//   }
// };

// var CONFIG = {
//   roles: ['ML models', 'IoT systems', 'clean software', 'DevOps pipelines'],
//   contact: {
//     email: '',     // example: 'name@example.com'
//     github: '',    // example: 'https://github.com/your-username'
//     linkedin: ''   // example: 'https://www.linkedin.com/in/your-name'
//   },
//   allowedHosts: {
//     github: ['github.com', 'www.github.com'],
//     linkedin: ['linkedin.com', 'www.linkedin.com']
//   },
//   xpPerLevel: 40,
//   gameSeconds: 20,
//   gameHoles: 9
// };

// // ---------- Theme toggle ----------
// (function initTheme() {
//   var body = document.body;
//   var btn = document.getElementById('themeToggle');
//   var saved = null;
//   try { saved = localStorage.getItem('theme'); } catch (e) {}
//   if (saved === 'light' || saved === 'dark') body.setAttribute('data-theme', saved);
//   btn.addEventListener('click', function () {
//     var next = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
//     body.setAttribute('data-theme', next);
//     try { localStorage.setItem('theme', next); } catch (e) {}
//   });
// })();

// // ---------- Typing effect for hero name ----------
// (function typeName() {
//   var el = document.getElementById('typed-name');
//   var full = 'Kaveesha Punchihewa';
//   var i = 0;
//   function tick() {
//     if (i <= full.length) {
//       el.textContent = full.slice(0, i);
//       i++;
//       setTimeout(tick, 55);
//     }
//   }
//   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
//     el.textContent = full;
//   } else {
//     tick();
//   }
// })();

// /* =========================================================
//    6. HERO: ROLE TYPER, COUNTERS, AVATAR
//    ========================================================= */

// function initRoleTyper() {
//   var target = byId('roleText');
//   if (prefersReducedMotion()) { return; }

//   var roleIndex = 0;
//   var charIndex = 0;
//   var deleting = false;

//   function tick() {
//     var word = CONFIG.roles[roleIndex];
//     charIndex += deleting ? -1 : 1;
//     target.textContent = word.slice(0, charIndex);

//     var delay = deleting ? 40 : 85;
//     if (!deleting && charIndex === word.length) {
//       deleting = true;
//       delay = 1400;
//     } else if (deleting && charIndex === 0) {
//       deleting = false;
//       roleIndex = (roleIndex + 1) % CONFIG.roles.length;
//       delay = 350;
//     }
//     window.setTimeout(tick, delay);
//   }

//   target.textContent = '';
//   tick();
// }

// // ---------- Scroll reveal ----------
// (function scrollReveal() {
//   var items = document.querySelectorAll('.reveal');
//   var statBlocks = document.querySelectorAll('.stat-block');
//   var observer = new IntersectionObserver(function (entries) {
//     entries.forEach(function (entry) {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('in-view');
//         observer.unobserve(entry.target);
//       }
//     });
//   }, { threshold: 0.15 });
//   items.forEach(function (item) { observer.observe(item); });

//   var statObserver = new IntersectionObserver(function (entries) {
//     entries.forEach(function (entry) {
//       if (entry.isIntersecting) {
//         entry.target.querySelectorAll('.stat-row').forEach(function (row) {
//           var val = row.getAttribute('data-value');
//           var fill = row.querySelector('.stat-fill');
//           requestAnimationFrame(function () { fill.style.width = val + '%'; });
//         });
//         statObserver.unobserve(entry.target);
//       }
//     });
//   }, { threshold: 0.3 });
//   statBlocks.forEach(function (b) { statObserver.observe(b); });
// })();

// // ---------- Level card modal ----------
// (function levelModal() {
//   var overlay = document.getElementById('modalOverlay');
//   var content = document.getElementById('modalContent');
//   var closeBtn = document.getElementById('modalClose');
//   var cards = document.querySelectorAll('.level-card');

//   function open(key) {
//     var d = LEVELS[key];
//     if (!d) return;
//     content.innerHTML =
//       '<span class="m-tag">' + d.tag + '</span>' +
//       '<h3>' + d.title + '</h3>' +
//       d.body.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
//       '<div class="m-stack">' + d.stack.map(function (s) { return '<span>' + s + '</span>'; }).join('') + '</div>';
//     overlay.classList.add('open');
//     document.body.style.overflow = 'hidden';
//   }
//   function close() {
//     overlay.classList.remove('open');
//     document.body.style.overflow = '';
//   }

//   cards.forEach(function (card) {
//     card.addEventListener('click', function () { open(card.getAttribute('data-level')); });
//     card.addEventListener('keydown', function (e) {
//       if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card.getAttribute('data-level')); }
//     });
//   });
//   closeBtn.addEventListener('click', close);
//   overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
//   document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
// })();

// // ---------- Cursor glow ----------
// (function cursorGlow() {
//   var glow = document.getElementById('cursor-glow');
//   if (!glow || window.matchMedia('(pointer: coarse)').matches) return;
//   window.addEventListener('mousemove', function (e) {
//     glow.style.left = e.clientX + 'px';
//     glow.style.top = e.clientY + 'px';
//   });
// })();

// // ---------- Particle background canvas ----------
// (function particles() {
//   var canvas = document.getElementById('bg-canvas');
//   var ctx = canvas.getContext('2d');
//   var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//   var w, h, dots = [];
//   var COUNT = 60;

//   function resize() {
//     w = canvas.width = window.innerWidth;
//     h = canvas.height = window.innerHeight;
//   }
//   function initDots() {
//     dots = [];
//     for (var i = 0; i < COUNT; i++) {
//       dots.push({
//         x: Math.random() * w,
//         y: Math.random() * h,
//         vx: (Math.random() - 0.5) * 0.25,
//         vy: (Math.random() - 0.5) * 0.25,
//         r: Math.random() * 1.6 + 0.6
//       });
//     }
//   }
//   function isDark() {
//     return document.body.getAttribute('data-theme') !== 'light';
//   }
//   function draw() {
//     ctx.clearRect(0, 0, w, h);
//     var dotColor = isDark() ? 'rgba(110,86,255,0.55)' : 'rgba(81,56,224,0.35)';
//     var lineColor = isDark() ? 'rgba(110,86,255,' : 'rgba(81,56,224,';
//     dots.forEach(function (d) {
//       d.x += d.vx; d.y += d.vy;
//       if (d.x < 0 || d.x > w) d.vx *= -1;
//       if (d.y < 0 || d.y > h) d.vy *= -1;
//       ctx.beginPath();
//       ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
//       ctx.fillStyle = dotColor;
//       ctx.fill();
//     });
//     for (var i = 0; i < dots.length; i++) {
//       for (var j = i + 1; j < dots.length; j++) {
//         var dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
//         var dist = Math.sqrt(dx * dx + dy * dy);
//         if (dist < 130) {
//           ctx.beginPath();
//           ctx.moveTo(dots[i].x, dots[i].y);
//           ctx.lineTo(dots[j].x, dots[j].y);
//           ctx.strokeStyle = lineColor + (1 - dist / 130) * 0.25 + ')';
//           ctx.lineWidth = 1;
//           ctx.stroke();
//         }
//       }
//     }
//     if (!reduced) requestAnimationFrame(draw);
//   }

//   resize();
//   initDots();
//   window.addEventListener('resize', function () { resize(); initDots(); });
//   if (reduced) { draw(); } else { requestAnimationFrame(draw); }
// })();

'use strict';

/* =========================================================
   1. GLOBALS: DATA AND STATE
   ========================================================= */

var NAME_TEXT = 'Kaveesha Punchihewa';

var PROJECTS = {
  chagas: {
    badge: 'PROJECT 01 · DEEP LEARNING',
    title: 'ChagasVision',
    paragraphs: [
      'A hybrid Multi-Scale CNN and Transformer encoder (ChagasNet) that detects Chagas disease from 12-lead ECG recordings. It was trained as a 5-fold stratified cross-validation ensemble across the SaMi-Trop, CODE-15 and PTB-XL datasets.',
      'The model is deployed as a Streamlit app with a clinical scanner interface, an admin panel and Grad-CAM explainability that shows which ECG leads mattered most. It reaches an AUROC of 0.837 with 0.684 sensitivity and 0.806 specificity, despite a severe class imbalance of about 1 to 34.6. This was my final-year project.'
    ],
    stack: ['Python', 'PyTorch', 'Streamlit', 'Grad-CAM'],
    links: { repo: '', demo: 'https://fyp-chagasvision.streamlit.app/' },
    note: 'Research prototype. Not a clinical diagnostic tool.'
  },
  iot: {
    badge: 'PROJECT 02 · EMBEDDED / IOT',
    title: 'IoT Sensor Dashboard',
    paragraphs: [
      'A Raspberry Pi Pico W reads temperature and pressure over I2C and serves a styled live dashboard over TCP. A Google Apps Script logs timestamped readings to Google Sheets for longer-term tracking.',
      'The system was tested across four university locations and handles connection loss gracefully. It is made of six MicroPython scripts plus the logging script, written with a clear global, helper and main structure.'
    ],
    stack: ['MicroPython', 'Raspberry Pi Pico W', 'Google Sheets API', 'I2C'],
    links: { repo: '', demo: '' },
    note: ''
  }
};

var state = {
  lastFocus: null,
  dotColor: '110, 86, 255'
};

/* =========================================================
   2. HELPERS
   ========================================================= */

function byId(id) {
  return document.getElementById(id);
}

function queryAll(selector, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(selector));
}

function makeEl(tag, className, text) {
  var el = document.createElement(tag);
  if (className) { el.className = className; }
  if (text) { el.textContent = text; }   // textContent never runs HTML, so it is safe
  return el;
}

function clearElement(el) {
  while (el.firstChild) { el.removeChild(el.firstChild); }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function safeSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch (error) { /* storage blocked, ignore */ }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Only accept real https URLs. Blocks javascript:, data: and other risky schemes.
function isHttpsUrl(value) {
  if (typeof value !== 'string' || value === '') { return false; }
  var parsed;
  try { parsed = new URL(value); } catch (error) { return false; }
  return parsed.protocol === 'https:';
}

/* =========================================================
   3. SECURITY
   ========================================================= */

// Clickjacking defence for hosts that cannot send an X-Frame-Options header.
function preventFraming() {
  if (window.top === window.self) { return; }
  document.documentElement.style.display = 'none';
  try { window.top.location.href = window.self.location.href; } catch (error) { /* blocked, page stays hidden */ }
}

/* =========================================================
   4. THEME
   ========================================================= */

function refreshColors() {
  var value = window.getComputedStyle(document.documentElement).getPropertyValue('--dot-rgb');
  state.dotColor = value.trim() || '110, 86, 255';
}

function applyThemeUi(theme) {
  var button = byId('themeToggle');
  button.textContent = theme === 'dark' ? '☀' : '☾';
  button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) { meta.setAttribute('content', theme === 'dark' ? '#0B0D12' : '#F5F5F2'); }
  refreshColors();
}

function initTheme() {
  var root = document.documentElement;
  applyThemeUi(root.getAttribute('data-theme') || 'dark');
  byId('themeToggle').addEventListener('click', function toggleTheme() {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    safeSet('theme', next);
    applyThemeUi(next);
  });
}

/* =========================================================
   5. HERO NAME TYPING AND BIO PHOTO
   ========================================================= */

function initNameTyper() {
  var target = byId('typedName');
  if (prefersReducedMotion()) { return; }

  var index = 0;
  target.textContent = '';

  function tick() {
    index += 1;
    target.textContent = NAME_TEXT.slice(0, index);
    if (index < NAME_TEXT.length) { window.setTimeout(tick, 55); }
  }
  tick();
}

function initBioPhoto() {
  var frame = byId('bioPhoto');
  var image = byId('profilePic');

  function showFallback() { frame.classList.add('no-photo'); }

  // If the photo file is missing, show the KP initials instead of a broken image.
  if (image.complete && image.naturalWidth === 0) { showFallback(); }
  image.addEventListener('error', showFallback);
}

/* =========================================================
   6. SCROLL: REVEAL, ACTIVE LINK, SKILL BARS
   ========================================================= */

function initReveal() {
  var items = queryAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function showAll(item) { item.classList.add('in-view'); });
    return;
  }
  var observer = new IntersectionObserver(function onSeen(entries) {
    entries.forEach(function eachEntry(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function eachItem(item) { observer.observe(item); });
}

function setActiveLink(id) {
  queryAll('[data-target]').forEach(function eachLink(link) {
    var isActive = link.getAttribute('data-target') === id;
    link.classList.toggle('active', isActive);
    if (isActive) { link.setAttribute('aria-current', 'true'); } else { link.removeAttribute('aria-current'); }
  });
}

function initActiveLinks() {
  if (!('IntersectionObserver' in window)) { return; }
  var observer = new IntersectionObserver(function onSection(entries) {
    entries.forEach(function eachEntry(entry) {
      if (entry.isIntersecting) { setActiveLink(entry.target.id); }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  queryAll('main section[id]').forEach(function eachSection(section) { observer.observe(section); });
}

function fillSkillBars(block) {
  queryAll('.stat-row', block).forEach(function eachRow(row) {
    var value = clamp(parseInt(row.getAttribute('data-value'), 10) || 0, 0, 100);
    var fill = row.querySelector('.stat-fill');
    if (fill) {
      window.requestAnimationFrame(function applyWidth() { fill.style.width = value + '%'; });
    }
  });
}

function initSkillBars() {
  var blocks = queryAll('.stat-block');
  if (!('IntersectionObserver' in window)) {
    blocks.forEach(fillSkillBars);
    return;
  }
  var observer = new IntersectionObserver(function onBlock(entries) {
    entries.forEach(function eachEntry(entry) {
      if (entry.isIntersecting) {
        fillSkillBars(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  blocks.forEach(function eachBlock(block) { observer.observe(block); });
}

/* =========================================================
   7. PROJECT DETAILS DIALOG
   ========================================================= */

function buildLinkButton(label, url) {
  var link = makeEl('a', 'btn btn-ghost', label);
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  return link;
}

function buildProjectContent(data) {
  var content = byId('modalContent');
  clearElement(content);

  content.appendChild(makeEl('span', 'm-badge', data.badge));

  var title = makeEl('h3', 'm-title', data.title);
  title.id = 'modalTitle';
  content.appendChild(title);

  data.paragraphs.forEach(function eachParagraph(text) {
    content.appendChild(makeEl('p', '', text));
  });

  var stack = makeEl('ul', 'level-stack');
  data.stack.forEach(function eachTech(tech) { stack.appendChild(makeEl('li', '', tech)); });
  content.appendChild(stack);

  var links = makeEl('div', 'm-links');
  if (isHttpsUrl(data.links.repo)) { links.appendChild(buildLinkButton('View source', data.links.repo)); }
  if (isHttpsUrl(data.links.demo)) { links.appendChild(buildLinkButton('Open live demo ↗', data.links.demo)); }
  if (links.children.length > 0) { content.appendChild(links); }

  if (data.note) { content.appendChild(makeEl('p', 'm-note', data.note)); }
}

function openProject(key, triggerEl) {
  var data = PROJECTS[key];
  if (!data) { return; }

  state.lastFocus = triggerEl || document.activeElement;
  buildProjectContent(data);

  var modal = byId('modal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-box').focus();
}

function closeProject() {
  var modal = byId('modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (state.lastFocus && typeof state.lastFocus.focus === 'function') { state.lastFocus.focus(); }
}

function handleModalKeys(event) {
  var modal = byId('modal');
  if (!modal.classList.contains('open')) { return; }

  if (event.key === 'Escape') {
    closeProject();
    return;
  }

  if (event.key === 'Tab') {
    var focusable = queryAll('a[href], button:not([disabled])', modal);
    if (focusable.length === 0) { return; }
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

function initProjects() {
  queryAll('[data-open]').forEach(function eachButton(button) {
    button.addEventListener('click', function onOpenClick(event) {
      event.stopPropagation();
      openProject(button.getAttribute('data-open'), button);
    });
  });

  // Clicking anywhere on a card opens it too (keyboard users use the button).
  queryAll('.level-card').forEach(function eachCard(card) {
    card.addEventListener('click', function onCardClick() {
      openProject(card.getAttribute('data-project'), card.querySelector('[data-open]'));
    });
  });

  // The live demo link must not also open the dialog.
  queryAll('.card-link').forEach(function eachLink(link) {
    link.addEventListener('click', function onLinkClick(event) { event.stopPropagation(); });
  });

  byId('modalClose').addEventListener('click', closeProject);
  byId('modal').addEventListener('click', function onBackdrop(event) {
    if (event.target.getAttribute('data-close') === 'true') { closeProject(); }
  });
  document.addEventListener('keydown', handleModalKeys);
}

/* =========================================================
   8. BACKGROUND PARTICLES AND CURSOR GLOW
   ========================================================= */

function initCursorGlow() {
  var glow = byId('cursorGlow');
  if (window.matchMedia('(pointer: coarse)').matches) { return; }
  window.addEventListener('mousemove', function onMouseMove(event) {
    glow.style.left = event.clientX + 'px';
    glow.style.top = event.clientY + 'px';
  }, { passive: true });
}

function initBackground() {
  var canvas = byId('bgCanvas');
  var ctx = canvas.getContext('2d');
  if (!ctx) { return; }

  var reduced = prefersReducedMotion();
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width = 0;
  var height = 0;
  var dots = [];

  function buildDots() {
    var count = clamp(Math.floor((width * height) / 22000), 24, 60);
    dots = [];
    for (var i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < dots.length; i++) {
      var dot = dots[i];
      if (!reduced) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > width) { dot.vx *= -1; }
        if (dot.y < 0 || dot.y > height) { dot.vy *= -1; }
      }
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + state.dotColor + ',0.55)';
      ctx.fill();

      for (var j = i + 1; j < dots.length; j++) {
        var other = dots[j];
        var dx = dot.x - other.x;
        var dy = dot.y - other.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = 'rgba(' + state.dotColor + ',' + ((1 - dist / 130) * 0.25).toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function resize() {
    var widthChanged = window.innerWidth !== width;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Mobile browsers fire resize when the address bar hides; only rebuild if the width changed.
    if (widthChanged || dots.length === 0) { buildDots(); }
    draw();
  }

  function loop() {
    if (!document.hidden) { draw(); }
    window.requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();
  if (!reduced) { window.requestAnimationFrame(loop); }
}

/* =========================================================
   9. MAIN
   ========================================================= */

function init() {
  preventFraming();
  initTheme();
  initNameTyper();
  initBioPhoto();
  initReveal();
  initActiveLinks();
  initSkillBars();
  initProjects();
  initCursorGlow();
  initBackground();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
