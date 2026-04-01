document.addEventListener('DOMContentLoaded', () => {
  // Scroll-triggered reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('in'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

  // Nav shadow on scroll
  const nav = document.getElementById('nav');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
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
  document.querySelectorAll('.cta-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[name="email"]');
      const btn = form.querySelector('button');
      const email = input.value.trim();
      if (!email) return;

      btn.disabled = true;
      const original = btn.textContent;
      btn.textContent = 'Joining\u2026';

      try {
        const payload = { email };
        if (utmParams) payload.utm = utmParams;

        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok || res.status === 409) {
          const msg = document.createElement('div');
          msg.className = 'form-success';
          msg.textContent = res.ok
            ? "You\u2019re on the list. We\u2019ll be in touch."
            : "You\u2019re already on the waitlist.";
          form.replaceWith(msg);
        } else {
          throw new Error('Failed');
        }
      } catch {
        btn.disabled = false;
        btn.textContent = original;
        alert('Something went wrong. Please try again.');
      }
    });
  });
});
