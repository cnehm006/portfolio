document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
  });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in, .case-item .card').forEach(el => {
  observer.observe(el);
});

window.addEventListener('load', () => {
  document.querySelector('.hero-title').style.opacity = 1;
  document.querySelector('.hero-title').style.transform = 'scale(1)';
  document.querySelector('.hero-subtitle').style.opacity = 1;
  document.querySelector('.hero-subtitle').style.transform = 'translateY(0)';
});