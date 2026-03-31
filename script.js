document.addEventListener('DOMContentLoaded', () => {
  // Scroll-triggered animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // Nav scroll effect
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // UTM capture
  function getUtmParams() {
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
      const val = params.get(key);
      if (val) utm[key] = val;
    });
    return Object.keys(utm).length > 0 ? utm : null;
  }

  const utmParams = getUtmParams();

  // Waitlist form handling
  document.querySelectorAll('.waitlist-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[name="email"]');
      const button = form.querySelector('button');
      const email = emailInput.value.trim();

      if (!email) return;

      button.disabled = true;
      const originalHTML = button.innerHTML;
      button.innerHTML = 'Joining...';

      try {
        const payload = { email };
        if (utmParams) payload.utm = utmParams;

        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok || res.status === 409) {
          const success = document.createElement('div');
          success.className = 'form-success';
          success.textContent = res.ok
            ? "You're on the list! We'll be in touch soon."
            : "You're already on the waitlist! We'll be in touch soon.";
          form.replaceWith(success);
        } else {
          throw new Error(data.error || 'Something went wrong');
        }
      } catch (err) {
        button.disabled = false;
        button.innerHTML = originalHTML;
        alert('Something went wrong. Please try again.');
      }
    });
  });
});
