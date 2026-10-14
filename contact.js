const contactForm = document.querySelector('.contact-form');
const contactStatus = document.getElementById('contact-status');
const submitButton = contactForm.querySelector('[type="submit"]');
let sending = false;

contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending) return;
  const fields = contactForm.elements;
  for (const key of ['name', 'message']) {
    fields[key].setCustomValidity(fields[key].value.trim() ? '' : 'Please complete this field.');
  }
  if (!contactForm.reportValidity()) return;
  if (fields._honey.value) return;
  sending = true;
  submitButton.disabled = true;
  contactForm.setAttribute('aria-busy', 'true');
  contactStatus.textContent = 'Sending your message…';
  const originalButton = submitButton.innerHTML;
  submitButton.textContent = 'Sending…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        company: fields.company.value.trim(),
        message: fields.message.value.trim(),
        _subject: 'New portfolio enquiry',
        _template: 'table',
        _honey: fields._honey.value
      }),
      signal: controller.signal
    });
    const result = await response.json();
    if (!response.ok || ![true, 'true'].includes(result.success)) {
      console.warn('Contact service rejected submission:', result.message || response.status);
      throw new Error('Submission rejected');
    }
    contactStatus.textContent = 'Thanks! Your message has been submitted.';
    contactForm.reset();
  } catch (error) {
    contactStatus.textContent = error.name === 'AbortError'
      ? 'The connection timed out, so delivery could not be confirmed. Your message is still here; please try again shortly.'
      : 'Your message could not be submitted. Please try again shortly. Your entries have been kept.';
  } finally {
    clearTimeout(timeout);
    sending = false;
    submitButton.disabled = false;
    submitButton.innerHTML = originalButton;
    contactForm.removeAttribute('aria-busy');
  }
});

contactForm.addEventListener('input', event => {
  event.target.setCustomValidity('');
  if (!sending) contactStatus.textContent = '';
});
