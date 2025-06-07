//----------------------------------------------
// Éclat Salon – script.js
//----------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // 1) NAVBAR SCROLL BACKGROUND TOGGLE
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2) MOBILE NAV TOGGLE
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // 3) BOOKING FORM SUBMISSION (You can hook up to your backend later)
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! We will call you soon to confirm your appointment.');
    contactForm.reset();
  });

  // 4) NEWSLETTER FORM SUBMISSION (just shows an alert for now)
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]').value;
    if (emailInput) {
      alert(`Thanks for subscribing with ${emailInput}!`);
      newsletterForm.reset();
    }
  });

  // 5) CALENDAR TODAY HIGHLIGHT (dynamically find today's date)
  const todayCell = document.querySelector('.calendar-table .today');
  if (todayCell) {
    // Optional: you can add a tooltip or extra styling here
    todayCell.title = 'Today';
  }
});