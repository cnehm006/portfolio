const navbar = document.getElementById('navbar');
const hero   = document.getElementById('hero');

function checkNav() {
  navbar.classList.toggle(
    'scrolled',
    hero.getBoundingClientRect().bottom < 56
  );
}
window.addEventListener('scroll', checkNav);
window.addEventListener('load', () => {
  checkNav();
  initTrail();
});

const trailContainer = document.getElementById('image-trail');
const imgs           = Array.from(trailContainer.querySelectorAll('img.trail-img'));
const count          = imgs.length;
const threshold      = 80;
let lastPoint = null;
let idx       = 0;

function initTrail() {
  imgs.forEach(img => {
    img.style.left = '0';
    img.style.top  = '0';
    img.classList.remove('visible');
  });
  lastPoint = null;
  idx = 0;
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

hero.addEventListener('mousemove', e => {
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (!lastPoint) {
    lastPoint = { x, y };
    place(idx, x, y);
    idx = (idx + 1) % count;
  } else if (dist(lastPoint, { x, y }) >= threshold) {
    lastPoint = { x, y };
    place(idx, x, y);
    idx = (idx + 1) % count;
  }
});

function place(i, x, y) {
  const img = imgs[i];
  img.style.left = `${x}px`;
  img.style.top  = `${y}px`;
  img.classList.add('visible');
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});