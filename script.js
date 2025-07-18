const navbar = document.getElementById('navbar');
const hero   = document.getElementById('hero');

function updateNavbarClasses() {
  const scrollY    = window.scrollY || window.pageYOffset;
  const heroHeight = hero.offsetHeight;
  if (scrollY >= heroHeight) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNavbarClasses);
window.addEventListener('resize', updateNavbarClasses);
window.addEventListener('load', () => {
  updateNavbarClasses();
  initTrail();
  setupRunningLine();
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

function setupRunningLine() {
  document.querySelectorAll('.running-line').forEach(el => {
    const text = el.textContent.trim();
    el.innerHTML = '';
    const span = document.createElement('span');
    span.textContent = text + ' ';
    el.appendChild(span);
    const containerWidth = el.parentElement.getBoundingClientRect().width;
    let contentWidth = span.getBoundingClientRect().width;
    while (contentWidth < containerWidth * 2) {
      const clone = span.cloneNode(true);
      el.appendChild(clone);
      contentWidth += span.getBoundingClientRect().width;
    }
  });
}

document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    form.classList.add('was-validated');
  });
});