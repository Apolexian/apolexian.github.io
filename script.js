/* ═══════════════════════════════════════════
   SYMBOLI RUDOLF SHRINE — 皇帝 — SCRIPTS
   ═══════════════════════════════════════════ */

// ── Sparkle cursor trail ──
(function () {
  const canvas = document.getElementById('trail');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const colors = ['#ffd700', '#ff00ff', '#00ffcc', '#c0c0d8', '#cc0033'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: e.clientX + (Math.random() - 0.5) * 10,
        y: e.clientY + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        life: 1,
        decay: 0.015 + Math.random() * 0.02,
        size: 1.5 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.5 ? 'star' : 'circle',
      });
    }
  });

  function drawStar(cx, cy, r) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const method = i === 0 ? 'moveTo' : 'lineTo';
      ctx[method](cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    }
    ctx.closePath();
    ctx.fill();
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter((p) => p.life > 0);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.life -= p.decay;

      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;

      if (p.shape === 'star') {
        drawStar(p.x, p.y, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    requestAnimationFrame(loop);
  }
  loop();
})();

// ── Fake visitor counter ──
(function () {
  const el = document.getElementById('visitor-count');
  if (!el) return;
  const base = 48291;
  const daysSince = Math.floor(
    (Date.now() - new Date('2024-01-01').getTime()) / 86400000
  );
  el.textContent = (base + daysSince * 7).toLocaleString();
})();

// ── Scroll-driven parallax on scattered cards ──
(function () {
  const cards = document.querySelectorAll('.scatter-card');
  if (!cards.length) return;

  function onScroll() {
    const scrollY = window.scrollY;
    cards.forEach((card, i) => {
      const speed = 0.02 + (i % 4) * 0.015;
      const offset = Math.sin(scrollY * speed + i) * 12;
      card.style.setProperty('--parallax-y', offset + 'px');
      card.style.transform =
        card.style.transform.replace(/translateY\([^)]*\)/, '') +
        ` translateY(${offset}px)`;
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ── Pause orbit on hover for accessibility ──
(function () {
  const orbit = document.getElementById('gallery-orbit');
  if (!orbit) return;

  orbit.addEventListener('mouseenter', () => {
    orbit.querySelectorAll('.orbit-ring').forEach((ring) => {
      ring.style.animationPlayState = 'paused';
    });
    orbit.querySelectorAll('.card-inner').forEach((inner) => {
      inner.style.animationPlayState = 'paused';
    });
  });

  orbit.addEventListener('mouseleave', () => {
    orbit.querySelectorAll('.orbit-ring').forEach((ring) => {
      ring.style.animationPlayState = 'running';
    });
    orbit.querySelectorAll('.card-inner').forEach((inner) => {
      inner.style.animationPlayState = 'running';
    });
  });
})();
