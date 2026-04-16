(() => {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  if (window.AOS) window.AOS.init({ duration: 700, once: true, offset: 60 });

  // Mobile menu
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
  if (!cd) return;

  const target = new Date('2026-01-17T19:00:00+01:00');

  function tick() {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const el = (u) => cd.querySelector(`[data-unit="${u}"]`);
    if (el('days')) el('days').textContent = String(d).padStart(3, '0');
    if (el('hours')) el('hours').textContent = String(h).padStart(2, '0');
    if (el('minutes')) el('minutes').textContent = String(m).padStart(2, '0');
    if (el('seconds')) el('seconds').textContent = String(s).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
})();
