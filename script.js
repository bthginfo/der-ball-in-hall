document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) window.AOS.init({ duration: 700, once: true, offset: 60 });

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Countdown
  const cd = document.getElementById('countdown');
  if (cd) {
    const target = new Date('2026-01-17T19:00:00+01:00');
    function tick() {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        cd.innerHTML = '<p class="cd-past">Der Ball hat stattgefunden – danke an alle Gäste!</p>';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const el = u => cd.querySelector('[data-unit="' + u + '"]');
      if (el('days')) el('days').textContent = String(d).padStart(3, '0');
      if (el('hours')) el('hours').textContent = String(h).padStart(2, '0');
      if (el('minutes')) el('minutes').textContent = String(m).padStart(2, '0');
      if (el('seconds')) el('seconds').textContent = String(s).padStart(2, '0');
    }
    tick();
    if (target - Date.now() > 0) setInterval(tick, 1000);
  }

  // ─── FULL DYNAMIC HERO CANVAS ───
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, mouse = { x: -999, y: -999 };

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = rect.width;
    h = canvas.height = rect.height;
  }

  // Nebula blobs – large soft shapes that drift slowly
  const blobs = [];
  const BLOB_COUNT = 6;
  class Blob {
    constructor() {
      this.x = Math.random() * 1600;
      this.y = Math.random() * 1000;
      this.r = 200 + Math.random() * 300;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.15;
      this.hue = 30 + Math.random() * 20;
      this.sat = 50 + Math.random() * 30;
      this.light = 15 + Math.random() * 20;
      this.alpha = 0.04 + Math.random() * 0.06;
      this.phase = Math.random() * Math.PI * 2;
    }
    update(t) {
      this.x += this.vx + Math.sin(t * 0.0003 + this.phase) * 0.3;
      this.y += this.vy + Math.cos(t * 0.0002 + this.phase) * 0.2;
      if (this.x < -this.r) this.x = w + this.r;
      if (this.x > w + this.r) this.x = -this.r;
      if (this.y < -this.r) this.y = h + this.r;
      if (this.y > h + this.r) this.y = -this.r;
    }
    draw() {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      g.addColorStop(0, 'hsla(' + this.hue + ',' + this.sat + '%,' + this.light + '%,' + this.alpha + ')');
      g.addColorStop(1, 'hsla(' + this.hue + ',' + this.sat + '%,' + this.light + '%,0)');
      ctx.fillStyle = g;
      ctx.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    }
  }

  // Particles – golden sparkles
  const particles = [];
  const P_COUNT = 90;
  class Particle {
    constructor() { this.spawn(true); }
    spawn(init) {
      this.x = Math.random() * (w || 1400);
      this.y = init ? Math.random() * (h || 900) : (h || 900) + 10;
      this.r = Math.random() * 2.2 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -(Math.random() * 0.5 + 0.1);
      this.alpha = Math.random() * 0.7 + 0.1;
      this.baseAlpha = this.alpha;
      this.pulse = Math.random() * 0.025 + 0.005;
      this.offset = Math.random() * Math.PI * 2;
      this.life = 0;
      const hs = Math.random() * 20 - 10;
      this.hue = 43 + hs;
      this.lightness = 55 + Math.random() * 20;
    }
    update(t) {
      this.life++;
      this.x += this.vx + Math.sin(this.life * 0.008 + this.offset) * 0.12;
      this.y += this.vy;
      this.alpha = this.baseAlpha * (0.5 + 0.5 * Math.sin(t * this.pulse + this.offset));
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const f = (140 - dist) / 140 * 0.9;
        this.x += (dx / dist) * f;
        this.y += (dy / dist) * f;
      }
      if (this.y < -10 || this.x < -20 || this.x > w + 20) this.spawn(false);
    }
    draw() {
      const col = 'hsla(' + this.hue + ',75%,' + this.lightness + '%,';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = col + this.alpha + ')';
      ctx.fill();
      if (this.r > 1.2) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = col + (this.alpha * 0.1) + ')';
        ctx.fill();
      }
    }
  }

  function init() {
    resize();
    blobs.length = 0;
    particles.length = 0;
    for (let i = 0; i < BLOB_COUNT; i++) blobs.push(new Blob());
    for (let i = 0; i < P_COUNT; i++) particles.push(new Particle());
  }

  let t = 0;
  function animate() {
    t++;
    // Dark base
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, w, h);

    // Nebula blobs
    ctx.globalCompositeOperation = 'lighter';
    blobs.forEach(b => { b.update(t); b.draw(); });

    // Connecting lines
    ctx.globalCompositeOperation = 'source-over';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = dx * dx + dy * dy;
        if (d < 10000) {
          const a = (1 - Math.sqrt(d) / 100) * 0.06;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(212,175,55,' + a + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Particles
    particles.forEach(p => { p.update(t); p.draw(); });

    requestAnimationFrame(animate);
  }

  canvas.parentElement.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });
  window.addEventListener('resize', () => { resize(); });

  init();
  animate();
});
