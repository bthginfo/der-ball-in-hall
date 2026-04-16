document.addEventListener('DOMContentLoaded', () => {
  // AOS
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
      const diff = Math.max(0, target - Date.now());
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
    setInterval(tick, 1000);
  }

  // ─── PARTICLES ───
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [], mouse = { x: -999, y: -999 };
  const COUNT = 80;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = rect.width;
    h = canvas.height = rect.height;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * w;
      this.y = init ? Math.random() * h : h + 10;
      this.r = Math.random() * 2.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.6 + 0.15);
      this.alpha = Math.random() * 0.6 + 0.15;
      this.baseAlpha = this.alpha;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulseOffset = Math.random() * Math.PI * 2;
      this.life = 0;
      // golden hue variation
      const hShift = Math.random() * 20 - 10;
      this.color = 'hsla(' + (43 + hShift) + ', 75%, ' + (55 + Math.random() * 20) + '%, ';
    }
    update(t) {
      this.life++;
      this.x += this.vx;
      this.y += this.vy;
      // gentle wave
      this.x += Math.sin(this.life * 0.01 + this.pulseOffset) * 0.15;
      // pulse alpha
      this.alpha = this.baseAlpha * (0.6 + 0.4 * Math.sin(t * this.pulseSpeed + this.pulseOffset));
      // mouse repel
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.8;
        this.x += (dx / dist) * force;
        this.y += (dy / dist) * force;
      }
      if (this.y < -10 || this.x < -10 || this.x > w + 10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
      // glow
      if (this.r > 1.5) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color + (this.alpha * 0.15) + ')';
        ctx.fill();
      }
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());
  }

  let frame = 0;
  function animate() {
    frame++;
    ctx.clearRect(0, 0, w, h);

    // draw faint connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const a = (1 - dist / 100) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(212,175,55,' + a + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => { p.update(frame); p.draw(); });
    requestAnimationFrame(animate);
  }

  canvas.parentElement.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  window.addEventListener('resize', resize);
  init();
  animate();
});
