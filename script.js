document.addEventListener('DOMContentLoaded', () => {
  // Capture UTM parameters from URL
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
  const forms = document.querySelectorAll('.waitlist-form');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[name="email"]');
      const button = form.querySelector('button');
      const email = emailInput.value.trim();

      if (!email) return;

      button.disabled = true;
      button.textContent = 'Joining...';

      try {
        const payload = { email };
        if (utmParams) payload.utm = utmParams;

        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok) {
          const success = document.createElement('div');
          success.className = 'form-success';
          success.textContent = "You're on the list! We'll be in touch soon.";
          form.replaceWith(success);
        } else if (res.status === 409) {
          const success = document.createElement('div');
          success.className = 'form-success';
          success.textContent = "You're already on the waitlist! We'll be in touch soon.";
          form.replaceWith(success);
        } else {
          throw new Error(data.error || 'Something went wrong');
        }
      } catch (err) {
        button.disabled = false;
        button.textContent = 'Join the Waitlist';
        alert('Something went wrong. Please try again.');
      }
    });
  });
});
